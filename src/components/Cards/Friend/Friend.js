import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './friend.css'
import Profile from '../../../assets/images/profile-placeholder.png';

const Friend = ({ friend }) => {

    const [image, setImage] = useState(friend.profileImage ? friend.profileImage.imageUrl : Profile);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${friend.username}`);
    }
    return(
        <div className="card-friend" onClick={handleClick}>
            <img src={image} className='image-friend'></img>
            <p>{friend.name}</p>
        </div>    

    )
}
export default Friend;