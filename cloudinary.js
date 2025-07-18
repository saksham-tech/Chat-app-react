// utils/uploadToCloudinary.js
import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "CHAT-APP"); // Set in Cloudinary
  data.append("cloud_name", "dlh77dzqj");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/ dlh77dzqj/image/upload",
    data
  );

  return res.data.secure_url; // This is the image URL
};
