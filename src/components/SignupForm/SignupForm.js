import { Formik, Form } from 'formik';
import { TextField } from '../TextField/TextField.js';
import './SignupForm.css';
import * as Yup from 'yup';
import  ApiHandler  from '../../utils/api.utils.js';
import { useState } from 'react';

export const SignupForm = ({ setForm }) => {
  const [error, setError] = useState('');
  const validate = Yup.object({

    firstName: Yup.string()

      .min(2, 'Nome deve conter no mínimo 3 caracteres')
      .required('Preenchimento obrigatório'),

    lastName: Yup.string()

      .max(20, 'Nome deve conter no máximo 20 caracteres'),

    email: Yup.string()

      .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Email inválido')
      .email()
      .required('Preenchimento obrigatório'),

    password: Yup.string()

      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,16}$/, 'Senha deve conter no mínimo 6 caracteres, uma letra maiscula, um número e um caractere especial')
      .min(6, 'Senha deve conter no mínimo 6 caracteres')
      .required('Preenchimento obrigatório'),

    confirmPassword: Yup.string()

      .oneOf([Yup.ref('password'), null], 'Senhas divergentes')
      .required('Preenchimento obrigatório'),

  })
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        let name = values.firstName;
        if (values.lastName) {
          name = `${values.firstName} ${values.lastName}`;
        }
        const data = await ApiHandler.NewAccountRequest({ name: name, email: values.email, password: values.password, username: values.username });

        if (data.error === "Username already exist") setError("Nome de usuário já existe");

        else if (data.error === "Email already exist") setError("Este email já está em uso");

        else setError(data.error);

      }

      }
    >
      {formik => (
        <div className='signup-form'>
          <h4 className="title">Registre-se</h4>
          <h6>{error}</h6>
          <Form>
            <TextField label="Primeiro nome:" name="firstName" type="text" signup='true' placeholder="Obrigatório" />
            <TextField label="Sobrenome:" name="lastName" type="text" signup='true' placeholder="Opcional" />
            <TextField label="Nome de usuário" name="username" type="text" signup='true' placeholder="Obrigatório" />
            <TextField label="Email:" name="email" type="email" signup='true' placeholder="Obrigatório" />
            <TextField label="Senha:" name="password" type="password" signup='true' placeholder="Obrigatório" />
            <TextField label="Confirmar senha:" name="confirmPassword" type="password" signup='true' placeholder="Obrigatório" />
            <div className="btn-container">
              <button className="btn btn-dark mt-3 shadow-none" type="submit">Registrar</button>
              <button className="btn btn-light mt-3 ml-3 shadow-none" type="reset">Limpar</button>
            </div>
            <button className='btn btn-light shadow-none' onClickCapture={() => setForm('login')} type="button" style={{ width: "130px", margin: "auto", display: "block", marginTop: "20px", marginBottom: "20px" }} onClick={() => { }}>Entrar</button>
          </Form>
        </div>
      )}
    </Formik>
  )
} 