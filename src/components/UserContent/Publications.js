import  Post  from '../Cards/Post/Post';
import "./publications.css"
import Photo from '../Cards/Photo/Photo.js';
import Friend from '../Cards/Friend/Friend';
import { useState } from 'react';
import ApiHandler from '../../utils/api.utils'
import PostMaker from '../../components/Post/PostMaker'

const Publications = ({ data,relationship }) => {
    const [newPostDiv,setNewPostDiv] = useState(null);
    const [tex,setTex] = useState('')
    const [file,setFile] = useState('')
   
    const newPost = () => {
       setNewPostDiv(<PostMaker setNewPostDiv={setNewPostDiv} id={data._id}/>)
    }
    return(
        <>
        {newPostDiv}
        <div className="publications" style={{minHeight:'31.3vh',height:'auto',backgroundColor:'rgb(36,37,38)'}}>
            <div className='other'>
                <div className="friends-content">

                
                    <div className="friends-content-body">
                      
                        {data.friends.map(friend => {
                          
                            return <Friend friend= {friend} key={friend._id}/>

                        })}
                        {data.friends.length===0 && <p>Nenhum amigo, ainda</p>}
                    </div>
                </div>
                <div className='photos-content'>
                    <p>Fotos</p>
                    <div className="photos-ct">
                        {data.photos.length === 0 && <p>Nenhuma foto, ainda</p>}
                        {data.photos.map((photo,index) => {
                            if(index>8)return
                            return (
                                <Photo photo={photo} width='142px' key={photo._id}></Photo>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="posts-content">
                {console.log(relationship)}
                {(relationship==='friend' || relationship==='self')?<button className='btn-post' onClick={newPost}>Postar</button>:null}
                {data.posts.length>0&&data.posts.map(post=> <Post post={post} key= {post._id} relationship={relationship}></Post>)}
                <div ></div>
            </div>
        </div>
        </>
    )

}
export default Publications;