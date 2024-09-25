import Confetti from 'react-confetti'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type WelcomeUserProps = {
  name: string
}
export default function WelcomeUser(props: WelcomeUserProps) {
  const { name } = props
  const width = window.innerWidth
  const height = window.innerHeight
  return (
    <div className='flex items-center justify-center h-screen'>
      <Confetti
        width={width}
        height={height}
        wind={0.08}
        numberOfPieces={100}
      />

      <Card className='max-w-md mx-auto mt-10 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-semibold'>
            Welcome, {name}!
          </CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600'>
            We are glad to have you here. Enjoy your stay!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
