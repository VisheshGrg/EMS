import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";  
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getLeaveTypes, markLeave } from "@/Redux/Info/Action";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

const formSchema = z.object({
    leave_type: z.enum(["PL", "CL", "SL", "ML", "COFF"], {
        errorMap: () => ({ message: "Leave type is required" })
    }),
    from_date: z.string().nonempty("From Date is required"),
    to_date: z.string().nonempty("To Date is required"),
    note: z.string().nonempty("Note is required"),
});

const MarkLeave = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const {auth,info} = useSelector(store=>store);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leave_type:"",
            from_date: "",
            to_date: "",
            note: "",
        },
    });

    useEffect(()=>{
        if(auth.user){
            dispatch(getLeaveTypes(auth.user,navigate)).then(() => setLoading(false));
        }
    },[auth.user, dispatch, navigate]);

    const leaveTypeOptions = [
        { value: "PL", label: "Privileged Leave" },
        { value: "CL", label: "Casual Leave" },
        { value: "SL", label: "Sick Leave" },
        { value: "ML", label: "Maternity Leave" },
        { value: "MrL", label: "Marriage Leave" },
        { value: "PtL", label: "Paternity Leave" },
        { value: "COFF", label: "COFF Leave" },
        { value: "LOP", label: "LOP" }
    ];

    const onSubmit = (data) => {
        setLoading(true);
        if(auth.user){
            dispatch(markLeave(data,auth.user,navigate)).then(()=>setLoading(false));
        }
    }

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-5">
            <h1 className="text-2xl text-gray-800 font-medium border-b-4">Mark Leave</h1>

            <div className="w-full flex justify-center items-start p-10">
                <Form {...form} className="">

                    <form className="space-y-8 lg:w-[40%] md:w-[60%] xs:w-[80%]" onSubmit={form.handleSubmit(onSubmit)}>

                        <p className="text-xs text-red-500">Note: 'From Date' and 'Till Date' will be counted under leave days so mark accordingly.</p>
                        
                        <div className="flex justify-between items-center">
                            <label className="w-[35%]">Leave Type: </label>
                            <Controller
                                control={form.control}
                                name="leave_type"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[65%]">
                                            <SelectValue placeholder="Leave Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    info.leaveTypes && info.leaveTypes.map((val,index) => (
                                                        val==1 && (
                                                            <SelectItem key={index} value={leaveTypeOptions[index].value}>
                                                                {leaveTypeOptions[index].label}
                                                            </SelectItem>
                                                        )
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="w-[35%]">From Date: </label>
                            <FormField control={form.control} 
                                name="from_date"
                                render={({field}) => <FormItem  className="w-[65%]">
                                    <FormControl>
                                        <Input {...field}
                                        type="date"
                                        className="border w-full border-gray-300 py-5 px-5"
                                        placeholder="From Date" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="w-[35%]">Till Date: </label>
                            <FormField control={form.control} 
                                name="to_date"
                                render={({field}) => <FormItem  className="w-[65%]">
                                    <FormControl>
                                        <Input {...field}
                                        type="date"
                                        className="border w-full border-gray-300 py-5 px-5"
                                        placeholder="To Date" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="w-[35%]">Add Note: </label>
                            <FormField control={form.control} 
                                name="note"
                                render={({field}) => <FormItem className="w-[65%]">
                                    <FormControl>
                                        <Textarea {...field}
                                        type="text"
                                        className="border border-gray-300 py-5 px-5"
                                        placeholder="Note" />   
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>}
                            />
                        </div>
                        <div className="w-full flex justify-around items-center">
                            <Button variant="primary" type="submit" className="mt-5 w-[10rem] bg-blue-600 text-white">Mark Leave</Button>
                            <Button variant="primary" onClick={() => navigate("/")} className="mt-5 w-[10rem] bg-red-500 text-white">Cancel</Button>
                        </div>
                    </form>

                    </Form>
            </div>
            
        </div>
    )
}

export default MarkLeave;