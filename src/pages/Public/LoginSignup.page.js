import { useEffect, useState } from 'react';
import { LoginForm} from '../../components/LoginForm/LoginForm.js';

export const LoginSignup = () => {
    const [form,setForm] = useState('login');

    return (
        <div>
            {form==="login"?<LoginForm setForm={setForm}/>:""}
        </div>
    );
}