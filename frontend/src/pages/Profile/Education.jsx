import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Education = () => {

    const dispatch = useDispatch();

    const {auth,info} = useSelector(store=>store);

    return(
        <div className="flex flex-col space-y-5 items-center">
            <p className="text-lg w-[90%] text-left pl-2 text-gray-700 font-medium">Education Details </p>
            {
                info.userEducation && info.userEducation.map((education,index) => (
                    <div key={index} className="flex flex-col space-y-3 border-2 w-[90%] p-6 rounded-xl shadow-md bg-gray-50">
                        <p className="font-medium bg-slate-300 rounded-lg pl-2 mb-2">Education {education[0]}</p>
                        <table>
                            <tr>
                                <td className="w-[50%] pb-3"><span className="text-sm">Name of School/College</span><br/><span className="text-gray-500 text-sm">{education[1]}</span></td>
                                <td  className="w-[25%] pb-3"><span className="text-sm">Degree</span><br/><span className="text-gray-500 text-sm">{education[4]}</span></td>
                                <td className="w-[25%] pb-3"><span className="text-sm">CGPA</span><br/><span className="text-gray-500 text-sm">{education[3]}</span></td>
                            </tr>
                            <tr>
                                <td className="w-[50%]"><span className="text-sm">Location</span><br/><span className="text-gray-500 text-sm">{education[2]}</span></td>
                                <td className="w-[25%]"><span className="text-sm">Start</span><br/><span className="text-gray-500 text-sm">{education[5]}</span></td>
                                <td className="w-[25%]"><span className="text-sm">End</span><br/><span className="text-gray-500 text-sm">{education[6]}</span></td>
                            </tr>
                        </table>
                    </div>
                ))
            }
        </div>
    )
}

export default Education;