import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Comment } from "../types";
import classes from "./Comment.module.css";
import auth from "../lib/auth";

interface CommentComponentProps {
  comment: Comment;
  commentId: string;
  postId: string;
  userId: string;
  onDelete: () => void;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  commentId,
  postId,
  onDelete,
  userId,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId:", userId);
    console.log("comment author ID:", comment.author._id);
  }, [userId, comment.author._id]);

  const handleDeleteComment = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.getJWT()}`, // Ensure proper Authorization header
          },
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the comment");
      }

      console.log("Comment deleted successfully:", commentId);
      onDelete();
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className={classes.commentContainer}>
      <p className={classes.author}>Comment by: {comment.author.userName}</p>
      <p className={classes.postedcomment}>{comment.body}</p>

      <div className={classes.deleteComment}>
        <button onClick={handleDeleteComment} type="button">
          Delete comment
        </button>
      </div>
    </div>
  );
};

export default CommentComponent;
