import axios from "axios";
import { BASE_URL } from "../utils/constant";

const useFetchPosts = () => {
  const limit = 10;
  const fetchPosts = async ({ pageParam = 1 }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/posts?_page=${pageParam}&_limit=${limit}`
      );
      const posts = res.data;
      console.log(posts)
      const hasNextPage = posts.length === limit;

      return { posts, hasNextPage };
    } catch (error) {
      return { posts: [], hasNextPage: false, error: error.message };
    }
  };

  return fetchPosts;
};

export default useFetchPosts;