import {useState} from 'react';
import './post.css';
import InputComment from '../InputComment/InputComment';
import Comment from '../Comment/Comment';
import ApiHandler from '../../../utils/api.utils';
const Post = ({ post ,relationship }) => {
    const [comments,setCommetns] = useState([]);
    const deletePost = () => {
        ApiHandler.DeletePost(post._id).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className='post'>
            {relationship==='self'?<p className='delete-post' onClick={deletePost}>X</p>:null}
            {post.imagesUrl.length>0 && <img className = 'img-post' src={post.imagesUrl[0]}/>}
            <p className='content'>{post.content}</p>
            <InputComment id={post._id} />
            {post.comments.map(comment => {
                return <Comment comment={comment} key={comment._id}></Comment>
            })}
        </div>
    )
}
export default Post;