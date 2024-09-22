import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { authenticateUserAction } from '../auth.action'
import { getAuthStateSelector } from '../auth.selector'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrating yup validation with react-hook-form
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector(getAuthStateSelector)
  const onSuccess = () => {
    navigate('/')
  }
  const onSubmit = (data: any) => {
    console.log('Form Submitted', data)
    dispatch({
      type: authenticateUserAction.TRIGGER,
      payload: { data, onSuccess },
    })
  }

  return (
    <div className='signup-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type='email' {...register('email')} />
          {errors.email && (
            <p className='error-message'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input type='password' {...register('password')} />
          {errors.password && (
            <p className='error-message'>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>First Name:</label>
          <input type='text' {...register('firstName')} />
          {errors.firstName && (
            <p className='error-message'>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input type='text' {...register('lastName')} />
          {errors.lastName && (
            <p className='error-message'>{errors.lastName.message}</p>
          )}
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default RegisterPage
