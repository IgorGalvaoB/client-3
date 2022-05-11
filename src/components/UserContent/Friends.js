import User from '../../components/Cards/User/User';
import Friend from '../../components/Cards/Friend/Friend';
import {useState } from 'react' 
import './friends.css'
const Friends = ({ friends }) => {
    const [friend, setFriend] = useState([]);

    return (
        <div className='friends-ct'>
            {friends.map(friend => {
                return <Friend friend={friend} key={friend._id}></Friend>
            })}
        </div>
    )

}
export default Friends;