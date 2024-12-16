const BASE_URL = 'https://api.cnsl-tikjda.com'
import pictureError from '@/public/pictureError.png'

export function getUrlImage (url){
    if (!url || url=="undefined"){
 return pictureError
    }
    return `${BASE_URL}${url}`


}