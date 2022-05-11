import { useNavigate } from 'react-router-dom';
import Profile from '../../../assets/images/profile-placeholder.png';
import './User.css';
import { useState } from 'react';
const User = ({ user }) => {
    const [image,setImage ] = useState(user.profileImage?user.profileImage.imageUrl:Profile);
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${user.username}`);
    }
    return(
        <div className='user-card' onClick={handleClick}>
            <img src={image} className='user-img'>
            </img>
            <div className='info-container'>
                <h5>{user.name}</h5>
                <h6>{user.friends.length} amigos</h6>
            </div>

        </div>
    )
}
export default User;