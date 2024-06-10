import axios from "axios";
import { BASE_URL } from "../utils/constant";

const useFetchPhotos = () => {
    const limit = 10;
    const fetchPhotos = async ({ pageParam = 1 }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/photos?_page=${pageParam}&_limit=${limit}`
            );
            const photos = res.data;
            const hasNextPage = photos.length === limit;

            return { photos, hasNextPage }
        } catch (error) {
            return { photos: [], hasNextPage: false, error: error.message }
        }
    };

    return fetchPhotos;
};

export default useFetchPhotos;
