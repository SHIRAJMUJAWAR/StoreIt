'use client'

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from './ui/button';
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const OtpModal = ({accountId, email} : {accountId :string; email : string}) => {
   const router = useRouter();
   const [isopen, setIsOpen] = useState(true);
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifySecret({ accountId, password });
      router.push('/');
    } catch (error) {
      console.error("Error submitting OTP:", error);
    }
   setIsLoading(false); 
} 

 const handleResendOtp = async () => {
     await sendEmailOTP(email);
 }

  return (
<AlertDialog open={isopen} onOpenChange={setIsOpen}>
  
  <AlertDialogContent className='shad-alert-dialog'>
    <AlertDialogHeader className='relative flex justify-center'>
      <AlertDialogTitle className='h2 text-center'> Enter Your OTP
        <img src="/assets/icons/close-dark.svg" alt="close"
              width={20} height={20} onClick={() => setIsOpen(false)}
              className='otp-close-button'
        />
      </AlertDialogTitle>
      <AlertDialogDescription className='subtitle-2 text-center text-light-100'>
        we've sent a code to <span className='pl-1 text-pink-400'>{email}</span>
      </AlertDialogDescription>
    </AlertDialogHeader>

<InputOTP maxLength={6} value={password} onChange={setPassword}>
  <InputOTPGroup className='shad-otp'>
    <InputOTPSlot index={0} className='shad-otp-slot'/>
    <InputOTPSlot index={1} className='shad-otp-slot'/>
    <InputOTPSlot index={2} className='shad-otp-slot'/>
    <InputOTPSlot index={3} className='shad-otp-slot'/>
    <InputOTPSlot index={4} className='shad-otp-slot'/>
    <InputOTPSlot index={5} className='shad-otp-slot'/>
  </InputOTPGroup>
</InputOTP>

    <AlertDialogFooter>
        <div className='flex w-full flex-col gap-4'>

          <AlertDialogAction className='shad-submit-btn h-12 w-full' onClick={handleSubmit}>Submit
            {isLoading && <img src="/assets/icons/loader.svg" alt="loading" width={20} height={20} className='ml-2 animate-spin inline-block'/>}
            </AlertDialogAction>
           <div className='subtitle-2 mt-2 text-center text-center text-light-100'>
            Didn't receive the code?
            <Button variant="link" className='underline text-pink-400' onClick={handleResendOtp}>Resend OTP
             </Button>
            </div>  
        </div> 
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default OtpModal
