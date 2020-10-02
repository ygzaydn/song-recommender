import axios from 'axios'

const url = 'https://ipapi.co/json/'

export const getGeoInfo = async () => {
   const res = await axios.get(url);
   return res;
}
