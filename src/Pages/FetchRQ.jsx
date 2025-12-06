import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";

export const FetchRQ = () => {
  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      return res.status == 200 ? res.data : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const {data} = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsData,
  });

  return (
    <>
      <h1>FetchRQ</h1>
      <div>
        <ul className="section-accordion">
          {data?.map((post) => {
            const { userId, id, title, body } = post;
            return (
              <li key={id}>
                <p>{userId}</p>
                <p>{title}</p>
                <p>{body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
