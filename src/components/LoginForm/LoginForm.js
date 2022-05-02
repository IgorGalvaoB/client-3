import { Field,Formik, Form } from 'formik';
import { TextField } from '../TextField/TextField.js';
import './LoginForm.css';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.css";
import { LoginRequest } from '../../utils/api.utils.js';


export const LoginForm = ({setForm}) => {
    const validate = Yup.object({
        email: Yup.string()

            .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Email inválido')
            .email()
            .required('Email em branco'),

        password: Yup.string()

            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,16}$/, 'Senha deve conter no mínimo 6 caracteres, uma letra maiscula, um número e um caractere especial')
            .min(6, 'Senha deve conter no mínimo 6 caracteres')
            .required('Senha em branco'),

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
                const {data} = await LoginRequest(values);
                const {username,token} = data;
                values.remember===true?localStorage.setItem('token',token):sessionStorage.setItem('token',token);

            }}
        >
            {props => (

                <div className='login-form'>

                    <h4 className='title'>Entrar no Ibook</h4>

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