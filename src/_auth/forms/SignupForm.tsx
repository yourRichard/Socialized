import { SignupValidation} from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Link,} from 'react-router-dom'
import * as z from "zod";
import { Button } from "@/components/ui/button"
import { SigmaSquare } from 'lucide-react';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader";
import { createUserAccount } from "@/lib/appwrite/api";


const SignupForm = () => {
    const isLoading = false;
    const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
        defaultValues: {
          name: "",
          username: "",
          email: "",
          password: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof SignupValidation>) {
        const newUser = await createUserAccount(values);
        console.log(newUser)
      }
  return (
    <Form {...form}>
        <div className='sm:w-420 flex-center flex-col w-full'>
            <p className="text-white flex text-3xl font-bold"><SigmaSquare size={35} absoluteStrokeWidth  className="mr-1 text-primary"/> <span className="text-zinc-600">Socialized</span></p>
            <h2 className="text-primary-foreground h3-bold md:h2-bold pt-2">
                Create a new account
            </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-1/2  ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Name</FormLabel>
              <FormControl>
                <Input type="text" className="bg-accent-foreground border border-primary text-slate-200" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Username</FormLabel>
              <FormControl>
                <Input type="text" className="bg-accent-foreground border border-primary text-slate-200  " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input type="email" className="bg-accent-foreground border border-primary text-slate-200 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Password</FormLabel>
              <FormControl>
                <Input type="password" className="bg-accent-foreground border border-primary text-slate-200 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
            {isLoading ? (
            <div className="flex-center gap-2">
                <Loader/> Loading...
            </div>
            ) : (
                "Sign up"
            )}
        </Button>
        <p className="text-small-regular text-zinc-300 text-center">
                Already have an account?
                <Link to="/sign-in" className="text-primary hover:underline decoration-ring">  Log in</Link>
        </p>
      </form>
      </div>

    </Form>
  )
}

export default SignupForm