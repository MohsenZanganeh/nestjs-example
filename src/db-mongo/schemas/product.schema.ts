import * as mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { timestamps: true, versionKey: false },
);
ProductSchema.pre('save', (next) => {
  console.log('-save-:');
  next();
});

export default ProductSchema;
