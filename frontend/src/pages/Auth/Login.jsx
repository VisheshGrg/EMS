import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";  
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/Redux/Auth/Action";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8,"Password must be atleast 8 characters long"),
});

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(login(data,navigate));
    }

    return(
        <div className="h-[100vh] w-[100%] flex justify-center items-center">
            <div className="space-y-6 w-[400px] p-10 rounded-xl">
                <h1 className="text-xl font-semibold">Login</h1>

                <Form {...form}>

                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} 
                            name="email"
                            render={({field}) => <FormItem>
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Email" />   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                        <FormField control={form.control} 
                            name="password"
                            render={({field}) => <FormItem>
                                <FormControl>
                                    <Input {...field}
                                    type="password"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Password" />   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                        <div className="w-full flex flex-col justify-center items-center space-y-3">
                            <Button variant="seconadry" type="submit" className="mt-5 w-[10rem] bg-gray-400">Login</Button>
                            <span>Don't have an account? <a className="no-underline text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>Signup</a></span>
                            <div className="flex flex-row justify-around items-center w-full">
                                <Button variant="secondary" onClick={() => navigate("/verifyEmail")} className="mt-5 w-[8rem] text-xs text-gray-800">Forgot Password</Button>
                                <Button variant="secondary" onClick={() => navigate("/loginOTPEmail")} className="mt-5 w-[8rem] text-xs text-gray-800">Login with OTP</Button>
                            </div>
                        </div>
                    </form>

                </Form>

            </div>
        </div>
    )
}

export default Login;