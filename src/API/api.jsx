import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = (id) => {
  return api.get(`/posts?_start=${id}&_limit=4`);
};

export const fetchIndividualPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status == 200 ? res.data : {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const deleteIndividualPost = async (id) => {
  try {
    const res = await api.delete(`/posts/${id}`);
    return res.status === 200 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
