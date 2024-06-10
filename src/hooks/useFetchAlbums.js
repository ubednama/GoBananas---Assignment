import axios from "axios";
import { BASE_URL } from "../utils/constant";

const useFetchAlbums = () => {
    const limit = 10;
    const fetchAlbums = async ({ pageParam = 1 }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/albums?_page=${pageParam}&_limit=${limit}`
            );
            const albums = res.data;
            const hasNextPage = albums.length === limit;
            return { albums, hasNextPage }

        } catch (error) {
            return { albums: [], hasNextPage: false, error: error.message }
        }
    };

    return fetchAlbums;
};

export default useFetchAlbums;