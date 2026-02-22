import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      required: true,
      default: 'other',
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Product = model('Product', productsSchema);
