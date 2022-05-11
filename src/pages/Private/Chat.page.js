import { useState, useEffect } from 'react';
import  ApiHandler from '../../utils/api.utils';
import { ChatBox } from '../../components/Cards/ChatBox/ChatBox.js';
import socketIOClient from "socket.io-client";
import './ChatPage.css';
import { MessageBox } from '../../components/Cards/MessageBox/MessageBox.js';
import{useNavigate} from 'react-router-dom';

export const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [messageWith, setMessageWith] = useState('');
    const [textToSend, setTextToSend] = useState('aaaaa');
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const socket = socketIOClient('http://localhost:5000',{
        transports: ['websocket']},
        );
        
    socket.on('Private message',(msg,to,from)=>{
        console.log(msg,to,from)
        if(from===messageWith){
            setMessages([...messages,<div className='from-friend' key={msg+toString(Math.random()*1000000)}><p>{msg}</p></div>])
         }else{ 
            const filteredConversations = conversations.filter(conversation => conversation.key.toString()===from)
            if(filteredConversations.length===0){
                console.log(from)
                ApiHandler.GetProfile(from).then(data => {
                    console.log(data)
                    setConversations([...conversations,<ChatBox key={from} conversationWith={from} name={data.user.name} image={data.user.profileImage} sender={from} lastMessage={msg} user={user} io={socket} changerMessages={setMessageWith}/>])
                    setMessages([...messages,<div className='from-friend' key={msg+toString(Math.random()*1000000)}><p>{msg}</p></div>])
                }).catch(err => {
                    console.log(err)
                })
    
            }
        }
    })
                    /* setConversations([...conversations,<ChatBox key={who} conversationWith={who} name = {} sender={who} image={image} user={user} io={socket} lastMessage={msg} changerMessages={setMessageWith}/>]) */
                

               
           
       
  
    const user = localStorage.getItem('user')||sessionStorage.getItem('user');
    
    useEffect(() => {
        
        if(!localStorage.getItem('token')&&!sessionStorage.getItem('token')){
            navigate('/');
        }
        const getCvs = async () => {
            const username = await localStorage.getItem('username')||sessionStorage.getItem('username');
            await ApiHandler.getConversations(username).then(data => {
                
                setConversations(data.map(conversation=>{
                    const image = conversation.conversationWith.profileImage||null;
                    return <ChatBox key={conversation.conversationWith._id} conversationWith={conversation.conversationWith._id} name = {conversation.conversationWith.name} sender={conversation.lastMessage.sender} image={image} user={user} io={socket} lastMessage={conversation.lastMessage.content} changerMessages={setMessageWith}/>
                }));
               
                setMessageWith(data[0].conversationWith._id||null);
                
            })
        }
        
        getCvs();
       
        socket.emit('users',`${user}`);
    },[]);
    
    useEffect(() => {
        if(messageWith){
            ApiHandler.getMessages(messageWith).then(data => {
                setMessages(data.messages.map(message =>{
                    if(message.sender === user){
                        return (<div key= {message._id}className='from-user'>
                            <p>{message.content}</p>
                        </div>)
                    }else{
                        return (<div key={message._id}className='from-friend'>
                            <p>{message.content}</p>
                        </div>)
                    }
                }));
                
            })}
        console.log(messageWith)
    }, [messageWith]);
    const submitHandler = (e) => {
        e.preventDefault();
        if(!textToSend)return 
        socket.emit('Private message',{to:messageWith,msg:textToSend,from:user});
        setMessages([...messages,<div className='from-user'key={textToSend+toString(Math.random()*1000000)}><p>{textToSend}</p></div>]);
        setTextToSend('');
        return false
    }

    return (
        <div className='container-chat-page'>
            <div className="chat-conversations">
                <h2>Bate-papos</h2>
                <input type="text" placeholder="Procure por amigos" className='input-box' style={{marginBottom:"30px"}}/>
                {conversations}
            </div>
            <div>
                <div id='messages'>{messages}</div>
                <div className='sender'>
                    <form className='send-form' onSubmit={submitHandler}>
                        <input type="text" placeholder="Aa" className='bottom' onChange={(e)=>setTextToSend(e.target.value)} value={textToSend}/>
                        <button type="submit" className='btn-send'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )

} 