import { updateEmployeeInfo } from "@/Redux/Admin/Action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Loader from "../Loader/Loader";

const formSchema = z.object({
    department: z.string().min(1, { message: "Department is required" }),
    age: z
        .string()
        .refine(value => !isNaN(Number(value)), { message: "Age must be a number" })
        .transform(value => Number(value))
        .refine(value => value >= 18, { message: "Age must be at least 18" }),
    bg: z.string().min(1, { message: "Blood Group is required" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    alt_phone: z.string().optional(),
    pers_email: z.string().email({ message: "Invalid email address" }),
    curr_address: z.string().min(1, { message: "Current address is required" }),
    perm_address: z.string().min(1, { message: "Permanent address is required" }),
});

const UpdateEmpInfo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChecked,setIsChecked] = useState(false);
    const [loading,setLoading] = useState(false);

    const {auth,admin} = useSelector(store=>store);

    useEffect(()=>{
        if(!auth.user || !admin.empInfo){
            navigate("/");
        }
    },[auth.user,navigate,dispatch]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: admin.empInfo?.department || "",
            age: admin.empInfo?.age || "",
            bg: admin.empInfo?.blood_group || "",
            phone: admin.empInfo?.phoneNo || "",
            alt_phone: admin.empInfo?.alt_phoneNo || "",
            pers_email: admin.empInfo?.pers_email || "",
            curr_address: admin.empInfo?.address || "",
            perm_address: admin.empInfo?.perm_address || "",
        },
    });

    const onSubmit = (data) => {
        setLoading(true);
        const payload = {
            ...data,
            email: admin.empInfo.email,
            salary_amount: admin.empInfo.salary_amount,
            salary_total: admin.empInfo.salary,
        }
        if(auth.user){
            dispatch(updateEmployeeInfo(payload,auth.user,navigate)).then(()=>setLoading(false));
        }
        else{
            navigate("/");
        }
    }

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-2 md:p-5 flex flex-col items-center justify-start">

            <h1 className="text-lg md:text-2xl text-gray-700 font-medium border-b-4 w-full text-left">Update Employee Info</h1>
            
            <Form {...form}>

                <form className="space-y-5 p-5 sm:p-10 flex w-[90%] sm:w-[75%] md:w-[60%] flex-col justify-center items-center" onSubmit={form.handleSubmit(onSubmit)}>

                    <p className="text-xs text-red-600 w-full text-left">Note: Please update the information carefully as this will result into change in Employee Information</p>

                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Department</label>
                        <FormField control={form.control} 
                            name="department"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Department"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Age</label>
                        <FormField control={form.control} 
                            name="age"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Input {...field}
                                    type="number"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Age"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Blood Group</label>
                        <FormField control={form.control} 
                            name="bg"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Blood Group"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Phone No</label>
                        <FormField control={form.control} 
                            name="phone"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Phone Number"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Alternate Phone No</label>
                        <FormField control={form.control} 
                            name="alt_phone"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Alternate Phone Number"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Personal Email ID</label>
                        <FormField control={form.control} 
                            name="pers_email"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Personal Email"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Current Address</label>
                        <FormField control={form.control} 
                            name="curr_address"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Textarea {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Current Address"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[35%] text-sm sm:text-base md:text-lg">Permanent Address</label>
                        <FormField control={form.control} 
                            name="perm_address"
                            render={({field}) => <FormItem className="w-[65%]">
                                <FormControl>
                                    <Textarea {...field}
                                    type="text"
                                    className="border border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Permanent Address"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="flex items-center pt-3 space-x-3 w-full">
                        <Checkbox id="terms" checked={isChecked} onCheckedChange={setIsChecked} />
                        <label
                            htmlFor="terms"
                            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Please confirm that the information provided is accurate and you approve the update. 
                        </label>
                    </div>
                    <div className="w-full flex flex-row justify-around items-center">
                        <Button variant="secondary" type="submit" className="mt-5 w-[45%] max-w-[10rem] bg-blue-700 text-white" disabled={!isChecked}>Confirm</Button>
                        <Button variant="secondary" onClick={() => navigate("/")} className="mt-5 w-[45%] max-w-[10rem] bg-red-600 text-white">Cancel</Button>
                    </div>
                </form>

            </Form>

        </div>
    )
}

export default UpdateEmpInfo;