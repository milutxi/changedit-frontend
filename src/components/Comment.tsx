import { Comment } from '../types'
import classes from './Comment.module.css'

const CommentComponent = ({comment}: {comment: Comment}) => {
    return(
        <div className={classes.commentContainer}>
            <p className={classes.author}>Comment by: {comment.author.userName}</p>
            <p className={classes.postedcomment}>{comment.body}</p>
        </div>
    )
}

export default CommentComponent