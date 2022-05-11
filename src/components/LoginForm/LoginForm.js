import { Field,Formik, Form } from 'formik';
import { TextField } from '../TextField/TextField.js';
import './LoginForm.css';
import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiHandler from '../../utils/api.utils.js';
export const LoginForm = ({setForm}) => {
    const navigate = useNavigate();
    const [error,setError] =  useState('');
    const validate = Yup.object({
        email: Yup.string()

            .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Email inválido')
            .email()
            .required('Preenchimento obrigatório'),

        password: Yup.string()

            //.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,16}$/, 'Senha deve conter no mínimo 6 caracteres, uma letra maiscula, um número e um caractere especial')
            .min(6, 'Senha deve conter no mínimo 6 caracteres')
            .required('Preenchimento obrigatório'),

    })
    useEffect(() => {
        const user = localStorage.getItem('user')||sessionStorage.getItem('user');
        const username = localStorage.getItem('username')||sessionStorage.getItem('username');
        if(user){
            navigate(`/${username}`);
        }

    }, []);
    return (

        <Formik

            initialValues={{
                email: '',
                password: '',
                remember:false,
            }}

            validationSchema={validate}

            onSubmit={async (values) => {
                const data = await ApiHandler.LoginRequest(values);
                if(!data.error){
                    if(values.remember===true){
                        localStorage.setItem('token',data.token)
                        localStorage.setItem('user',JSON.stringify(data.user).slice(1,-1));
                        localStorage.setItem('username',data.username);
                        navigate(`/${data.username}`);
                    } else{
                        sessionStorage.setItem('token',data.token)
                        sessionStorage.setItem('user',JSON.stringify(data.user).slice(1,-1));
                        sessionStorage.setItem('username',data.username);
                        navigate(`/${data.username}`);
                    }
                };
                if(data.error === "Email or password is incorrect")setError("Email ou senha incorretos");
                else setError(data.error);
            }}
        >
            {props => (

                <div className='login-form'>

                    <h4 className='title'>Entrar no Ibook</h4>
                    <h6>{error}</h6>
                    <Form>
        
                        <TextField label="Email" name="email" type="email" placeholder='Email'/>
                        <TextField label="Password" name="password" type="password" placeholder="Senha"/>
                        <Field type="checkbox" name="remember" id="remember" className="form-check-input shadow-none" />

                        <label htmlFor="remember" className="form-check-label">Permanecer conectado</label>

                        <div className='div-button'>
                            <button className="btn btn-dark mt-2 mb-3" type="submit">Entrar</button>
                        </div>

                        <div className='div-button'>
                            <button className="btn btn-light mt-3 mb-3" onClick={()=>setForm('signup')}type="reset">Criar conta</button>
                        </div>

                    </Form>
                </div>
            )}
        </Formik>
    )
}