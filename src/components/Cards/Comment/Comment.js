import { useEffect,useState } from 'react';
import Profile from '../../../assets/images/profile-placeholder.png';
import "./comment.css"
const Comment = ({ comment }) => {
    const [text, setText] = useState('');
    console.log(comment)
    return(
        <div className='ct-comment'>
            <img src={comment.by.profileImage?comment.by.profileImage.imageUrl:Profile} className='ct-img-comment'></img>
            <div className='ct-content-comment'>
                <h6>{comment.by.name}</h6>
                <p>{comment.content}</p>
            </div>
        </div>
    )
}
export default Comment;