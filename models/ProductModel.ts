import mongoose from "mongoose";

interface IProduct {
  productName: string;
  productBrand: string;
  stock: number;
  image: any;
  purchasePrice: number;
  sellingPrice: number;
  UOM: string;
  barcode: string;
  supplier: string;
  status: string;
}

interface ProductDoc extends mongoose.Document {
  productName: string;
  productBrand: string;
  stock: number;
  image: any;
  purchasePrice: number;
  sellingPrice: number;
  UOM: string;
  barcode: string;
  supplier: string;
  status: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attr: IProduct): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    productName: {type: String, required: true},
    productBrand: {type: String, required: true},
    stock: {type: Number, required: true},
    image: {type: Buffer, required: true},
    purchasePrice: {type: Number, required: true},
    sellingPrice: {type: Number, required: true},
    UOM: {type: String, required: true},
    barcode: {type: String, required: true},
    supplier: {type: mongoose.Types.ObjectId, ref: "Supplier", required: true},
    status: {type: String, default: "inactive"},
  },
  {timestamps: true}
);

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export {Product};
