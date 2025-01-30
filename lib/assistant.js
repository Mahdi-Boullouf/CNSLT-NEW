// const BASE_URL = "http://localhost:8001";
const BASE_URL = "https://api.cnsl-tikjda.dz";
import pictureError from "@/public/pictureError.png";

export function getUrlImage(url) {
  if (!url || url == "undefined") {
    return pictureError;
  }
  return `${BASE_URL}${url}`;
}
