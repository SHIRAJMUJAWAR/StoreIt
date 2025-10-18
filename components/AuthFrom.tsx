 "use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

type AuthType = "sign-in" | "sign-up"

const AuthFrom = ({type} : {type: AuthType}) => {
   const [isloading, setIsloading] = useState(false)
   const [errorMessage, seterrorMessage] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    console.log(values)
  }
  return (<> 
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
      <h1 className="form-title">
        {type === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>
      { type === "sign-up" &&  (<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
                <FormLabel className="shad-form-label">Your Name</FormLabel>
                <FormControl>
                <Input placeholder="Enter your full name"   {...field} className="shad-input"/>
              </FormControl>
              </div>
              
              <FormMessage className="shad-form-message"/>
            </FormItem>
          )}
        />
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
                <FormLabel className="shad-form-label">Email</FormLabel>
                <FormControl>
                <Input placeholder="Enter your email" {...field} className="shad-input" />
              </FormControl>
              </div>
              
              <FormMessage className="shad-form-message"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="form-submit-button" disabled={isloading}>
          {type === "sign-in" ? "Sign In" : "Sign Up"}
          {isloading && (
            <img src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="animate-spint mi-2" />
          )}
        </Button>

       { errorMessage && <p className="error-message"> {errorMessage}</p> }
 
       <div className="body-2 flex justify-center">
         <p className="text-light-100">
           {type === "sign-in"  ? "Don't have an account?" : "Already have an account?"}
         </p>
         <Link href ={type === "sign-in" ? "/sign-up" : "/sign-in" } className="ml-1 font-medium text-pink-600">
          {type === "sign-in" ? "Sign Up" : "Sign In"}
         </Link>
        </div> 
      </form>
    </Form>
    {/* {Verifiction OPT} */}
    </>
  )
}

export default AuthFrom
