import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  const randomNumber = Math.floor(Math.random() * 5) + 1

  return (
    <div className='w-full h-full lg:grid  lg:grid-cols-2 '>
      <div className='flex items-center justify-center py-12'>
        <Outlet />
      </div>
      <div className='hidden bg-muted lg:block'>
        <div
          style={{
            backgroundImage: `url(
          ${window.location.origin}/assets/images/${randomNumber}.jpg
          )`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundOrigin: 'border-box',
            backgroundBlendMode: 'lighten',
          }}
          className='h-screen	 w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  )
}
