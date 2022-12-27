import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Container, Stack, TextInput, Button, Group, Space, Pagination, Select, Grid, Text } from '@mantine/core';
import { BsSearch } from "react-icons/bs";
import { showNotification } from '@mantine/notifications';
import Util from "./Service/util"
import * as xlsx from 'xlsx';

function HomePage() {
  const [opened, setOpened] = useState(false);
  const [oldDetails, setOldDetails] = useState({})
  const [newDetails, setNewDetails] = useState({})
  let [data, setData] = useState([]);
  let [searchFields, setSearchFields] = useState({ name: "", phone: "", email: "", location: "" });
  let [page, setPage] = useState(1);
  let [pages, setPages] = useState(1);
  let [limit, setLimit] = useState(10);
  const notificationAutocloseTimeUp = 4000;
  const pageLimits = ["10", "20", "50", "100"]

  useEffect(() => {
    getAllRecords()
  }, [page, limit]);

  //Function to get all TrucallerUser records
  const getAllRecords = async () => {
    axios.get("/api/getAllRecordsWithFilterPagination?name=" + searchFields.name
      + "&phone=" + searchFields.phone
      + "&email=" + searchFields.email
      + "&location=" + searchFields.location
      + "&page=" + page
      + "&limit=" + limit
    ).then(json => {
      setPages(json?.data?.pages)
      setData(json?.data?.docs)
    }).catch(error => {
      console.log(error);
    })
  }

  //function to download the records of truecallersusers
  const downloadTrueCallerRecords = async () => {
    let content = await axios.get("/api/getAllRecords")
    let allRecords = content.data
    let data = []
    for (let x of allRecords) {
      data.push({
        name: x.name,
        phone: x.phone,
        email: x.email,
        location: x.location
      })
    }
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, "TrueCallerUsersDetails.xlsx");
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
        oldPhone: oldDetails.phone
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
  const rows = data.map((element, ind) => (
    <tr key={element.phone} onClick={() => { show(element) }}>
      <td style={{ textAlign: "center" }}> {limit * (page - 1) + ind + 1}</td>
      <td style={{ textAlign: "center" }}>{element.name}</td>
      <td style={{ textAlign: "center" }}>{element.phone}</td>
      <td style={{ textAlign: "center" }}>{element.email}</td>
      <td style={{ textAlign: "center" }}>{element.location}</td>
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
    let temp = { ...searchFields }
    temp[e.target.id] = e.target.value
    setSearchFields(temp)
  }

  const updateCurrentUser = (e) => {
    let temp = { ...newDetails }
    temp[e.target.id] = e.target.value
    setNewDetails(temp)
  }

  const search = (e) => {
    if (e.key == "Enter") {
      setPage(1)
      getAllRecords()
    }
  }


  return (
    <div>
      <Container
        size={"lg"} my={20} style={{ minHeight: "80vh" }}
      >
        <Table striped highlightOnHover horizontalSpacing="sm" verticalSpacing="sm">
          <thead>
            <tr >
              <th style={{ textAlign: "center" }}>
                <Select
                  id="pageLimit"
                  radius="lg"
                  data={pageLimits}
                  value={limit.toString()}
                  maxDropdownHeight={200}
                  onChange={
                    (event) => {
                      setLimit(event)
                      setPage(1)
                    }
                  }
                  dropdownComponent="div"
                  transition="pop-top-left"
                  transitionDuration={200}
                  transitionTimingFunction="ease"
                  style={{ "font-weight": "400" }} />
              </th>
              <th style={{ textAlign: "center" }}>
                <Input
                  id='name'
                  size={"sm"}
                  placeholder="Search by Name"
                  radius="lg"
                  onChange={updateSearchFields}
                  onKeyUp={search}
                  rightSection={<BsSearch />}
                />
              </th>
              <th style={{ textAlign: "center" }}>
                <Input
                  id='phone'
                  size={"sm"}
                  placeholder="Search by Phone"
                  radius="lg"
                  onChange={updateSearchFields}
                  onKeyUp={search}
                  rightSection={<BsSearch />}
                />
              </th>
              <th style={{ textAlign: "center" }}>
                <Input
                  id='email'
                  size={"sm"}
                  placeholder="Search by Email"
                  radius="lg"
                  onChange={updateSearchFields}
                  onKeyUp={search}
                  rightSection={<BsSearch />}
                />
              </th>
              <th style={{ textAlign: "center" }}>
                <Input
                  id='location'
                  size={"sm"}
                  placeholder="Search by Location"
                  radius="lg"
                  onChange={updateSearchFields}
                  onKeyUp={search}
                  rightSection={<BsSearch />}
                />
              </th>
            </tr>
          </thead>
          <thead style={{ position: "sticky", "insetBlockStart": 0, backgroundColor: "white" }}>
            <tr>
              <th style={{ textAlign: "center" }}> <Text size="sm"> S.No  </Text></th>
              <th style={{ textAlign: "center" }}> <Text size="sm"> Name  </Text></th>
              <th style={{ textAlign: "center" }}> <Text size="sm"> Phone </Text></th>
              <th style={{ textAlign: "center" }}> <Text size="sm"> Email </Text></th>
              <th style={{ textAlign: "center" }}> <Text size="sm"> Location</Text></th>
            </tr>
          </thead>
          <tbody style={{ cursor: "pointer" }}>{rows}</tbody>
        </Table>
        <br />
        <Pagination style={{ position: "sticky", bottom: 0, "paddingTop": "5px", "paddingBottom": "10px", backgroundColor: "white" }} page={page} onChange={setPage} total={pages} size="md" radius="md" withEdges siblings={1} position="right" />
        <Button onClick={downloadTrueCallerRecords} style={{ display: "inline" }}>Download Records</Button>      </Container>
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