import mongoose, { Schema, Document } from 'mongoose';

interface ISellProduct extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerdetail:string;
//   createdAt: Date;
//   updatedAt: Date;
}

const sellProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    sellerdetail: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);

// const SellProduct = mongoose.model<ISellProduct>('SellProduct', sellProductSchema);
const SellProduct = mongoose.models.SellProduct || mongoose.model('SellProduct',sellProductSchema);
//const Product = mongoose.models.Product || mongoose.model('Product',productSchema);

export default SellProduct;