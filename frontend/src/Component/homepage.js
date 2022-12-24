import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Container, Stack, TextInput, Button, Group, } from '@mantine/core';
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
  const [oldDetails, setOldDetails] = useState({})
  const [newDetails, setNewDetails] = useState({})
  const notificationAutocloseTimeUp = 4000;

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

  const showInvalidMobileNotification = () => {
    showNotification({
      title: "Error",
      message: "Invalid Phone Number",
      autoClose: notificationAutocloseTimeUp,
      color: "red"
    })
  }

  const showInvalidEmailNotification = () => {
    showNotification({
      title: "Error",
      message: "Invalid Email",
      autoClose: notificationAutocloseTimeUp,
      color: "red"
    })
  }

  //Updating the user data in database
  async function update(e) {
    if (!validateMobile(newDetails.phone)) {
      showInvalidMobileNotification()
    }
    else if (!validateEmail(newDetails.email)) {
      showInvalidEmailNotification()
    }
    else {
      let temp = {
        name: newDetails.name,
        phone: newDetails.phone,
        email: newDetails.email,
        location: newDetails.location,
        oldphone: oldDetails.phone
      }
      try {
        let content = await axios.post("/api/findAndUpdate", temp)
        showNotification({
          title: "Success",
          message: "Record Updated Succesfully",
          autoClose: notificationAutocloseTimeUp,
          color: "green",
        })
        getAllRecords()
        setOpened(false)
      }
      catch (err) {
        console.log(err)
        if (err?.response?.status == 409) {
          showNotification({
            title: "Error",
            message: "Phone Number already exists",
            autoClose: notificationAutocloseTimeUp,
            color: "red"
          })
        }
        else {
          showNotification({
            title: "Error",
            message: "Internal Server Error",
            autoClose: notificationAutocloseTimeUp,
            color: "red"
          })
        }
      }
    }
  }

  //To store the data of current updating user and to pop-up the model
  function show(e) {
    setOldDetails(e)
    setNewDetails(e)
    setOpened(true)
  }
  const rows = data.map((element) => (
    <tr key={element.phone} onClick={() => { show(element) }}>
      <td>{element.name}</td>
      <td>{element.phone}</td>
      <td>{element.email}</td>
      <td>{element.location}</td>
    </tr>
  ));

  function validateMobile(number) {
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

  function validateEmail(email) {
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

  const updateCurrentUser = (e) => {
    let temp = { ...newDetails }
    temp[e.target.id] = e.target.value
    setNewDetails(temp)
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
      <Modal
        centered
        opened={opened}
        onClose={() => { setOpened(false) }}
        title="Update the Details"
      >
        <Stack>
          <TextInput
            id="name"
            label="name"
            value={newDetails.name}
            onChange={updateCurrentUser}
          >
          </TextInput>
          <TextInput
            id="phone"
            label="phone"
            value={newDetails.phone}
            onChange={updateCurrentUser}
          >
          </TextInput>
          <TextInput
            id="email"
            label="email"
            value={newDetails.email}
            onChange={updateCurrentUser}
          >
          </TextInput>
          <TextInput
            id="location"
            label="location"
            value={newDetails.location}
            onChange={updateCurrentUser}
          >
          </TextInput>
        </Stack>
        <Button mt="sm" onClick={update}>Update</Button>
      </Modal>
    </div>
  );
}
export default HomePage