import { FormInput } from '@/common'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { loginAction } from '../auth.action'
import { AUTH_URLS } from '../routes'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

const LoginPage = () => {
  const form = useForm({
    resolver: yupResolver(schema), // Integrating yup validation with react-hook-form
  })
  const { control } = form
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='mx-auto grid w-[350px] gap-6 min-h-[50vh]'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <div className='grid gap-4'>
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
              Login
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              to={`${AUTH_URLS.DEFAULT}${AUTH_URLS.REGISTER}`}
              className='underline'
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default LoginPage
