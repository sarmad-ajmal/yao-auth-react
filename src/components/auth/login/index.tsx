import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { loginAction } from '../auth.action'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrating yup validation with react-hook-form
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSuccess = () => {
    navigate('/')
  }
  const onSubmit = (data: any) => {
    console.log('Form Submitted', data)
    dispatch({
      type: loginAction.TRIGGER,
      payload: { data, onSuccess },
    })
  }

  return (
    <div className='signup-container'>
      <h2>Login</h2>
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

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
