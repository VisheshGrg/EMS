import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Personal = () => {

    const dispatch = useDispatch();
    const {auth,info} = useSelector(store=>store);

    return(
        <div className="flex flex-col space-y-5 items-center">
            <p className="text-lg w-[90%] text-left pl-2 text-gray-700 font-medium">Personal Information </p>
            <div className="flex flex-col space-y-3 border-2 w-[90%] p-6 rounded-xl shadow-md bg-gray-50">
                <p className="font-medium bg-slate-300 rounded-lg pl-2 mb-2">Personal Info</p>
                <table>
                    <tr>
                        <td className="w-[33%] pb-3"><span className="text-sm">Full Name</span><br/><span className="text-gray-500 text-sm">{info.userInfo.name}</span></td>
                        <td  className="w-[33%] pb-3"><span className="text-sm">Age</span><br/><span className="text-gray-500 text-sm">{info.userInfo.age}</span></td>
                        <td className="w-[34%] pb-3"><span className="text-sm">Department</span><br/><span className="text-gray-500 text-sm">{info.userInfo.department=="" ? (<span className="text-red-500">*Department not alloted*</span>):info.userInfo.department}</span></td>
                    </tr>
                    <tr>
                        <td className="w-[33%]"><span className="text-sm">UId</span><br/><span className="text-gray-500 text-sm">{info.userInfo.uid}</span></td>
                        <td className="w-[33%]"><span className="text-sm">Blood Group</span><br/><span className="text-gray-500 text-sm">{info.userInfo.blood_group}</span></td>
                        <td className="w-[34%]"></td>
                    </tr>
                </table>
            </div>
            <div className="flex flex-col space-y-3 border-2 w-[90%] p-6 rounded-xl shadow-md bg-gray-50">
                <p className="font-medium bg-slate-300 rounded-lg pl-2">Contact Info</p>
                <table className="">
                    <tr>
                        <td className="w-[50%] pb-3"><span className="text-sm">Official Email ID</span><br/><span className="text-gray-500 text-sm">{info.userInfo.email}</span></td>
                        <td  className="w-[50%] pb-3"><span className="text-sm">Personal Email ID</span><br/><span className="text-gray-500 text-sm">{info.userInfo.pers_email}</span></td>
                    </tr>
                    <tr>
                        <td className="w-[50%] pb-3"><span className="text-sm">Phone Number</span><br/><span className="text-gray-500 text-sm">{info.userInfo.phoneNo}</span></td>
                        <td className="w-[50%] pb-3"><span className="text-sm">Alternate Phone Number</span><br/><span className="text-gray-500 text-sm">{info.userInfo.alt_phoneNo}</span></td>
                    </tr>
                </table>
            </div>
            <div className="flex flex-col space-y-3 border-2 w-[90%] p-6 rounded-xl shadow-md bg-gray-50">
                <p className="font-medium bg-slate-300 rounded-lg pl-2">Address Info</p>
                <table className="">
                    <tr>
                        <td className="w-[50%]"><span className="text-sm">Current Address</span><br/><span className="text-gray-600 text-sm">{info.userInfo.address}</span></td>
                        <td  className="w-[50%]"><span className="text-sm">Permanent Address</span><br/><span className="text-gray-600 text-sm">{info.userInfo.perm_address}</span></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Personal;