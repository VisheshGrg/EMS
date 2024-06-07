import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { changeLeaveTypes, getLeaveTypesAdmin } from "@/Redux/Admin/Action";

const ChangeLeaveTypes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {auth,admin} = useSelector(store=>store);

    const [loading,setLoading] = useState(true);
    const [checkedList, setCheckedList] = useState({
        "Privileged Leave": false,
        "Casual Leave": false,
        "Sick Leave": false,
        "Maternity Leave": false,
        "Marriage Leave": false,
        "Paternity Leave": false,
        "Compensatory Off Leave": false,
        "LOP Leave": false,
    });

    useEffect(()=>{
        if(auth.user){
            dispatch(getLeaveTypesAdmin(auth.user,navigate)).then(()=>setLoading(false));
        }
    },[auth.user,dispatch,navigate]);

    useEffect(()=>{
        if(admin.leaveTypes){
            setCheckedList({
                "Privileged Leave":admin.leaveTypes[0]==1,
                "Casual Leave": admin.leaveTypes[1]==1,
                "Sick Leave": admin.leaveTypes[2]==1,
                "Maternity Leave": admin.leaveTypes[3]==1,
                "Marriage Leave": admin.leaveTypes[4]==1,
                "Paternity Leave": admin.leaveTypes[5]==1,
                "Compensatory Off Leave": admin.leaveTypes[6]==1,
                "LOP Leave": admin.leaveTypes[7]==1,
            })
        }
    },[admin.leaveTypes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(auth.user){
            dispatch(changeLeaveTypes(checkedList,auth.user,navigate)).then(() => setLoading(false));
        }
    }

    const handleCheckboxChange = (name) => {
        setCheckedList({
            ...checkedList,
            [name]: !checkedList[name]
        });
    };

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-5 flex flex-col items-center justify-start">

            <h1 className="text-2xl font-medium text-gray-800 border-b-4 text-left w-full">Manage Leave Types</h1>

            <div className="w-[30%] p-10">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {Object.entries(checkedList).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                            <span className="w-[80%] text-left">{key}</span>
                            <Input
                                name={key}
                                type="checkbox"
                                checked={value}
                                onChange={() => handleCheckboxChange(key)}
                                className="w-[20px] h-[20px]"
                            />
                        </div>
                    ))}

                    <div className="pt-8 flex justify-between">
                        <Button type="submit" className="bg-green-600">Save Changes</Button>
                        <Button onClick={()=>navigate("/")} className="bg-red-600">Cancel</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default ChangeLeaveTypes;