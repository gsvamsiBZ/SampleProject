import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Modal, Container, Stack } from '@mantine/core';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef } from 'react';
import { Input } from '@mantine/core';
import Navbar from "./navbar";
import { BsSearch } from "react-icons/bs";
import { showNotification } from '@mantine/notifications';


function HomePage() {
  let [searchfields, setSearchfields] = useState({ name: "", phone: "", email: "", location: "" });
  let [page, SetPage] = useState(1);
  let [pages, SetPages] = useState(1);
  let [limit, setPage] = useState(1);
  let [query, SetQuery] = useState("");
  const [data, setData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [details, setDetails] = useState({})
  const myname = useRef();
  const myemail = useRef();
  const myphone = useRef();
  const mylocation = useRef()
  useEffect(() => {
    getAllRecords()
  }, []);

  //Function to get all TrucallerUser records
  const getAllRecords = async () => {
    axios.get("/api/getAllRecords?name=" + searchfields.name
      + "&phone=" + searchfields.phone
      + "&email=" + searchfields.email
      + "&location=" + searchfields.location
    ).then(json => {
      setData(json.data)
    }).catch(error => {
      console.log(error);
    })
  }
  async function add(e) {
    e.preventDefault()
    if (!validatemobile(myphone.current.value)) {
      alert("Please enter valid Phone number")
    }
    else if (!validateemail(myemail.current.value)) {
      alert("Please enter valid email id")
    }
    else {
      let newdetails = {
        name: myname.current.value,
        phone: myphone.current.value,
        email: myemail.current.value,
        location: mylocation.current.value,
        oldphone: details.phone
      }
      console.log("old details are ", details)
      console.log("new details are ", newdetails)
      try {
        let content = await axios.post("/api/findandupdate", newdetails)
        console.log("content after update ", content)
        showNotification({
          title: "Success",
          message: "Record Updated Succesfully",
          autoClose: 4000,
          color: "green",

        })
        getAllRecords()
        setOpened(false)
      }
      catch (err) {
        console.log("error", err)
        if (err?.response?.status == 409) {
          showNotification({
            title: "Error",
            message: "Phone Number already exists",
            autoClose: 4000,
            color: "red"
          })
        }
        else {
          showNotification({
            title: "Error",
            message: "Internal Server Error",
            autoClose: 4000,
            color: "red"
          })
        }
      }
    }
  }
  function show(e) {
    setDetails(e)
    setOpened(true)
    setTimeout(() => {
      myemail.current.value = e.email
      myname.current.value = e.name
      myphone.current.value = e.phone
      mylocation.current.value = e.location
    }, 1000)

  }
  const rows = data.map((element) => (
    <tr key={element.phone} onClick={() => { show(element) }}>
      <td>{element.name}</td>
      <td>{element.phone}</td>
      <td>{element.email}</td>
      <td>{element.location}</td>
    </tr>
  ));
  function validatemobile(number) {
    if (number.length != 10) {
      return false
    }
    for (let x of number) {
      if (isNaN(x)) {
        return false
      }
    }
    return true
  }
  function validateemail(email) {
    email = email.trim()
    if (email.length == 0) {
      return true
    }
    if (email.endsWith('@gmail.com') && email.length > 10) {
      return true
    }
    return false
  }
  const updateSearchFields = (e) => {
    let temp = { ...searchfields }
    temp[e.target.id] = e.target.value
    setSearchfields(temp)
  }

  const search = (e) => {
    if (e.key == "Enter") {
      getAllRecords()
    }
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
        <div>
          <Group position="apart">
            <Input
              id='name'
              size={"sm"}
              placeholder="Search by Name"
              radius="lg"
              onChange={updateSearchFields}
              onKeyUp={search}
              rightSection={<BsSearch />}
            />
            <Input
              id='phone'
              size={"sm"}
              placeholder="Search by Phone"
              radius="lg"
              onChange={updateSearchFields}
              onKeyUp={search}
              rightSection={<BsSearch />}

            />
            <Input
              id='email'
              size={"sm"}
              placeholder="Search by email"
              radius="lg"
              onChange={updateSearchFields}
              onKeyUp={search}
              rightSection={<BsSearch />}
            />
            <Input
              id='location'
              size={"sm"}
              placeholder="Search by Location"
              radius="lg"
              onChange={updateSearchFields}
              onKeyUp={search}
              rightSection={<BsSearch />}
            />
          </Group>
        </div>
        <Table striped highlightOnHover  >
          <thead>
            <tr>
              <th style={{ width: "27%" }}>Name</th>
              <th style={{ width: "26%" }}>Phone</th>
              <th style={{ width: "26%" }}>Email</th>
              <th >Location</th>
            </tr>
          </thead>
          <tbody style={{ cursor: "pointer" }}>{rows}</tbody>
        </Table>
      </Container>
      <div style={{ marginTop: "1cm" }}>
        <Modal
          centered
          opened={opened}
          onClose={() => { setOpened(false) }}
          title="Update the Details"
        >
          <Stack>
            <TextInput
              label="name"
              ref={myname}
            >
            </TextInput>
            <TextInput
              label="phone"
              ref={myphone}
            >
            </TextInput>
            <TextInput
              label="email"
              ref={myemail}
            >
            </TextInput>
            <TextInput
              label="location"
              ref={mylocation}
            >
            </TextInput>
          </Stack>
          <Button mt="sm" onClick={add}>Update</Button>
        </Modal>
      </div>
    </div>
  );
}
export default HomePage