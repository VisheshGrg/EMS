import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Personal from "./Personal";
import Education from "./Education";
import Documents from "./Documents";
import Files from "./Files";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MailIcon from '@mui/icons-material/Mail';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "@/Redux/Info/Action";
import Loader from "../Loader/Loader";

const Profile = () => {

    const [selectedTab,setSelectedTab] = useState("personal");
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {auth,info} = useSelector(store=>store);

    useEffect(() => {
        if (auth.user) {
            dispatch(getInfo(auth.user, navigate)).then(()=>setLoading(false));
        } 
    }, [auth.user, dispatch, navigate]);

    const renderContent = () => {
        switch(selectedTab){
            case 'personal':
                return <Personal/>;
            case 'education':
                return <Education/>;
            case 'documents':
                return <Documents/>;
            case 'files':
                return <Files/>;
            default:
                return null;
        }
    };

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-5">
            <h1 className="text-3xl font-medium text-gray-800 border-b-4 mb-2">Profile</h1>
            <div className="w-full pl-5 pt-2 space-y-1">
                <div className="w-full flex justify-center items-center">
                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger className="w-[10rem]" onClick={() => setSelectedTab('personal')} value="personal">Personal</TabsTrigger>
                            <TabsTrigger className="w-[10rem]" onClick={() => setSelectedTab('education')} value="education">Education</TabsTrigger>
                            <TabsTrigger className="w-[10rem]" onClick={() => setSelectedTab('documents')} value="documents">Documents</TabsTrigger>
                            <TabsTrigger className="w-[10rem]" onClick={() => setSelectedTab('files')} value="files">Files</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <div className="w-full p-10 flex flex-row flex-wrap">
                <div className="w-[35%] p-5 flex justify-center items-start">
                    <div className="flex flex-col items-center justify-center w-[70%] py-8 px-1 rounded-xl shadow-xl bg-gray-50">
                        <Avatar className="w-[40%] h-[40%] mb-5 shadow-lg">
                            <AvatarImage src={info.userInfo.photo} />
                            <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="mb-4 flex flex-col text-center text-gray-800">
                            <p className="text-3xl mb-2 font-medium text-gray-600">{info.userInfo.name}</p>
                            <p className="text-sm">( {info.userInfo.uid} )</p>
                            <p>{auth.user.department=="" ? (<span className="text-red-500">*Department not alloted*</span>):auth.user.department}</p>
                            <p><span><MailIcon style={{ height: '18px', width: '18px' }}  className="text-blue-500  mr-2" /></span>{info.userInfo.email}</p>
                        </div>
                        {
                            auth.user.is_infoSet ? (<Button variant="secondary" onClick={() => navigate("/updateInfo")} className="font-normal btn-hover bg-blue-500 text-sm text-gray-950">Update Info</Button>) : (<Button variant="secondary" onClick={() => navigate("/addInfo")} className="font-normal btn-hover bg-blue-500 text-sm text-gray-950">Add Info</Button>)
                        }
                    </div>
                </div>
                <div className="w-[65%] p-5">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Profile;