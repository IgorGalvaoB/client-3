import {useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './NavBar.css'
const NavBar = ()=>{
    const [query,setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        if(query){
            e.preventDefault();
            navigate(`/finder/${query}`);
            
        }
    }
    const logoff = ()=>{
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }
    const logo = ()=>{
        const user = localStorage.getItem('username')||sessionStorage.getItem('username');
        navigate(`/${user}`);
       
    }
    return(
        <nav className="container-nav">
            <h3 onClick={logo}>IBook</h3>
            <img></img>
            <form onSubmit = {handleSubmit} className="form-nav">
                <input type="text" placeholder="Pesquisar" className='input-nav' value={query} onChange={(e)=>setQuery(e.target.value)}/>
                <button type='subimit' style={{display:'none'}}></button>
            </form>
            <button type='button' onClick={logoff} className='btn-logoff'>Sair</button>
        </nav>    

    )
}

export default NavBar;
