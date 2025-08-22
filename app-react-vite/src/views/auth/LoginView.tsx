import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import { zodResolver } from "@hookform/resolvers/zod";
import type { formLogin } from "../../schema";
import { loginStart } from "../../schema/schemas";
import ErrorMessage from "../../ui/ErrorMessage";
import { login } from "../../server";
import { toast } from "react-toastify";

export default function LoginView() {
    const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm<formLogin>({
      resolver: zodResolver(loginStart),
    });

    const handleLogin = async(data:formLogin)=>{
      
      const response = await login(data)
      if(!response?.result || !response.valoration){
        toast.error(response?.message)
        return
      }      
    
      
     localStorage.setItem('token',response.data[0].token)
      toast.success(response.message)
      reset()
      
    }
 return <>
     <Heading>Login</Heading>
       <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
               <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
                 <div className="space-y-2">
                   <label htmlFor="user_id" className="text-slate-800">
                     Email
                   </label>
                     <input type="email"  placeholder="root@gmail.com" id="email"{...register("email")} className="block w-full p-3 bg-slate-100">
                   </input>
                   {errors.email && (
                     <ErrorMessage>{errors.email.message}</ErrorMessage>
                   )}
                 </div>

                  <div className="space-y-2">
                   <label htmlFor="user_id" className="text-slate-800">
                     Password
                   </label>
                     <input type="password" placeholder="*********"  id="password"{...register("password")} className="block w-full p-3 bg-slate-100">
                   </input>
                   {errors.password && (
                     <ErrorMessage>{errors.password.message}</ErrorMessage>
                   )}
                 </div>
 
                 
                 <input
                   type="submit"
                   className="bg-blue-600 hover:bg-blue-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
                   value="Create"
                 />
               </form>
             </div>
   </>;
}
