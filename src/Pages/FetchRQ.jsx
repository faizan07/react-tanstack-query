import { useQuery, keepPreviousData, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { fetchPosts, deleteIndividualPost, updateIndividualPost } from "../API/api";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {
  const [page, setPage] = useState(0);

  //this is used for interacting with tanstack query cache
  const queryClient = useQueryClient()

  const getPostsData = async (page) => {
    try {
      const res = await fetchPosts(page);
      return res.status == 200 && res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPostsData(page),
    // gcTime: 1000 // for changing the cached default time of 5 min
    staleTime: 10000,
    // staleTime -> option which determines how long the fetched data is to be considered fresh before
    // it is refetched. So that within this time a new request is not sent if the client hits the API again,
    refetchInterval: 2000, // this is used for Polling, i.e. every 2 sec network call is made automatically
    refetchIntervalInBackground: true, // Polling is done even when user is in different tab
    placeholderData: keepPreviousData, //Till the time the new data comes, the previous data is displayed
  });

  //mutation function to delete a post
  const deleteMutation = useMutation(
    {
      mutationFn: (id) => deleteIndividualPost(id),
      onSuccess: (data, id) => {
        queryClient.setQueryData(["posts", page], (allPost) => {
          return allPost.filter((post) => post.id !== id)
        })
      }
    }
  )

  const updateMutation = useMutation({
    mutationFn: (id) => updateIndividualPost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId) //apiData is the specific post which got updated
      queryClient.setQueryData(['posts', page], (allPost) => { //allPost is the array of all posts
        return allPost?.map((curPost) => {
          return curPost.id === postId ? {...curPost, title: apiData.title} : curPost
        })
      })
    }
  })

  if (isPending) return <h1>...loading</h1>;

  if (isError) return <h1>...failed to fetch posts</h1>;

  return (
    <>
      <h1>FetchRQ</h1>
      <div>
        <ul className="section-accordion">
          {data?.map((post) => {
            const { userId, id, title, body } = post;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{userId}</p>
                  <p>{title}</p>
                </NavLink>
                <p>{body}</p>
                {/* when we run the mutate() func then the func inside the useMutation query i.e. mutationFn is called */}
                {/* This mutate() func is used to execute mutation in tanstack query */}
                <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                <button onClick={() => updateMutation.mutate(id)}>Update</button>
              </li>
            );
          })}
        </ul>
        <div className="pagination-section container">
          <button
            disabled={page === 0 ? true : false}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <h2>{page}</h2>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>
    </>
  );
};
