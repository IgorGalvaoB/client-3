import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';

export const LoginForm = () => {
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,16}$/, 'Password must be 6-16 characters, at least one uppercase letter, one lowercase letter, one number and one special character')
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
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
            onSubmit={values => {
                console.log(values)
            }}
        >
            {props => (
                <div style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    "-webkit-transform": "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)"
                }}>
                    <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                    <Form>

                        <TextField label="Email" name="email" type="email" />
                        <TextField label="Password" name="password" type="password" />

                        <button className="btn btn-dark mt-3" type="submit">Login</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset">Cadastre-se</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}