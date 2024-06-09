import axios from "axios";
import { BASE_URL } from "../utils/constant";

const useFetchTodos = () => {
    const limit = 10;
    const fetchTodos = async ({ pageParam = 1 }) => {

        try {
            const res = await axios.get(
                `${BASE_URL}/todos?_page=${pageParam}&_limit=${limit}`
            );
            const todos = res.data;
            const hasNextPage = todos.length > 0;

            console.log(res);

            return { todos, hasNextPage }

        } catch (error) {
            return { todos: [], hasNextPage: false, error: error.message }
        }
    };

    return fetchTodos;
};

export default useFetchTodos;