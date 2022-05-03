import React from 'react';
import { ErrorMessage, useField } from 'formik';
import './TextField.css';
import "bootstrap/dist/css/bootstrap.css";

export const TextField = ({ label,signup, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='container-field'>
      {signup&& <label htmlFor={props.id || props.name}>{label}</label> }
      <input
        className={`form-control shadow-none  ${meta.touched && meta.error && 'is-invalid'} `}
        {...field}  {...props} 
        autoComplete='off'
        style={{backgroundColor:"rgb(78,79,80)"}}
      />
      <ErrorMessage component="p" name={field.name} className='error-message'/>
    </div>
  )
}