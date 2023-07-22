import axios from "axios";

export const uploaderAPI = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1",
});
