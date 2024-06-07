import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './pages/Navbar/Navbar'
import Main from './pages/Main/main'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import VerifyEmail from './pages/Auth/VerifyEmail'
import VerifyOTP from './pages/Auth/VerifyOTP'
import LoginOTPEmail from './pages/Auth/LoginOTPEmail'
import ResetPassword from './pages/Auth/ResetPassword'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import AddInfo from './pages/User/AddInfo'
import UpdateInfo from './pages/User/UpdateInfo'
import UserLeaveStatus from './pages/Leaves/UserLeaveStatus'
import MarkLeave from './pages/Leaves/MarkLeave'
import SalaryDetails from './pages/Salary/SalaryDetails'
import AddSalary from './pages/Admin/AddSalary'
import ChangeLeaveTypes from './pages/Admin/ChangeLeaveTypes'
import LeaveRequests from './pages/Admin/LeaveRequests'
import UpdateEmpInfo from './pages/Admin/UpdateEmpInfo'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './pages/Loader/Loader'
import { getUser } from './Redux/Auth/Action'

function App() {
  const [count, setCount] = useState(0);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);

  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt");
    if(storedJwt){
      const parsedJwt = JSON.parse(storedJwt);
      dispatch(getUser(parsedJwt)).then(()=>setLoading(false));
    } 
    else{
      setLoading(false);
    }
  },[auth.jwt]);

  if(loading){
    return <Loader/>
  }

  return (
    <>
        {auth.user && <Navbar/>}
        <Routes>

          <Route path="/main" element={!auth.user ? <Main/>:<Navigate to="/" />} />
          <Route path="/login" element={!auth.user ? <Login/>:<Navigate to="/" />} />
          <Route path="/register" element={!auth.user ? <Register/>:<Navigate to="/" />} />
          <Route path="/verifyEmail" element={!auth.user ? <VerifyEmail/>:<Navigate to="/" />} />
          <Route path="/verifyOTP" element={!auth.user ? <VerifyOTP/>:<Navigate to="/" />} />
          <Route path="/loginOTPEmail" element={!auth.user ? <LoginOTPEmail/>:<Navigate to="/" />} />
          <Route path="/resetPassword" element={!auth.user ? <ResetPassword/>:<Navigate to="/" />}/>

          <Route path="/" element={auth.user ? <Home/>:<Navigate to="/main" />}></Route>
          <Route path="/profile" element={auth.user ? (auth.user.isAdmin ? <Navigate to="/" /> : <Profile/>) : <Navigate to="/main" />}/>
          <Route path="/addInfo" element={auth.user ? (auth.user.isAdmin ? <Navigate to="/" /> : <AddInfo/>) : <Navigate to="/main" />} />
          <Route path="/updateInfo" element={auth.user ? (auth.user.isAdmin ? <Navigate to="/" /> : <UpdateInfo/>) : <Navigate to="/main" />} />
          <Route path="/leaveStatus" element={auth.user ? (auth.user.isAdmin ? <Navigate to="/" /> : <UserLeaveStatus/>) : <Navigate to="/main" />} />
          <Route path="/markLeave" element={auth.user ? (auth.user.isAdmin ? <Navigate to="/" /> : <MarkLeave/>) : <Navigate to="/main" />} />
          <Route path="/salaryDetails" element={auth.user ? (auth.user.isAdmin ? <Navigate to="/" /> : <SalaryDetails/>) : <Navigate to="/main" />} />

          <Route path="/addSalary" element={auth.user ? (!auth.user.isAdmin ? <Navigate to="/" /> : <AddSalary/>) : <Navigate to="/main" />} />
          <Route path="/changeLeaveTypes" element={auth.user ? (!auth.user.isAdmin ? <Navigate to="/" /> : <ChangeLeaveTypes/>) : <Navigate to="/main" />} />
          <Route path="/leaveRequests" element={auth.user ? (!auth.user.isAdmin ? <Navigate to="/" /> : <LeaveRequests/>) : <Navigate to="/main" />} />
          <Route path="/updateEmployeeInfo" element={auth.user ? (!auth.user.isAdmin ? <Navigate to="/" /> : <UpdateEmpInfo/>) : <Navigate to="/main" />} />
        </Routes>
    </>
  )
}

export default App;
