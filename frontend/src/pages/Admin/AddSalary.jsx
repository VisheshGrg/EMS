import { addSalary } from "@/Redux/Admin/Action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Loader from "../Loader/Loader";

const formSchema = z.object({
    sid: z.string().nonempty("Salary ID is required"),
    uid: z.string().nonempty("Employee ID is required"),
    salary_amount: z.string().nonempty("Salary amount is required"),
    salary_type: z.enum(["Base Salary", "Bonus", "Overtime", "Income Tax", "Professional Tax", "Leave Deduction"],{
        errorMap: () => ({message: "Salary type is required"})
    }),
    salary_des: z.string().nonempty("Salary description is required"),
});

const AddSalary = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChecked,setIsChecked] = useState(false);
    const [loading,setLoading] = useState(false);

    const {auth} = useSelector(store=>store);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sid: "",
            uid: "",
            salary_amount: "",
            salary_type: "",
            salary_des: "",
        },
    });

    const onSubmit = (data) => {
        setLoading(true);
        if(auth.user){
            dispatch(addSalary(data,auth.user,navigate)).then(()=>setLoading(false));
        }
    }

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-5 flex flex-col justify-start items-center">
            
            <h1 className="w-full text-left border-b-4 text-2xl font-medium text-gray-800">Add Salary</h1>

                <Form {...form}>

                    <form className="space-y-4 w-[40%] p-10" onSubmit={form.handleSubmit(onSubmit)}>

                        <p className="text-xs text-red-600 mb-8">Note: Please fill the fields very carefully. In case of taxes and deductions salary, the amount will be deducted from the total salary.</p>

                        <div className="flex justify-between items-center w-full">
                            <label>Salary ID </label>
                            <FormField control={form.control} 
                                name="sid"
                                render={({field}) => <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                        type="text"
                                        className="border w-[20rem] border-gray-700 py-5 px-5"
                                        placeholder="Salary ID" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label>Employee ID</label>
                            <FormField control={form.control} 
                                name="uid"
                                render={({field}) => <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                        type="text"
                                        className="border w-[20rem] border-gray-700 py-5 px-5"
                                        placeholder="Employee ID" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label>Salary Amount</label>
                            <FormField control={form.control} 
                                name="salary_amount"
                                render={({field}) => <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                        type="text"
                                        className="border w-[20rem] border-gray-700 py-5 px-5"
                                        placeholder="Salary amount" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label>Salary Type</label>
                            <Controller
                                control={form.control}
                                name="salary_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-[20rem]">
                                                    <SelectValue placeholder="Salary Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Base Salary">Base Salary</SelectItem>
                                                        <SelectItem value="Bonus">Bonus</SelectItem>
                                                        <SelectItem value="Overtime">Overtime</SelectItem>
                                                        <SelectItem value="Income Tax">Income Tax</SelectItem>
                                                        <SelectItem value="Professional Tax">Professional Tax</SelectItem>
                                                        <SelectItem value="Leave Deduction">Leave Deduction</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label>Salary Description</label>
                            <FormField control={form.control} 
                                name="salary_des"
                                render={({field}) => <FormItem>
                                    <FormControl>
                                        <Textarea {...field}
                                        type="text"
                                        className="border w-[20rem] border-gray-700 py-5 px-5"
                                        placeholder="Salary Description" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="flex items-center pt-3 space-x-3">
                            <Checkbox id="terms" checked={isChecked} onCheckedChange={setIsChecked} />
                            <label
                                htmlFor="terms"
                                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I confirm that the entered salary details are accurate and comply with the company's policies. I understand that any errors may result in payroll discrepancies.
                            </label>
                        </div>
                        <div className="w-full flex flex-row justify-around items-center">
                            <Button variant="seconadry" type="submit" className="mt-5 w-[10rem] bg-green-600 text-white" disabled={!isChecked}>Submit</Button>
                            <Button variant="seconadry" onClick={() => navigate("/")} className="mt-5 w-[10rem] bg-red-500 text-white">Cancel</Button>
                        </div>
                    </form>

                </Form>

        </div>
    )
}

export default AddSalary;