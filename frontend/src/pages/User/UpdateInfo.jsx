import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, updateSelfInfo } from "@/Redux/Info/Action";
import Loader from "../Loader/Loader";


const AddInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);

    const {auth,info} = useSelector(store=>store);

    useEffect(() => {
        if (auth.user) {
            dispatch(getInfo(auth.user, navigate)).then(()=>setLoading(false));
        } 
    }, [auth.user, dispatch, navigate]);

    const [personalDetails,setPersonalDetails] = useState({
        age: '',
        bg: '',
        phone: '',
        alt_phone: '',
        pers_email: '',
        curr_address: '',
        perm_address: '',
        photo: null
    });

    const [educations,setEducations] = useState([
        ['','','','','','','']
    ]);

    const [documents,setDocuments] = useState({
        pan: null,
        emp_photo: null,
        marksheet_12: null,
        marksheet_10: null
    });

    useEffect(() => {
        if(info.userInfo){
            const {
                age, blood_group, phoneNo, alt_phoneNo, pers_email, address, perm_address, photo
            } = info.userInfo;

            setPersonalDetails({
                age: age || '',
                bg: blood_group || '',
                phone: phoneNo || '',
                alt_phone: alt_phoneNo || '',
                pers_email: pers_email || '',
                curr_address: address || '',
                perm_address: perm_address || '',
                photo: '',
            });
        }
        if (info.userEducation) {
            setEducations(info.userEducation.map(edu => [...edu]));
        }
    }, [info]);

    const handlePersonalDetailsChange = (event) => {
        const {name,value, files} = event.target;
        setPersonalDetails(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleEducationChange = (index, subIndex, event) => {
        const { value } = event.target;
        setEducations(prevState => prevState.map((education, i) => (
            i === index ? education.map((field, j) => (j === subIndex ? value : field)) : education
        )));
    };

    const handleDocumentChange = (event) => {
        const { name, files } = event.target;
        setDocuments(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
    };

    const handleAddEducation = (event) => {
        event.preventDefault();
        setEducations(prevState => [
            ...prevState,
            ['', '', '', '', '', '','']
        ]);
    };

    const handleRemoveEducation = (index) => {
        setEducations(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData();
        for (const key in personalDetails) {
            formData.append(key, personalDetails[key]);
        }
        educations.forEach((education, index) => {
            education.forEach((field, subIndex) => {
                formData.append(`education[${index}][${subIndex}]`, field);
            });
        });
        for (const key in documents) {
            formData.append(key, documents[key]);
        }
        
        dispatch(updateSelfInfo(formData,auth.user,navigate)).then(()=>setLoading(false));
    };

    if(loading){
        return <Loader/>;
    }

    return (
        <div className="p-10 flex flex-col justify-start items-center">
            <h1 className="text-3xl font-medium text-gray-700 mb-6 border-b-4 w-full">Update Info</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-[60%] ">
                
                <div className="p-4 flex flex-col justify-center items-center">
                    
                    <p className="bg-gray-300 p-1 rounded-lg w-full text-left pl-2 font-medium">Personal Details</p>
                
                    <div className="pt-10 pb-10 w-[80%] flex flex-col items-center justify-center space-y-4">

                        <p className="text-xs text-red-600 w-full text-left mb-2">Please ensure that all entered information is accurate and complete.</p>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="age">Age: </label>
                            <Input type="number" id="age" name="age" value={personalDetails.age} onChange={handlePersonalDetailsChange} className="w-[70%]"></Input>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="bg">Blood Group: </label>
                            <Input type="text" id="bg" name="bg" value={personalDetails.bg} onChange={handlePersonalDetailsChange} className="w-[70%]"></Input>
                        </div>
                        

                        <div className="flex justify-between items-center w-full">
                            <label for="phone">Phone no: </label>
                            <Input type="text" id="phone" name="phone" value={personalDetails.phone} onChange={handlePersonalDetailsChange} className="w-[70%]"></Input>
                        </div>
                        
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="alt_phone">Alternate Phone no: </label>
                            <Input type="text" id="alt_phone" name="alt_phone" value={personalDetails.alt_phone} onChange={handlePersonalDetailsChange} className="w-[70%]"></Input>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="pers_email">Personal Email id: </label>
                            <Input type="text" id="pers_email" name="pers_email" value={personalDetails.pers_email} onChange={handlePersonalDetailsChange} className="w-[70%]"></Input>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="curr_address">Current Address: </label>
                            <Textarea id="curr_address" name="curr_address" value={personalDetails.curr_address} onChange={handlePersonalDetailsChange} className="w-[70%]"></Textarea>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="perm_address">Permanent Address: </label>
                            <Textarea id="perm_address" name="perm_address" value={personalDetails.perm_address} onChange={handlePersonalDetailsChange} className="w-[70%]"></Textarea>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="photo">Upload photo: <br/> <span className="text-xs text-red-600">Upload latest photo only</span> </label>
                            <Input type="file" id="photo" name="photo" onChange={handlePersonalDetailsChange} className="w-[40%]"></Input>
                        </div>
                        
                        
                    </div>
                    
                    <p className="bg-gray-300 p-1 rounded-lg w-full text-left pl-2 font-medium">Education Details</p>
                    
                    <div className="pt-10 pb-10 w-[80%] flex flex-col items-center justify-center space-y-6">
                        
                        <p className="text-xs text-red-600 w-full text-left mb-2">Please enter your education details starting from the most recent to the oldest.</p>
                        
                        {educations.map((education,index) => (
                            <div key={index} className="education-entry w-full space-y-2 flex flex-col justify-center items-center">
                                <h4 className="w-full text-left font-medium">Education {index+1}</h4>
                                <div className="flex justify-between items-center w-full">
                                    <label>School/College Name:</label>
                                    <Input type="text" name="school" value={education[1]} className="w-[70%]" onChange={(e) => handleEducationChange(index,1, e)} required></Input>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <label>Location:</label>
                                    <Input type="text" name="location" value={education[2]} className="w-[70%]" onChange={(e) => handleEducationChange(index,2, e)} required ></Input>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <label>Grade:</label>
                                    <Input type="text" name="grade" value={education[3]} className="w-[70%]" onChange={(e) => handleEducationChange(index,3, e)} required ></Input>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <label>Degree:</label>
                                    <Input type="text" name="degree" value={education[4]} className="w-[70%]" onChange={(e) => handleEducationChange(index,4, e)} required ></Input>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <label>From Date:</label>
                                    <Input type="date" name="from_date" value={education[5]} className="w-[30%]" onChange={(e) => handleEducationChange(index,5, e)} required ></Input>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <label>To Date:</label>
                                    <Input type="date" name="to_date" value={education[6]} className="w-[30%]" onChange={(e) => handleEducationChange(index,6, e)} required ></Input>
                                </div>
                                <div className="w-full text-left">
                                    <button type="button" className="w-[130px] h-[30px] bg-red-500 rounded-md text-sm text-white font-medium" onClick={() => handleRemoveEducation(index)}>Remove</button>
                                </div>
                                <hr />
                            </div>
                        ))}
                        <button id="addEducation" className="bg-blue-500 w-[130px] h-[30px] text-white rounded-md font-medium text-sm" onClick={handleAddEducation}>Add Education</button>
                    </div>
                    
                    <p className="bg-gray-300 p-1 rounded-lg w-full text-left pl-2 font-medium">Employee Documents</p>
                    
                    <div className="pt-10 pb-10 w-[80%] flex flex-col items-center justify-center space-y-4">

                        <p className="text-xs text-red-600 w-full text-left mb-2">Please upload scanned copies of the documents. File size of each document must be less than 2 MB.</p>
                    
                        <div className="flex justify-between items-center w-full">
                            <label for="pan">Upload PAN Card: </label>
                            <Input type="file" id="pan" name="pan" onChange={handleDocumentChange} className="w-[40%]"></Input>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="emp_photo">Upload Photo: </label>
                            <Input type="file" id="emp_photo" name="emp_photo" onChange={handleDocumentChange} className="w-[40%]"></Input>
                        </div>
                                     
                        <div className="flex justify-between items-center w-full">
                            <label for="marksheet_12">Upload 12th Marksheet: </label>
                            <Input type="file" id="marksheet_12" name="marksheet_12" onChange={handleDocumentChange} className="w-[40%]"></Input>
                        </div>
                        
                        <div className="flex justify-between items-center w-full">
                            <label for="marksheet_10">Upload 10th Marksheet: </label>
                            <Input type="file" id="marksheet_10" name="marksheet_10" onChange={handleDocumentChange} className="w-[40%]"></Input>
                        </div>
                        
                    </div>
                    
                    <div className="flex justify-around w-[50%]">
                        <Button type="submit" className="w-[7rem] bg-green-700">Add Info</Button>
                        <Button onClick={() => navigate("/profile")} className="w-[7rem] bg-green-700">Cancel</Button>
                    </div>
                
                </div>
            </form>
        </div>
    );
};

export default AddInfo;
