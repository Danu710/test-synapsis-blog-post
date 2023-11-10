import axios from "axios";

const token =
  "b0056e40835423c6cb4d1dfac654f500525c79537f446ac022e8ff79851f6137";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v2/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v2/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const putUser = async (id, data, token) => {
  try {
    const { data } = await axios.put(
      `https://gorest.co.in/public/v2/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(
      `https://gorest.co.in/public/v2/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
