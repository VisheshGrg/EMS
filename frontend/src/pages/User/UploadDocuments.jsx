import { uploadFiles } from "@/Redux/Info/Action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    file: z.any().optional(),
});

const UploadDocumentForm = ({onClose,target}) => {

    const [loading,setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!selectedFile){
            return;
        }

        const formData = new FormData();
        formData.append('file',selectedFile);
        setLoading(true);
        dispatch(uploadFiles(formData,auth.user,navigate)).then(()=>{
            setLoading(false);
            onClose();
        });
        if(target=="PROFILE"){
            navigate("/profile");
        }
        else{
            navigate("/");
        }
    }

    if(loading){
        return <Loader/>
    }
    
    return(
        <div>
            <form className="space-y-5 flex w-full flex-col justify-center items-center" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="w-full flex justify-around items-center">
                        <label className="w-[25%] text-center">Browse: </label>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            className="border w-[75%] border-gray-700 py-2 px-4 rounded-lg"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center space-y-3">
                        <Button variant="seconadry" type="submit" className="mt-5 w-[10rem] bg-blue-800 text-white">Upload</Button>
                    </div>
                </form>
        </div>
    )

}

export default UploadDocumentForm;