import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";  
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "@/Redux/Auth/Action";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
});

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(register(data,navigate));
    }

    return(
        <div className="h-[100vh] w-[100%] flex justify-center items-center">
            <div className="space-y-6 w-[400px] p-10 rounded-xl">
                <h1 className="text-xl font-semibold">Register</h1>

                <Form {...form}>

                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} 
                            name="name"
                            render={({field}) => <FormItem>
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Full Name" />   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
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
                        <FormField control={form.control} 
                            name="confirmPassword"
                            render={({field}) => <FormItem>
                                <FormControl>
                                    <Input {...field}
                                    type="password"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Confirm Password" />   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                        <div className="w-full flex flex-col justify-center items-center space-y-3">
                            <Button variant="seconadry" type="submit" className="mt-5 w-[10rem] bg-gray-400">Register</Button>
                            <span>Already have an account? <a className="no-underline text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Login</a></span>
                        </div>
                    </form>

                </Form>

            </div>
        </div>
    )
}

export default Register;