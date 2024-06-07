import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import UploadDocumentForm from "../User/UploadDocuments";
import UpdateEmpConfirm from "../Admin/UpdateEmpConfirm";
import { logout } from "@/Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="border-b py-2 px-5 flex items-center justify-between bg-sky-950 sticky top-0 z-10">
      <div className="flex items-center gap-3 text-white">
        <p
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl text-gray-300"
        >
          EMS
        </p>

        {auth.user.name != "admin" ? (
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/salaryDetails")}
              className="font-normal btn-hover"
            >
              Salary Details
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/markLeave")}
              className="font-normal btn-hover"
            >
              Mark Leave
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/leaveStatus")}
              className="font-normal btn-hover"
            >
              Leave Status
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="font-normal btn-hover"
                  onClick={() => setDialogOpen(true)}
                >
                  Upload Files
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="flex flex-col mb-5">
                  <p className="text-xl font-medium text-gray-900">
                    Upload Files
                  </p>
                  <p className="text-xs text-gray-500">
                    Please upload files relevant to office tasks and
                    responsibilities. Ensure that the size of each file is less
                    than{" "}
                    <span className="text-red-500"> 5 megabytes (MB) </span>.
                  </p>
                </DialogHeader>
                <UploadDocumentForm
                  onClose={handleDialogClose}
                  target={"HOME"}
                />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/addSalary")}
              className="font-normal btn-hover"
            >
              Add Salary
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/changeLeaveTypes")}
              className="font-normal btn-hover"
            >
              Manage Leave Types
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/leaveRequests")}
              className="font-normal btn-hover"
            >
              Leave Requests
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Button variant="ghost" className="font-normal btn-hover">
                  Update Employee Info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="flex flex-col mb-5">
                  <p className="text-xl font-medium text-gray-900">
                    Confirm Employee ID
                  </p>
                  <p className="text-xs text-gray-500">
                    Please enter the valid Employee ID of the employee to
                    update.
                  </p>
                </DialogHeader>
                <UpdateEmpConfirm onClose={handleDialogClose} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" size="icon" className="rounded-full">
              {!auth.user.isAdmin ? (
                <Avatar className="w-[100%] h-[100%]">
                  <AvatarImage src={auth.user.photo} />
                  <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <PersonIcon />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            {!auth.user.isAdmin && (
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
