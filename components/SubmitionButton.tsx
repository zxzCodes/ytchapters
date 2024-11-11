'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
interface SubmitionButtonProps {
    text: string
}

export default function SubmitionButton({text}: SubmitionButtonProps) {
    const {pending} = useFormStatus()
  return (
    <Button disabled={pending}>
        {pending ? 
        <Loader2 className=' mr-2 h-6 w-6 animate-spin' />
        
        
        : text}
    </Button>
  )
}
