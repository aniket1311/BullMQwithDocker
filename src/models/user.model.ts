import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: { type: String, required: true },
    address: {
      type: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        street: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    picture: { type: String, required: true },
    created_at: {
      type: mongoose.Schema.Types.Date,
      default: new Date(),
    },
    updated_at: {
      type: mongoose.Schema.Types.Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    collection: 'User',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

export const User = mongoose.model('User', userSchema);
