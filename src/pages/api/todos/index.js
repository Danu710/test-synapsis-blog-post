import axios from "axios";

export const getTodos = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v2/todos");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const getTodoById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v2/users/${id}/todos`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
