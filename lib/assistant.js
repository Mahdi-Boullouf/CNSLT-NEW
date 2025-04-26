const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
// remove /api from the last part of the url
const BASE_URL = backendUrl
  ? backendUrl.replace(/\/api$/, "")
  : "http://localhost:8001";
import pictureError from "@/public/pictureError.png";

export function getUrlImage(url) {
  if (!url || url == "undefined") {
    return pictureError;
  }
  return `${BASE_URL}${url}`;
}
