import  { useState } from 'react';


export const MessageBox = ({ conversation,user,socket }) => {
    const [classSender, setClassSender] = useState('');
    const messages = [];
    
    const msgs = conversation.messages;
    console.log(msgs)
    
    return (
        <div className='messages'>
            {messages}
        </div>
    )
}