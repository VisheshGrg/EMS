import { getSalaryDetails } from "@/Redux/Salary/Action";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const SalaryDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);
    const {auth,salary} = useSelector(store=>store);

    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [filteredEarnings,setFilteredEarnings] = useState([]);
    const [filteredTaxes,setFilteredTaxes] = useState([]);

    useEffect(()=>{

        if(auth.user){
            dispatch(getSalaryDetails(auth.user,navigate)).then(()=>setLoading(false));
        }
    },[auth.user,dispatch,navigate]);

    useEffect(() => {
        setFilteredEarnings(salary.earningsList || []);
        setFilteredTaxes(salary.taxList || []);
    }, [salary]);

    const handleSubmit = (event) => {
        event.preventDefault();
        filterLists(month,year);
    }

    const filterLists = (month, year) => {
        if (salary.earningsList && salary.taxList) {
            const filteredEarnings = salary.earningsList.filter(item => {
                if (!month || !year) return true;
                const date = new Date(item.date);
                return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
            });

            const filteredTaxes = salary.taxList.filter(item => {
                if (!month || !year) return true;
                const date = new Date(item.date);
                return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
            });

            setFilteredEarnings(filteredEarnings);
            setFilteredTaxes(filteredTaxes);
        }
    };

    const getMonthName = (monthNumber) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthNumber - 1] || "";
    };

    if(loading){
        return <Loader/>
    }

    return(
        <div className="p-5 flex flex-col items-center justify-start">

            <h1 className="text-2xl text-gray-800 font-medium border-b-4 w-full text-left">Salary Details</h1>

            <div className="p-10 flex flex-col justify-start items-center w-full space-y-5">
                <form onSubmit={handleSubmit} className="w-[60%] flex justify-around items-center">

                    <span className="font-medium text-gray-700">Month</span>
                    <Select onValueChange={(value) => setMonth(value)}>
                        <SelectTrigger className="w-[15rem]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">January</SelectItem>
                                <SelectItem value="2">February</SelectItem>
                                <SelectItem value="3">March</SelectItem>
                                <SelectItem value="4">April</SelectItem>
                                <SelectItem value="5">May</SelectItem>
                                <SelectItem value="6">June</SelectItem>
                                <SelectItem value="7">July</SelectItem>
                                <SelectItem value="8">August</SelectItem>
                                <SelectItem value="9">September</SelectItem>
                                <SelectItem value="10">October</SelectItem>
                                <SelectItem value="11">November</SelectItem>
                                <SelectItem value="12">December</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select> 

                    <span className="font-medium text-gray-700">Year</span>
                    <Select onValueChange={(value) => setYear(value)}>
                        <SelectTrigger className="w-[15rem]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2020">2020</SelectItem>
                                <SelectItem value="2019">2019</SelectItem>
                                <SelectItem value="2018">2018</SelectItem>
                                <SelectItem value="2016">2016</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button type="submit" className="h-[2.1rem] bg-blue-600">Go</Button>

                </form>
                <p className="text-xs text-red-500">Note: Refersh the page to see complete salary data till date</p>
            </div>

            <div className="w-[70%] flex flex-col items-center justify-start mt-6">

                <p className="">Payroll Breakup for the Month of <span className="text-blue-700">{`${!month ? "All":getMonthName(month)}-${!year ? "All":year}`}</span></p>

                <div className="flex justify-between items-center w-full p-5">

                    <ScrollArea className="w-[48%] h-[25rem]">
                        <table className="border-2 w-full">
                            <thead>
                                <tr>
                                    <td colSpan="4" className="border-2 text-left px-2 bg-gray-300 font-medium text-gray-800">Earnings</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEarnings.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-2 px-2">{item.type}</td>
                                        <td className="border-2 px-2 text-right">{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ScrollArea>
                    <ScrollArea className="w-[48%] h-[25rem]">
                        <table className="border-2 w-full">
                            <thead>
                                <tr>
                                    <td colSpan="4" className="border-2 text-left px-2 bg-gray-300 font-medium text-gray-800">Deductions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTaxes.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-2 px-2">{item.type}</td>
                                        <td className="border-2 px-2 text-right">{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ScrollArea>

                </div>


            </div>
            
        </div>
    )
}

export default SalaryDetails;