// import { NextApiRequest, NextApiResponse } from 'next';
// import SellProduct from '@/lib/models/sellproduct.model';
// import { connectToDB } from "@/lib/mongoose";

// connectToDB();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;

//   switch (method) {
//     case 'GET':
//       try {
//         const products = await SellProduct.find();
//         res.status(200).json({ success: true, data: products });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case 'POST':
//       try {
//         const product = await SellProduct.create(req.body);
//         res.status(201).json({ success: true, data: product });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case 'PUT':
//       try {
//         const updatedProduct = await SellProduct.findByIdAndUpdate(req.query.id, req.body, { new: true });
//         res.status(200).json({ success: true, data: updatedProduct });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case 'DELETE':
//       try {
//         const deletedProduct = await SellProduct.findByIdAndDelete(req.query.id);
//         res.status(200).json({ success: true, data: deletedProduct });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }


import { connectToDB } from "@/lib/mongoose";
import SellProduct from "@/lib/models/sellproduct.model";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, description, price, imageUrl, sellerdetail } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const prod = await SellProduct.findOne({ title });

    if (prod) {
      return NextResponse.json(
        { error: "Product already exists" },
        { status: 400 }
      );
    }

    //hash password
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    const newSellProd = new SellProduct({
      title,
      description,
      price,
      imageUrl,
      sellerdetail
    });

    const savedProd = await newSellProd.save();
    console.log(savedProd);

    //send verification email

    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "New Product added successfully",
      success: true,
      savedProd,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
