import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Modal,Container } from '@mantine/core';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef } from 'react';
import Navbar from "./navbar";


function HomePage() {

  
  const [data, setData] = useState([]);
  const [opened,setOpened]=useState(false);
  const [details,setDetails]=useState({})
  const myname=useRef();
  const myemail=useRef();
  const myphone=useRef();
  const mylocation=useRef()
  useEffect(() => {
    axios.get("/api/getAllRecords").then(json => {
      setData(json.data)      
    }).catch(error => {
      console.log(error);
    })
  }, []);
  
  async function add(e){
    e.preventDefault()
    if(!validatemobile(myphone.current.value)){
       alert("Please enter valid Phone number")
    }
    else if(!validateemail(myemail.current.value)){
      alert("Please enter valid email id")
    }
    else{
    let newdetails={
      name:myname.current.value ,
      phone:myphone.current.value,
      email:myemail.current.value, 
      location:mylocation.current.value,
      oldphone:details.phone
    }
    console.log("old details are ",details)
    console.log("new details are ",newdetails)
    let content= await axios.post("/api/findandupdate",newdetails)
    console.log("content after update ",content)
    setOpened(false)
  }
  }
  function show(e){
    setDetails(e)  
      setOpened(true)
      setTimeout(()=>{
        myemail.current.value=e.email
      myname.current.value=e.name 
      myphone.current.value=e.phone 
      mylocation.current.value=e.location 
      },1000)
      
  }
  const rows = data.map((element) => (
    <tr key={element.phone} onClick={()=>{show(element)}}>
      <td>{element.name}</td>
      <td>{element.phone}</td>
      <td>{element.email}</td>
      <td>{element.location}</td>
    </tr>
  ));
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
  return (
    <div>
      <Navbar></Navbar>
      <Container
        mt={"xl"}
        size={"md"}
        my={20}
        style={{
          minHeight: "100vh",
        }}
      >
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>


      <Modal
        opened={opened}
        onClose={()=>{setOpened(false)}}
        title="Update the Details"
      >
        <form onSubmit={add}>
        <label for="name"><b>Name*</b></label>
        <br></br>
       <input type="text" ref={myname} placeholder="Enter Name" id="name" required/>
       <br></br>
       <label for="phone"><b>Phone*</b></label>
       <br></br>
       <input type="text"ref={myphone} placeholder="Enter Phone" id="phone" required/>
       <br></br>
       <label for="email"><b>Email</b></label>
       <br></br>
       <input type="email" ref={myemail} placeholder="Enter Email" id="email"/>
       <br></br>
       <label for="location"><b>Location</b></label>
       <br></br>
       <input type="text" ref={mylocation} placeholder="Enter Location" id="location"/>
       <br></br>
       <br></br>
       <input type="submit" value="Update"></input>
       </form>    
      </Modal>
    </div> 
    );
}
export default HomePage