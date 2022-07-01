import React, { useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';



import {useForm } from "react-hook-form";
import * as fetchApi from "../../util/fetch";
import TabPanel from "../../common/tabPanel/TabPanel";


const REGISTER_API_PATH = "users/register";
const Register=(props)=>{
    const { register,handleSubmit,formState:{errors}}=useForm();

    const [registersuccess,setRegistersuccess]=useState(false);
const onSubmit = async(data)=>{
    // const response= await fetchApi.postData(REGISTER_API_PATH,data
        
    //     );
    // if(response.status=== 200){
       
    //   alert("Registration Successful. Please Login!");
       
    // }
    // else{
    //     const error=await response.json();
    //     console.log(error);
    //     alert(error.message);
    // }
    setRegistersuccess(true);
};

return (
    <TabPanel>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl required>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input {...register("firstName",{
                    required:true
                })}
                />
                
            </FormControl>
            <br/>
            <br/>
            <FormControl required>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input type="lastName" {...register("lastName",{
                    required:true
                   
                })}
                />
            </FormControl>
            <br/>
            <br/>
            <FormControl required>
                <InputLabel htmlFor="emailId">Email Id</InputLabel>
                <Input  {...register("emailId",{
                    required:true,
                    pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                   
                })}
                />
                {errors.emailId && (
                    <FormHelperText>
                        <span style={{color:"red"}}>Enter Valid Email</span>
                    </FormHelperText>
                )}
            </FormControl>
            <br/>
            <br/>
            <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type="password" {...register("password",{
                    required:true
                   
                })}
                />
            </FormControl>
            <br/>
            <br/>

            <FormControl required>
                <InputLabel htmlFor="mobile">Contact No</InputLabel>
                <Input type="mobile" {...register("mobile",{
                    required:true,
                    pattern:/^\d{10}$/
                   
                })}
                />
                {errors.mobile && (
                    <FormHelperText>
                        <span style={{color:"red"}}>Enter valid mobile number</span>
                    </FormHelperText>
                )}
            </FormControl>
            <br/>
            <br/>
            {registersuccess && (
                <FormControl>
                    <span className="successText">Registration Successful. Please Login!</span>
                </FormControl>
            )}
            <br/>
            <br/>
            <Button type="submit" variant="contained" color="primary">REGISTER</Button>
        </form>
    </TabPanel>
);

};
export default Register;




