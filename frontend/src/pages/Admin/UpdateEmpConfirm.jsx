import { getEmployeeInfo } from "@/Redux/Admin/Action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
    uid: z.string().nonempty("Employee ID is required").min(1, "Employee ID must be at least 1 character long")
});

const UpdateEmpConfirm = ({onClose}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {auth} = useSelector(store=>store);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uid: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(getEmployeeInfo(data,auth.user,navigate));
        onClose();
    }
    
    return(
        <div>
            <Form {...form}>

                <form className="space-y-5 flex w-full flex-col justify-center items-center" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex justify-between items-center">
                        <label className="w-[40%] xs:w-[30%] text-sm xs:text-base md:text-lg">Employee ID</label>
                        <FormField control={form.control} 
                            name="uid"
                            render={({field}) => <FormItem className="w-[60%] xs:w-[70%]">
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 py-2 px-4 rounded-lg"
                                    placeholder="Employee ID"/>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center space-y-3">
                        <Button variant="primary" type="submit" className="mt-5 w-[10rem] bg-blue-800 text-white hover:bg-blue-600">Confirm</Button>
                    </div>
                </form>

            </Form>
        </div>
    )

}

export default UpdateEmpConfirm;