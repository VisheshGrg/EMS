import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "@/Redux/Info/Action";
import { punch } from "@/Redux/Punch/Action";
import Loader from "../Loader/Loader";
import { getUser } from "@/Redux/Auth/Action";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import UpdateEmpConfirm from "../Admin/UpdateEmpConfirm";

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store);

    const [loading,setLoading] = useState(true);
    const [coords, setCoords] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
        } else {
        console.log("Geolocation is not available in your browser.");
        }
    }, [auth.user,navigate]);

    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        if(storedJwt){
            const parsedJwt = JSON.parse(storedJwt);
            dispatch(getUser(parsedJwt)).then(()=>setLoading(false));
        } 
    },[auth.jwt]);

    const handlePunching = () => {
        
        if(auth.user){
            setLoading(true);
            dispatch(punch(coords,auth.user,navigate)).then(()=>setLoading(false));
        }

    }

    if(loading){
        return <Loader/>
    }

    return(
        <div className="mt-10 ml-5 mr-5 h-[100vh] flex flex-col space-y-10">

            <div className="flex flex-row flex-wrap justify-around items-center">
                <div className="w-[85%] sm:w-[55%] md:w-[35%] min-h-[225px] rounded-xl bg_grad p-5 flex flex-row shadow-lg">
                    {
                        !auth.user.isAdmin && (
                            <div className="w-[35%] flex justify-center">
                                <Avatar className="w-[100px] h-[100px] shadow-xl">
                                    <AvatarImage src={auth.user.photo} />
                                    <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                        )
                    }
                    {
                        !auth.user.isAdmin ? (
                            <div className="w-[65%] pl-4 flex flex-col space-y-4 justify-start">
                                <p className="text-2xl font-medium text-blue-300">{auth.user.name}</p>
                                <div className="space-y-1">
                                    <p className="text-sm text-white">Employee ID: {auth.user.uid}</p>
                                    <p className="text-sm text-white">{auth.user.department=="" ? (<span className="text-red-500">*Department not alloted*</span>):auth.user.department}</p>
                                    <p className="text-sm text-white"><span><MailIcon style={{ height: '18px', width: '18px' }}  className="text-blue-300  mr-2" /></span>{auth.user.email}</p>
                                </div>
                                <div className="flex flex-row flex-wrap justify-start items-center">
                                    <Button variant="ghost" onClick={() => navigate("/profile")} className="font-medium btn-hover bg-blue-600 w-[5.5rem] text-xs mr-5 text-blue-200 m-1">View Profile</Button>
                                    {
                                        !auth.user.isPunched && (
                                            <Button variant="ghost" onClick={() => handlePunching()} className="font-medium btn-hover bg-blue-600 w-[5.5rem] text-xs text-blue-200 m-1">Punch</Button>
                                        )
                                    }
                                </div>
                            </div>
                        ):(
                            <div className="w-[100%] px-4 py-5 flex flex-col space-y-4 justify-center items-center">
                                <p className="text-yellow-300 font-medium text-3xl">ADMIN</p>
                                <p className="text-sm text-yellow-300"><span><MailIcon style={{ height: '18px', width: '18px' }}  className="text-yellow-300  mr-2" /></span>{auth.user.email}</p>
                                <div className="flex flex-wrap justify-center gap-4 items-center pt-5">
                                    <a className="text-gray-800 text-xs bg-blue-400 rounded-lg px-2 py-1" href="/addSalary">Add Salary</a>
                                    <a className="text-gray-800 text-xs bg-blue-400 rounded-lg px-2 py-1" href="/changeLeaveTypes">Manage Leave Types</a>
                                    <a className="text-gray-800 text-xs bg-blue-400 rounded-lg px-2 py-1" href="/leaveRequests">Leave Requests</a>
                                    <Dialog>
                                        <DialogTrigger>
                                            <a className="text-gray-800 text-xs bg-blue-400 rounded-lg px-2 py-1">Update Employee Info</a>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader className="flex flex-col mb-5">
                                                <p className="text-xl font-medium text-gray-900">Confirm Employee ID</p>
                                                <p className="text-xs text-gray-500">Please enter the valid Employee ID of the employee to update.</p>
                                            </DialogHeader>
                                            <UpdateEmpConfirm/>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    !auth.user.isAdmin && (
                        <div className="w-[40%] min-h-[225px] flex flex-col justify-around">
                            <div className="w-full rounded-xl flex justify-between items-center border-2 pl-5 pr-5">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_xc2Yqo6b6QoGAQMKUIkg8t9fULBI7I76JA&usqp=CAU" className="h-[100px] w-[100px]" />
                                <div className="flex flex-col space-y-4 text-right">
                                    <p>Last Salary Processed</p>
                                    <p className="text-xl font-medium">{auth.user.last_processed}</p>
                                </div>
                            </div>
                            <div className="w-full rounded-xl flex justify-between items-center border-2 pl-5 pr-5">
                                <img src="https://thelivenagpur.com/wp-content/uploads/2024/02/tax4.jpg" className="h-[100px] w-[100px]" />
                                <div className="flex flex-col space-y-4 text-right">
                                    <p>YTD Tax</p>
                                    <p className="text-xl font-medium">{auth.user.ytd_tax} INR</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {!auth.user.isAdmin && (
                <div className="flex flex-row flex-wrap justify-around items-center">
                    <div className="w-[35%] min-h-[225px] rounded-xl p-5 flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <p className="w-full text-gray-700 font-medium">ATTENDANCE STATS</p>
                            <p className="w-full text-gray-700 text-xs">The data below show the latest punch details and the current punch status.</p>
                        </div>
                        
                        <table className="w-full border-2">
                            <tr>
                                <td className="border-2 p-1">Last Punch Date</td>
                                <td className="border-2 p-1">Last Punch status</td>
                                <td className="border-2 p-1">Punch status</td>
                            </tr>
                            <tr>
                                <td className="border-2 p-1 text-gray-800 font-medium">{auth.user.lastPunchedDate}</td>
                                <td className="border-2 p-1 text-gray-800 font-medium">{auth.user.lastPunchedStatus}</td>
                                <td className="border-2 p-1 text-gray-800 font-medium">{auth.user.punchStatus}</td>
                            </tr>
                        </table>
                        
                        <table className="w-full border-2">
                            <tr>
                                <td className="border-2 p-1">Holiday's this Year</td>
                                <td className="border-2 p-1 text-gray-800 font-medium">20</td>
                            </tr>
                            <tr>
                                <td className="border-2 p-1">Total leaves</td> 
                                <td className="border-2 p-1 text-gray-800 font-medium">{auth.user.total_leaves}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="w-[40%] min-h-[225px] flex flex-col justify-around pl-5">
                        <div className="flex flex-col space-y-1">
                            <p className="w-full text-gray-700 font-medium">LEAVES STATUS</p>
                            <p className="w-full text-gray-700 text-xs">The percentage below for leaves is calculated based on CL, SL, PL, and COFF leaves only.</p>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="w-[10%] text-left">CL:</div>
                            <Progress value={auth.user.cl} className="w-[70%]" />
                            <div className="w-[20%] text-left pl-8">{auth.user.cl}%</div>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="w-[10%] text-left">SL:</div>
                            <Progress value={auth.user.sl} className="w-[70%]" />
                            <div className="w-[20%] text-left pl-8">{auth.user.sl}%</div>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="w-[10%] text-left">PL:</div>
                            <Progress value={auth.user.pl} className="w-[70%]" />
                            <div className="w-[20%] text-left pl-8">{auth.user.pl}%</div>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="w-[10%] text-left">COFF:</div>
                            <Progress value={auth.user.coff} className="w-[70%]" />
                            <div className="w-[20%] text-left pl-8">{auth.user.coff}%</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )

}

export default Home;