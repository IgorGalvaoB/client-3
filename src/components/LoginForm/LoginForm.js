import { Field,Formik, Form } from 'formik';
import { TextField } from '../TextField/TextField.js';
import './LoginForm.css';
import * as Yup from 'yup';
import { LoginRequest } from '../../utils/api.utils.js';
import { useState } from 'react';


export const LoginForm = ({setForm}) => {
    const [error,setError] =  useState('');
    const validate = Yup.object({
        email: Yup.string()

            .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Email inválido')
            .email()
            .required('Preenchimento obrigatório'),

        password: Yup.string()

            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,16}$/, 'Senha deve conter no mínimo 6 caracteres, uma letra maiscula, um número e um caractere especial')
            .min(6, 'Senha deve conter no mínimo 6 caracteres')
            .required('Preenchimento obrigatório'),

    })

    return (

        <Formik

            initialValues={{
                email: '',
                password: '',
                remember:false,
            }}

            validationSchema={validate}

            onSubmit={async (values) => {
                const data = await LoginRequest(values);
                if(!data.error)values.remember===true?localStorage.setItem('token',data.token):sessionStorage.setItem('token',data.token);
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