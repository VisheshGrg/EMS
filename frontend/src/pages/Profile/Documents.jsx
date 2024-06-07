import { useSelect } from "@mui/base";
import React from "react";
import { useSelector } from "react-redux";

const Documents = () => {

    const {auth,info} = useSelector(store=>store);

    return(
        <div className="py-2 px-5 flex flex-col items-center justify-start">
            <div className="w-full flex flex-col items-start justify-start space-y-1">
                <p className="text-lg text-gray-700 font-medium w-full text-left">Employee Documents</p>
                <p className="text-xs text-red-500">Note: All the documents must be uploaded and should be latest and verified.</p>
            </div>
            <div className="py-5 flex flex-row flex-wrap justify-start items-start w-full">
                
                {
                    info.userDocuments.length>0 && info.userDocuments[0]!=null && (
                        <div className="flex flex-col justify-center items-center w-[40%] pb-5">
                            <a href={info.userDocuments[0]} target="_blank" className="file"><img className="w-[200px] h-[200px]" src="https://res.cloudinary.com/dxcrwlhv0/image/upload/v1710741299/samples/computer-icons-portable-network-graphics-directory-file-explorer-clip-art-folder-transparent-background-removebg-preview_qinvy8.png"></img></a>
                            <div className="text-gray-700 text-sm">PAN Card (Click to Open)</div>
                        </div>
                    )
                }
                {
                    info.userDocuments.length>1 && info.userDocuments[1]!=null && (
                        <div className="flex flex-col justify-center items-center w-[40%] pb-5">
                            <a href={info.userDocuments[1]} target="_blank" className="file"><img className="w-[200px] h-[200px]" src="https://res.cloudinary.com/dxcrwlhv0/image/upload/v1710741299/samples/computer-icons-portable-network-graphics-directory-file-explorer-clip-art-folder-transparent-background-removebg-preview_qinvy8.png"></img></a>
                            <div className="text-gray-700 text-sm">Photo (Click to Open)</div>
                        </div>
                    )
                }
                {
                    info.userDocuments.length>2 && info.userDocuments[2]!=null && (
                        <div className="flex flex-col justify-center items-center w-[40%]">
                            <a href={info.userDocuments[2]} target="_blank" className="file"><img className="w-[200px] h-[200px]" src="https://res.cloudinary.com/dxcrwlhv0/image/upload/v1710741299/samples/computer-icons-portable-network-graphics-directory-file-explorer-clip-art-folder-transparent-background-removebg-preview_qinvy8.png"></img></a>
                            <div className="text-gray-700 text-sm">12th Marksheet (Click to Open)</div>
                        </div>
                    )
                }
                {
                    info.userDocuments.length>3 && info.userDocuments[3]!=null && (
                        <div className="flex flex-col justify-center items-center w-[40%]">
                            <a href={info.userDocuments[3]} target="_blank" className="file"><img className="w-[200px] h-[200px]" src="https://res.cloudinary.com/dxcrwlhv0/image/upload/v1710741299/samples/computer-icons-portable-network-graphics-directory-file-explorer-clip-art-folder-transparent-background-removebg-preview_qinvy8.png"></img></a>
                            <div className="text-gray-700 text-sm">10th Marksheet (Click to Open)</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Documents;