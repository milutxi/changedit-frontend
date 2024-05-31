import { Link, useFetcher } from "react-router-dom";
import { Post } from "../types";
import classes from "./PostListItem.module.css";
import VoteComponent from "./Vote";
import { BiSolidEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";




const PostListItem = ({ post }: { post: Post }) => {
  const fetcher = useFetcher();
 

  const handleDeletePost = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed){

      fetcher.submit(null, {
        method: "delete",
        action: `/posts/${post._id}/delete`,
      });
    }
  };
 
  
  return (
    <div>
    <div className={classes.post}>
      <VoteComponent post={post} />
      <div className={classes.postInfo}>
        {post.link ? (
          <Link to={post.link}>
            <h2>
              {post.title}<span className={classes.postUrl}>({post.link})</span>
            </h2>
          </Link>
        ) : (
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
        )}

        <p>by {post.author.userName}</p>
        {post.link && (
          <span>
            <Link to={`/posts/${post._id}`}>Show post</Link>
          </span>
        )}
      </div>
      
      <div className={classes.icons}>
      <Link to={`/posts/${post._id}/edit`}><BiSolidEdit size={27}/></Link>
      <button onClick={handleDeletePost} ><AiTwotoneDelete size={20} /></button>
      </div>
    </div>
    </div>
  )
}

export default PostListItem;


