import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { authenticateUserAction } from '../auth.action'
import { getAuthStateSelector } from '../auth.selector'
import { FormInput } from '@/common'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { AUTH_URLS } from '../routes'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  email1: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const RegisterPage = () => {
  const form = useForm({
    resolver: yupResolver(schema), // Integrating yup validation with react-hook-form
  })

  const { handleSubmit, control } = form
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <div className='mx-auto grid w-[350px] gap-6 min-h-[50vh]'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your information to create an account
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormInput
                label='First Name'
                placeholder='Jane'
                control={control}
                name='firstName'
              />
              <FormInput
                label='Last Name'
                placeholder='Doe'
                control={control}
                name='lastName'
              />
            </div>
            <FormInput
              label='Email'
              placeholder='Enter your email'
              control={control}
              name='email'
            />
            <FormInput
              label='Password'
              placeholder='* * * *'
              control={control}
              name='password  '
              type='password'
            />

            <Button type='submit' className='w-full'>
              Register
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link
              to={`${AUTH_URLS.DEFAULT}${AUTH_URLS.LOGIN}`}
              className='underline'
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default RegisterPage
