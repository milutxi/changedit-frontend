import auth from '../lib/auth';
import { Comment} from '../types'
import classes from './Comment.module.css'


const CommentComponent = ({ comment, commentId, postId, onDelete }: {comment: Comment, commentId: string, postId: string, onDelete: () => void}) => {
    
    const handleDeleteComment = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
            if(!confirmed) {
                return;
            }
            
        try {
            // const response = 
            await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + postId + "/comments/" + commentId, {
                headers: {
                    Authorization: "Bearer" + auth.getJWT(),
                },
                method: 'DELETE',
            });
            console.log ('Comment deleted successfully:', commentId)
 
            onDelete(); 

       

        }catch (error){
            console.error('Error deleting comment:', error);
        }
    }
    
    
    return(
        <div className={classes.commentContainer}>
            <p className={classes.author}>Comment by: {comment.author.userName}</p>
            <p className={classes.postedcomment}>{comment.body}</p>
            <div className={classes.deleteComment}>
                <button onClick={handleDeleteComment} type="button">Delete comment</button>
            </div>
        </div>
    )
}

export default CommentComponent