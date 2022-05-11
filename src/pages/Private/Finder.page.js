import User from '../../components/Cards/User/User';
import { useEffect,useState } from 'react';
import ApiHandler from '../../utils/api.utils';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './FinderPage.css';

const Finder = () => {
    const [users, setUsers] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        const data = ApiHandler.FindUser(query).then(data => {
            console.log(data)
            setUsers(data.users.map(user => {
                return <User key={user._id} user={user}/>

            }))
        })
    }, []);



    return (
        <>
            <NavBar />
            <div className='content-users'>
                {users}
            </div>
        </>
    )
}
export default Finder