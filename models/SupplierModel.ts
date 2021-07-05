import mongoose from "mongoose";

interface ISupplier {
  supplierName: string;
  address: string;
  contact: string;
  companyName: string;
}

interface SupplierDoc extends mongoose.Document {
  supplierName: string;
  address: string;
  contact: string;
  companyName: string;
}

interface SupplierModel extends mongoose.Model<SupplierDoc> {
  build(attr: ISupplier): SupplierDoc;
}

const supplierSchema = new mongoose.Schema(
  {
    supplierName: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    contact: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
  },
  {timestamps: true}
);

const Supplier = mongoose.model<SupplierDoc, SupplierModel>(
  "Supplier",
  supplierSchema
);

export {Supplier};
