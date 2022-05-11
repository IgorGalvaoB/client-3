import { useState } from 'react';
import './ChatBox.css';

export const ChatBox = ({ conversationWith, name, sender, user, image ,io, lastMessage,changerMessages}) => {
    const [lastMsg, setLastMsg] = useState(user===sender?"Você: "+lastMessage:lastMessage);

    if(image){
        image = image.imageUrl;
    }
   
    io.on('Private message',(msg,to,from)=>{
        if(to===conversationWith){
            setLastMsg(from===user?"Você: "+msg:msg);
        }
        if(to===user){
            if(from===conversationWith){
                setLastMsg(from===user?"Você: "+msg:msg);
            }
        }
    })
  
    return (
        <>
            <div className="chat-box" onClick={()=>changerMessages(conversationWith)}>
                
                    <img src={image} className='profile-photo'></img>
               
                <div className="chat-box-content">
                    <h6>{name}</h6>
                    <p>{lastMsg}</p>
                </div>
            </div>       
        </>
    )
} 
