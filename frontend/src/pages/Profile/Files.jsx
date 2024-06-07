import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UploadDocumentForm from "../User/UploadDocuments";

const Files = () => {

    const {auth,info} = useSelector(store=>store);
    const [isDialogOpen,setDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    return(
        <div className="p-5">

            <div className="w-full flex flex-row items-center justify-between">
                <p className="text-lg text-gray-700 font-medium w-full text-left">Uploaded Files</p>
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="font-medium btn-hover text-xs bg-blue-400" onClick={() => setDialogOpen(true)}>+ Add File</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className="flex flex-col mb-5">
                            <p className="text-xl font-medium text-gray-900">Upload Files</p>
                            <p className="text-xs text-gray-500">Please upload files relevant to office tasks and responsibilities. Ensure that the size of each file is less than <span className="text-red-500"> 5 megabytes (MB) </span>.</p>
                        </DialogHeader>
                        <UploadDocumentForm onClose={handleDialogClose} target={"PROFILE"}/>
                    </DialogContent>
                </Dialog>
            </div>
            
            <ScrollArea className="h-[450px] w-ful px-2">
                <div className="w-full flex flex-wrap justify-start items-start gap-10">
                    {
                        info.userFiles.map((file,index) => (
                            index%2==0 && (
                                <div key={index} className="w-[20%] flex flex-row justify-center items-center">
                                    <a href={info.userFiles[index+1]} target="_blank" className="flex w-full flex-col justify-center items-center">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX/////2mr/2mn/uQD/2WX/2Wb/2Wj/2mj/2Wf/2Wn/2WP/12D/12L/22Hsqj/YdQDfklD/1lr/4In/6aX/44//24P/xEv/tQD/3YH/zmD/+Of/7bf/45HWbwD++vP/7Mf/1HX/3Zf/xkX/vyX/vAj/6bn/zFf/5Zn/8tP/1FH/3Hb/02b/xTT/333kmUDnpVm+GJzNAAADFUlEQVR4nO3dX1faQBCHYYGEhmz6J4Q2FdFqRSm06vf/dk08XPS0dudiZ2eys7/nxsNdXmcTBZP14gIAAAAAAAAAAAAAAAAAAAAAAMC0b7dfwl3e/dDu+J/t975fhOv7/v7uRjvmLdsFR9+5cv+gnfOGPV/g2Hir3fOPB9bAIfFSu+hvj8yF00vcMwdOL5E9cHKJEQonlhijcFqJUQonlRincEqJkQonlBircNE/aqedRStc9Ierq24d2Y5+QxOv8GvXbdrojqetVuEY6AS0RyIxZmArUejaVqVwCNzJBDp39L8pjRYoskRftTP5QtHAIVG8UDjQOelC8UDpQvlA4cLxKupcLUi0sL/fCf6YkJ9hv//ZjUu0kUUU9lwW+1+nwxD45Grhwrr2Fn7msh7zut1MeoJkYcfosDm5uhBXN97CDZf106wQvYT+wVvId0Grx/WiofHPUOegmHkL5U+bCIgZah9eMGKG6QcOicQqLVNHrNIi/SHWROEww2L4Npy/lAm+xAwtIFdp4ojCsnyXurLEDFNHzLAsq9QRhZWBwspfWGkvsmCVvzCDVVotU0fM0H6h9knEwl+4nKduSRRa4C1cGpjhkpih9gEGI2aYw7VUewTByPNwlTriPLRfqH14LDI/D+0Xzuez1M3nKEwdClfaBxhslfsM7f9OY3+G2gNgkfkMZwYK/ffq2y+0v0pRmADqSmOBv9DADHGl0T7AYNkXah8ei8xnqP1RIIvcZ2jgE+HsC+2vUvOfJmp/xMIi81WqfSsMC6JQ+1IYLPtC++fhysDfLXK/U8H+357s35to/849FCYg+zvZ7T8zUxTaBxiMfDpP+6GeYOQTltojCJb9DEsDT8niOWDtRRYs+2e5cyhMHrEvRgZ7DKFw+shCA7yFTaM9gmDZ70hnf4ZKex2yyn2V1q87xtbN+UuT4Mvsf1rU0rv+8st+hrKbi0dB7Hbt5Pdu5kYWao8gGFloAArTh8L0eQvfW+At/GCBt/D5+mPqrp+9hTcvn1L3Msn/lQ0AAAAAAAAAAAAAAAAAAAAAAMDjN6iKcUZLLheqAAAAAElFTkSuQmCC" className="w-[80%] h-[80%]"></img>
                                        <p title={file} className="text-xs text-gray-800 text-center">{file.length > 20 ? file.slice(0,20)+"..." :file}</p>
                                    </a>
                                </div>
                            )
                        ))
                    }

                </div>
            </ScrollArea>


        </div>
    )
}

export default Files;