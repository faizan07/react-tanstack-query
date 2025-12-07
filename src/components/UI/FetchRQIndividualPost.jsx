import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchIndividualPost } from "../../API/api";

export const FetchRQIndividualPost = () => {
  const { rqid } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", rqid], // here purpose of giving rqid is that whenever rqid changes the query function is called
    queryFn: () => fetchIndividualPost(rqid),
  });

  console.log(data)

  if (isPending) return <h1>...loading</h1>
  if (isError) return <h1>...Error - {error.message}</h1>

  return (
    <div className="section-accordion">
      <h1>Post details</h1>
      <div>
        <p>ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Body: {data.body}</p>
      </div>
      <NavLink to={"/rq"}>
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};
