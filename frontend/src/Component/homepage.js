import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Container, Input, Group } from '@mantine/core';
import Navbar from "./navbar";
import { BsSearch } from "react-icons/bs";


function HomePage() {
  let [data, setData] = useState([]);
  let [searchfields, setSearchfields] = useState({ name: "", phone: "", email: "", location: "" });
  let [page, SetPage] = useState(1);
  let [pages, SetPages] = useState(1);
  let [limit, setPage] = useState(1);
  let [query, SetQuery] = useState("");

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

  const rows = data.map((element) => (
    <tr key={element.phone}>
      <td >{element.name}</td>
      <td >{element.phone}</td>
      <td >{element.email}</td>
      <td >{element.location}</td>
    </tr>
  ));

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
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </div>
  );
}
export default HomePage