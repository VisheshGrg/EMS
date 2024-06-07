import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    return(

        <div className="flex flex-wrap">
            <div className="bg-sky-950 w-[50%] h-[100vh] flex flex-col justify-center">
                <p className="text-6xl subpixel-antialiased font-medium ml-1 mb-5 text-gray-400">Employee Management System</p>
                <p className="text-lg ml-1 text-gray-500">We manage your Attendance, Salary, Leaves, Info and more</p>
            </div>
            <div className="w-[50%] h-[100vh] flex flex-col justify-center items-center">

                <Button variant="secondary" onClick={() => navigate("/login")} className="bg-sky-950 w-[25%] py-6 text-gray-200 hover:bg-sky-900 text-md">Login</Button>
                <p className="m-2 text-lg">- or -</p>
                <Button variant="secondary" onClick={() => navigate("/register")} className="bg-sky-950 w-[25%] py-6 text-gray-200 hover:bg-sky-900 text-md">Signup</Button>

            </div>
        </div>

    )
}

export default Main;