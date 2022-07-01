import React from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import './Login.css';
import {useForm } from "react-hook-form";

import TabPanel from "../../common/tabPanel/TabPanel";



const Login=(props)=>{
    const { register,handleSubmit,formState:{errors}}=useForm();


const onSubmit = async(data)=>{
    props.closeModalHandler();
    
   };

return (
    <TabPanel>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl required>
                <InputLabel htmlFor="emailId">Email</InputLabel>
                <Input {...register("emailId",{
                    required:true,
                    pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                })}
                />
                {errors.emailId && (
                    <FormHelperText>
                        <span className="red">Enter valid Email</span>
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
                {errors.password && (
                    <FormHelperText>
                        <span className="red">required</span>
                    </FormHelperText>
                )}
            </FormControl>
            <br/>
            <br/>
           <br/>
           <br/>
            <Button type="submit" variant="contained" color="primary">LOGIN</Button>
        </form>
    </TabPanel>
);

};
export default  Login;




