import { useState } from 'react'
import ApiHandler from '../../utils/api.utils'

const PostMaker = ({ id ,setNewPostDiv}) => {
    const [text,setText] = useState('');
    const post=(a)=>{
        a.preventDefault();
        
        ApiHandler.CreateAPost({id:id,text:text})
        setNewPostDiv('');
    }
    return(
        <div className='post-maker'>
            <form onSubmit={post}>
                <input type='text' placeholder='Escreva uma postagem...' value={text} onChange={(e)=>setText(e.target.value)}></input>
                <button type='submit'>Postar</button>
            </form>
        </div>
    )
}
export default PostMaker;