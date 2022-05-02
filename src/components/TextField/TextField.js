import { ErrorMessage, useField } from 'formik';
import './TextField.css';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="sm">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control field ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="p" name={field.name} className='error-message'/>
    </div>
  )
}