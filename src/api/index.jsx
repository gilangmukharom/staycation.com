import { uploaderAPI } from "../config/api-service";

export const api = {
  // Image Uploader
  uploader: (body) => {
    return uploaderAPI.post("/dflosop7m/image/upload", body);
  },
};
