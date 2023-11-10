import axios from "axios";

export const getComments = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v2/comments");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

// export const getCommentById = async (ids) => {
//   try {
//     const commentPromises = ids.map(async (id) => {
//       // Untuk setiap id dalam array, ambil komentar berdasarkan id-nya
//       return await axios.get(
//         `https://gorest.co.in/public/v2/posts/${id}/comments`
//       );
//     });

//     // Menunggu semua permintaan untuk selesai
//     const commentResponses = await Promise.all(commentPromises);

//     // Ambil data komentar dari masing-masing respons
//     const comments = commentResponses.flat();

//     return comments;
//   } catch (error) {
//     throw new Error(error.response.data.message || "Something went Wrong");
//   }
// };

export const getCommentById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v2/posts/${id}/comments`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const postComment = async (id, data) => {
  try {
    const { data } = await axios.post(
      `https://gorest.co.in/public/v2/posts/${id}/comments`,
      data
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
