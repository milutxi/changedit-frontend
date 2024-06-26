import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import classes from "./ShowPost.module.css";
import CommentForm from "../components/CommentForm";
import VoteComponent from "../components/Vote";
import CommentComponent from "../components/Comment";
import auth from "../lib/auth";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/posts/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const posts = await response.json();

  return posts;
};

const ShowPost = () => {
  const post = useLoaderData() as Post;

  const handleDeleteComment = async (commentId: string) => {
    try {
      await fetch(
        import.meta.env.VITE_BACKEND_URL +
          "/posts/" +
          post._id +
          "/comments/" +
          commentId,
        {
          headers: {
            Authorization: "Bearer " + auth.getJWT(),
          },
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <div className={classes.post}>
        <VoteComponent post={post} />
        <div className={classes.postInfo}>
          {post.link ? (
            <div>
              <h2>{post.title}</h2>
              <Link to={post.link}>
                <span className={classes.postUrl}>{post.link}</span>
              </Link>
            </div>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.userName}</p>
          {post.body && (
            <div className={classes.postBody}>
              <p>{post.body}</p>
            </div>
          )}
        </div>
      </div>
      <CommentForm postId={post._id} />
      {post.comments?.map((comment) => (
        <CommentComponent
          key={comment._id}
          userId={post._id}
          comment={comment}
          commentId={comment._id}
          postId={post._id}
          onDelete={() => handleDeleteComment(comment._id)}
        />
      ))}
    </>
  );
};

export default ShowPost;
