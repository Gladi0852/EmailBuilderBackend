import mongoose from "mongoose";


const emailTemplateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, 
  },
  logoUrl: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  titleColor: {
    type: String,
    default: "#ffffff", // Default black color
  },
  subtitle: {
    type: String,
    default: "",
  },
  subTitleColor: {
    type: String,
    default: "#2563EB", // Default black color
  },
  bodyContent: {
    type: String,
    default: "",
  },
  bodyContentColor: {
    type: String,
    default: "#000000", // Default black color
  },
  bodyImageUrl: {
    type: String,
    default: "", // Default empty string if no image
  },
  footerText: {
    type: String,
    default: "",
  },
  footerTextColor: {
    type: String,
    default: "#000000", // Default black color
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date when created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date when created
  },
});

// Add a pre-save hook to update the updatedAt field
emailTemplateSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const templates = mongoose.model("templates", emailTemplateSchema);

export default templates;
