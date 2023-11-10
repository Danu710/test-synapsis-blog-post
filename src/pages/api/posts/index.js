import axios from "axios";

export const getPosts = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v2/posts");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const getPostsById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v2/posts/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
