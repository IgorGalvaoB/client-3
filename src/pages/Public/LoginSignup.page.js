import { useEffect, useState } from 'react';
import { LoginForm} from '../../components/LoginForm/LoginForm.js';
import { SignupForm } from '../../components/SignupForm/SignupForm.js';

export const LoginSignup = () => {
    
    const [form,setForm] = useState('login');

    return (
        <div>
            {form==="login"?<LoginForm setForm={setForm}/>:<SignupForm setForm={setForm}/>}
        </div>
    );
}