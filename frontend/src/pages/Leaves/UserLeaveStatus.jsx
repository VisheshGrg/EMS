import { cancelLeave, getLeaveStatus } from "@/Redux/Info/Action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const UserLeaveStatus = () => {

    const [loading,setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {auth,info} = useSelector(store=>store);
    
    useEffect(()=>{
        if(auth.user){
            dispatch(getLeaveStatus(auth.user,navigate)).then(() => setLoading(false));
        }
    },[auth.user, dispatch, navigate]);

    const handleCancelLeave = (leave_id) => {
        setLoading(true);
        if(auth.user){
            dispatch(cancelLeave(auth.user,leave_id,navigate)).then(() => setLoading(false));
        }
    }

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-5">
            <h1 className="text-2xl text-gray-800 font-medium border-b-4">Leave's Status</h1>

            <div className="p-10 flex flex-col justify-start items-center space-y-5">

                {info.userLeaves.length>0 && (
                    <div className="flex flex-col justify-start items-center w-[70%] space-y-5">
                        <p className="text-xs text-red-500">Note: *Only those requests will be visible whose status is pending and not approved/rejected by the admin*</p>
                        <p className="text-lg text-gray-600 font-medium">Total leave requests pending: <span className="text-gray-600">{info.userLeaves.length}</span></p>
                    </div>
                )}

                {info.userLeaves.length>0 ? (
                    info.userLeaves.map((leave,index) => (
                        <div key={index} className="flex flex-col p-5 justify-center items-start w-[60%] space-y-2 shadow-lg rounded-lg bg_img2">
                            <div className="flex justify-between items-center w-full border-b-2">
                                <p className={`text-xl font-medium ${true ? 'text-red-500' : 'text-green-500'}`}>{leave.status}</p>
                                <p className="text-xl font-medium text-gray-800">{leave.dateOfRequest}</p>
                            </div>
                            <p className="text-sm">Leave Type: <span className="">{leave.leave_type}</span></p>
                            <p className="text-gray-800">Period: <span className="">{leave.from_date} - {leave.to_date}</span></p>
                            <p className="text-sm">{leave.note}</p>
                            <div className="w-full pt-3">
                                <Button className="w-[6rem] text-left bg-red-600 text-xs" onClick={()=>handleCancelLeave(leave.leave_id)}>Cancel Leave</Button>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="flex flex-col justify-start items-center">
                        <img src="https://img.freepik.com/premium-vector/nothing-here-flat-illustration_418302-77.jpg" className="w-[35%] h-[35%]"></img>
                        <p className="text-lg font-medium text-red-500 text-center">No leave request pending.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default UserLeaveStatus;