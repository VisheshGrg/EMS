import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { approveLeaveRequest, getLeaveRequests, rejectLeaveRequest } from "@/Redux/Admin/Action";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const LeaveRequests = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("ALL");

    const {auth,admin} = useSelector(store=>store);

    useEffect(()=>{
        if(auth.user){
            dispatch(getLeaveRequests(auth.user,navigate)).then(()=>setLoading(false));
        }
    },[auth.user,dispatch,navigate]);

    const handleApprove = (leave_id) => {
        setLoading(true);
        if(auth.user){
            dispatch(approveLeaveRequest(leave_id,auth.user,navigate)).then(()=>setLoading(false));
        }
    }

    const handleReject = () => {
        setLoading(true);
        if(auth.user){
            dispatch(rejectLeaveRequest(leave_id,auth.user,navigate)).then(()=>setLoading(false));
        }
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "APPROVED":
                return "text-green-600";
            case "REJECTED":
                return "text-red-600";
            case "PENDING":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    const filteredRequests = filterStatus === "ALL" ? admin.leaveRequests : admin.leaveRequests.filter(request => request.status === filterStatus);

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-2 sm:p-5 flex flex-col items-center justify-start">

            <h1 className="text-2xl text-gray-800 font-medium w-full text-left border-b-4">Leave Requests</h1>

            <div className="w-[96%] sm:w-[90%] lg:w-[70%] md:w-[85%] flex flex-col justify-start items-center p-5 md:p-10 space-y-5">

                <Tabs defaultValue="ALL" className="w-[80%] mb-5">
                    <TabsList className="w-full">
                        <TabsTrigger value="ALL" onClick={() => setFilterStatus("ALL")} className="w-[25%]">All</TabsTrigger>
                        <TabsTrigger value="PENDING" onClick={() => setFilterStatus("PENDING")} className="w-[25%]">Pending</TabsTrigger>
                        <TabsTrigger value="APPROVED" onClick={() => setFilterStatus("APPROVED")} className="w-[25%]">Approved</TabsTrigger>
                        <TabsTrigger value="REJECTED" onClick={() => setFilterStatus("REJECTED")} className="w-[25%]">Rejected</TabsTrigger>
                    </TabsList>
                </Tabs>

                <p className="text-lg text-gray-600 font-medium">Total Leave Requests: <span className="text-blue-600">{filteredRequests ? filteredRequests.length : 0}</span></p>
                
                <ScrollArea className="h-[500px] w-full p-2 flex flex-col justify-start items-center">
                    {filteredRequests && filteredRequests.length > 0 ? filteredRequests.map((request) => (
                        <div key={request.leave_id} className="flex flex-col sm:flex-row flex-wrap space-y-4 md:space-y-0 justify-center items-center w-full shadow-md px-2 md:px-5 py-6 bg_img3 rounded-lg mb-8">
                            <div className="w-[90%] lg:w-[40%] md:w-[50%] flex flex-col justify-center items-center space-y-3 md:border-r-2">
                                <div>
                                    <Avatar className="h-[50px] w-[50px]">
                                        <AvatarImage src={request.photo} />
                                        <AvatarFallback>{request.name}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex flex-col justify-center items-center space-y-1">
                                    <p className="text-lg text-gray-600 font-medium">{request.name}</p>
                                    <p className="text-xs text-gray-700">( {request.uid} )</p>
                                    <p className="text-sm text-blue-800">
                                        <MailIcon style={{ height: '20px', width: '20px' }} className="text-blue-500 mr-2" />
                                        {request.email}
                                    </p>
                                </div>
                                {
                                    request.status=="PENDING" && (
                                        <div className="flex flex-row flex-wrap justify-center items-center w-full">
                                            <Button onClick={() => handleApprove(request.leave_id)} className="bg-green-600 text-xs w-[4rem] h-[2rem] mr-2">Approve</Button>
                                            <Button onClick={() => handleReject(request.leave_id)} className="bg-red-500 text-xs w-[4rem] h-[2rem]">Reject</Button>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="w-[90%] lg:w-[60%] md:w-[50%] px-2 md:px-5 flex flex-col items-center justify-center">  
                                <Table className="w-full">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-gray-600 font-medium">Status</TableCell>
                                            <TableCell className={`text-right font-medium ${getStatusClass(request.status)}`}>{request.status}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-gray-600 font-medium">Date of Request</TableCell>
                                            <TableCell className="text-right">{request.dateOfRequest}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-gray-600 font-medium">Leave Type</TableCell>
                                            <TableCell className="text-right">{request.leave_type}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-gray-600 font-medium">From Date</TableCell>
                                            <TableCell className="text-right">{request.from_date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-gray-600 font-medium">Till Date</TableCell>
                                            <TableCell className="text-right">{request.to_date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-gray-600 font-medium">Note</TableCell>
                                            <TableCell className="text-right">{request.note}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )) : (
                        <div className="w-full flex flex-col justify-center items-center">
                            <img src="https://img.freepik.com/premium-vector/nothing-here-flat-illustration_418302-77.jpg" className="w-[15%] h-[15%]"></img>
                            <p className="text-red-500">No leave requests found.</p>
                        </div>
                    )}
                </ScrollArea>

            </div>

        </div>
    )
}

export default LeaveRequests;