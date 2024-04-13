import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error("No products found");

    // 1. SCRAP LATEST PRODUCTS DETAILS & UPDATE DB;
    const updateProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) throw new Error("No products found");

        const updatePriceHistory = [
          ...currentProduct.priceHistory.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatePriceHistory,
          lowestPrice: getLowestPrice(updatePriceHistory),
          highestPrice: getHighestPrice(updatePriceHistory),
          averagePrice: getAveragePrice(updatePriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: scrapedProduct.url,
          },
          product,
        );


        // 2. CHECK EACH PRODUCT STATUS  & SEND EMAIL ACCORDINGLY
        const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct)

            if(emailNotifType && updatedProduct.users.length>0){
                const productInfo = {
                    title: updatedProduct.title,
                    url: updatedProduct.url,
                }

                const emailContent = await generateEmailBody(productInfo, emailNotifType);

                const userEmails = updatedProduct.users.map((user: any)=>user.email)

                await sendEmail(emailContent, userEmails);

            }
            return updatedProduct;

      })
    );
    return NextResponse.json({
        message: 'ok',
        data: updateProducts
    })
  } catch (error) {
    throw new Error(`Error in GET: ${error}`);
  }
}
