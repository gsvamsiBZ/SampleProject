import React from "react"
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from "axios"
import { showNotification } from '@mantine/notifications';
function Adduser(){
    async function add(values){
        try{
        console.log("values are ",values)
        let content=await axios.post("api/insertTruecallerUser",values)
        console.log("cotent is ",content)
        if(content.data=="duplicate"){
             console.log("Duplicate found")
             showNotification({
              title:"Duplicate Error Notification",
              message:"Found Duplicate Key of Phone Number",
              autoClose: 4000,
              color:"red"
          })
        }
        else{
          showNotification({
            title:"Success Notification",
            message:"Insertion into DB Successfull",
            autoClose: 4000,
            color:"green",
            
        })
        let g=document.getElementsByTagName("Input");
        for(let x of g){
          x.value=""
        }
        }
        
        }
        catch(err){
            showNotification({
                title:"Error Notification",
                message:err,
                autoClose: 4000,
              color:"red"
               
            })
        }
    }
    function validatemobile(number){
        if(number.length!=10){
            return false 
        }
        for(let x of number){
            if(isNaN(x)){
                return false
            }
        }
        return true
    }
    function validateemail(email){
        email=email.trim()
        if(email.length==0){
            return true
        }
        if(email.endsWith('@gmail.com') && email.length>10){
            return true
        }
        return false
    }
    const form = useForm({
        initialValues: {
          email: '',
          phone:'',
          name:'',
          location:''
        },
    
        validate: {
          email: (value) => (validateemail(value)? null : 'Invalid email'),
          phone:(value)=>(validatemobile(value) ? null:'Invalid number'),
        },
      });
    return(
        <div>
        <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => add(values))}>
        <TextInput
        id="name"
          required
          withAsterisk
          label="Name"
          placeholder="your Name"
          {...form.getInputProps('name')}
        />
        <TextInput
        required
          withAsterisk
          label="Phone"
          placeholder="your Phone Number"
          {...form.getInputProps('phone')}
        />
        <TextInput
          label="Email"
          placeholder="your email"
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Location"
          placeholder="your Location"
          {...form.getInputProps('location')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
    
    </div>
    )
}

export default Adduser