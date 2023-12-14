// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
type Data = {
  name: string
}

const fetcher = async (url: string) => {
  const response = await axios.get(process.env.BASE_URL + url);
  return response.data;
};

export default fetcher;