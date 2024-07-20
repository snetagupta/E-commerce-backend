import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
    },
    floor: {
      type: String,
    },
    apartment: {
      type: String,
    },
    postalCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["user", "provider"],
      default: "user",
    },
    address: {
      type: addressSchema,
    },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
