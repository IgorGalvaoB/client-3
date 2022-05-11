import './ProfilePage.css';
import { useState, useEffect } from 'react';
import ToUploadImg from '../../components/DivToUploadImg/toUploadImg';
import { useParams } from 'react-router-dom';
import ApiHandler from '../../utils/api.utils';
import Publications from '../../components/UserContent/Publications';
import Photo from '../../components/Cards/Photo/Photo';
import NavBar from '../../components/NavBar/NavBar';
import Profile from '../../assets/images/profile-placeholder.png';
import Friends from '../../components/UserContent/Friends';
import Photos from '../../components/UserContent/Photos';
export const ProfilePage = () => {
    const [name, setName] = useState('');
    const [friends, setFriends] = useState([]);
    const [quantityFriends, setQuantityFriends] = useState(0);
    const [relationship, setRelationship] = useState(null);
    const [images, setImages] = useState([]);
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [showContent, setShowContent] = useState('posts');
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);
    const { username } = useParams();
    const [content, setContent] = useState('');
    const [publications, setPublications] = useState(null);
    const [photos, setPhotos] = useState([]);
   
    useEffect(() => {

        ApiHandler.GetProfile(username).then(data => {
            
            setRelationship(data.isFriend);
            setId(data.user._id);
            setPublications(<Publications  relationship = {data.isFriend} key={id} data={data.user} />)
            setContent(<Publications relationship = {data.isFriend}key={username} data={data.user} />)
            setName(data.user.name);
            setFriends(<Friends key={1} friends={data.user.friends}/>);
            setPhotos(<Photos key={3} photos={data.user.photos}></Photos>);
            if(data.user.profileImage){
                setProfileImage(data.user.profileImage.imageUrl);
            
            }else{
                setProfileImage(Profile);
            }
            if(data.user.coverImage){

                setCoverImage(data.user.coverImage.imageUrl);
            }else{
                setCoverImage(null);
            }
            setId(data.user._id);

        }).catch(err => {
            console.log(err)
        })
    }, [username]);
    useEffect(() => {
       
        if (showContent === 'posts') {
            setContent(publications);
        }
        if (showContent === 'photos') {
            setContent(photos);
        }
        if (showContent === 'friends') {
            setContent(friends)
        }
    }, [showContent]);

    //-------------------------------------------------------------------------------------------------


    const handleAddFriend = async () => {
        await ApiHandler.addFriend(id)
    }
    const accept=(id)=>{
        ApiHandler.acceptFriend(id).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    } 

    const buttons = () => {
        if (relationship === 'self') {
            return (
                <div className='btn-status'>
                    <button className="btn-status-buttons" onClick={() => { setShowProfileEdit('cover') }}>Atualizar foto de capa</button>

                </div>
            )
        } else if (relationship === 'friend') {
            return (
                <div className='btn-status'>
                    <button className="btn-status-buttons" disabled={true} >Amigos</button>
                </div>
            )
        } else if (relationship === 'none') {
            return (
                <div className='btn-status'>
                    {/* <button className="btn btn-primary">Enviar mensagem</button> */}
                    <button className="btn-status-buttons" type='button' onClick={() => {
                        handleAddFriend()
                        setRelationship('requested')
                    }}
                    >Adicionar</button>
                </div>
            )
        } else if (relationship === 'requested you') {
            return (
                <div className='btn-status'>
                    <button className="btn-status-buttons" onClick={()=>accept(id)}>Responder</button>
                    <button className="btn-status-buttons">Recusar</button>
                </div>
            )
        } else if (relationship === 'requested') {
            return (
                <div className='btn-status'>
                    <button className="btn-status-buttons button-of">Solicitação enviada</button>
                </div>
            )
        }

    }
    const addPhoto = () => {
        
        let input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.onchange = () => {
            ApiHandler.AddPhoto(id, input.files[0]).then(data => {console.log(data)}).catch(err => {console.log(err)})
        }
    }

    //-----------------------------------------------------------------------------------------
    return (
        <>  
            <NavBar></NavBar>
            {showProfileEdit === 'profile' && <ToUploadImg id={localStorage.getItem('user') || sessionStorage.getItem('user')} x={1} y={1} type='profile' set={setShowProfileEdit}></ToUploadImg>}
            {showProfileEdit === 'cover' && <ToUploadImg id={localStorage.getItem('user') || sessionStorage.getItem('user')} type='cover' x={95} y={35} set={setShowProfileEdit}></ToUploadImg>}
            <div className="container-profile">
                <div className="profile-images">
                    <img src={coverImage} className="cover-image"></img>
                    <img src={profileImage} className="profile-image"></img>
                </div>
                <div className="container-info">
                    {relationship === 'self' && <img  className="btn-change-profile" onClick={() => { setShowProfileEdit('profile') }}></img>}
                    <div className='info'>
                        <h3>{name}</h3>
                  
                    </div>
                    {buttons()}
                </div>
                <div className="menu">
                    <button type='button' className='bt-menu' onClick={() => setShowContent('posts')}>Publicações</button>
                    <button type='button' className='bt-menu' onClick={() => setShowContent('friends')}>Amigos</button>
                    <button type='button' className='bt-menu' onClick={() => setShowContent('photos')}>Fotos</button>
                </div>
                <div className='ct-content'>
                    {relationship === 'self' && showContent === 'photos' && <button onClick={()=>addPhoto()} type='button'>Adicionar foto</button>}
                    {content}
                </div>
            </div>
        </>
    )
}