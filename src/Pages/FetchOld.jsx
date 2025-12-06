import { useEffect, useState } from "react";
import { fetchPosts } from "../API/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPostsData = async () => {
    setIsloading(true);
    try {
      const res = await fetchPosts();
      // console.log(res.data)
      if (res.status == 200) {
        setPosts(res.data);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  if(isLoading){
    return<h1>...loading</h1>
  }

  if(isError){
    return<h1>...failed to fetch posts</h1>
  }

  return (
    <>
      <h1>FetchOld</h1>
      <div>
        <ul className="section-accordion">
          {posts?.map((post) => {
            const { userId, id, title, body } = post;
            return (
              <li key={id}>
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
