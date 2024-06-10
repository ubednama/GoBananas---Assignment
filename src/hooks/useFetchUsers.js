import axios from "axios";
import { BASE_URL } from "../utils/constant";

const useFetchUsers = () => {
    const limit = 10;
    const fetchUsers = async ({ pageParam = 1 }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/users?_page=${pageParam}&_limit=${limit}`
            );
            const users = res.data;
            const hasNextPage = users.length === limit;

            return { users, hasNextPage };
        } catch (error) {
            return { users: [], hasNextPage: false, error: error.message };
        }
    };

    return fetchUsers;
};

export default useFetchUsers;