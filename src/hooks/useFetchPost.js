import axios from "axios";
import { BASE_URL } from "../utils/constant";

const useFetchPost = () => {
    const fetchPost = async (pageId) => {

      try {
        const res = await axios.get(`${BASE_URL}/posts/${pageId}`);
        return res.data;

      } catch (error) {
        throw new Error(error.message)
      }
    };

  return fetchPost;
};

export default useFetchPost;