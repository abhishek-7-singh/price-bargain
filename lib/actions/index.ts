"use server"

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string){
    if(!productUrl) return;
    
    try{
        connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    //const existingProduct = await Product


    }
    catch(error: any){
        throw new Error('Failed to fetch product: ${error.message}')
    }
}