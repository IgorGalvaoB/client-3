import { useState } from 'react';
import './InputComment.css';
import ApiHandler from '../../../utils/api.utils';
const InputComment = ({id}) => {
    const [text,setText] = useState('');

    const send= ()=>{
        ApiHandler.AddComment(id,text).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    
    
    return (
        <div>
            <form onSubmit={send} style={{width:'430px',display:'block'}}>
                <input className = 'text-area'value={text} type='text' onChange={(e)=>setText(e.target.value)} placeholder='Escreva um comentário...'/>
                <button className = 'btn-send-comment' type = 'submit'>Enviar</button>
            </form>
        </div>
    )
}
export default InputComment;