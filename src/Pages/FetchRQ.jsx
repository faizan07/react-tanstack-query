import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";
import { NavLink, useParams } from "react-router-dom";

export const FetchRQ = () => {
  
  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      return res.status == 200 && res.data
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsData,
    // gcTime: 1000 // for changing the cached default time of 5 min 
    staleTime : 10000, 
    // staleTime -> option which determines how long the fetched data is to be considered fresh before 
    // it is refetched. So that within this time a new request is not sent if the client hits the API again,
    refetchInterval : 2000, // this is used for Polling, i.e. every 2 sec network call is made automatically
    refetchIntervalInBackground : true // Polling is done even when user is in different tab
  }); 

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
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
