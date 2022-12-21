import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Container } from '@mantine/core';
import Navbar from "./navbar";

function HomePage() {
  let [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/getAllRecords").then(json => {
      setData(json.data)      
    }).catch(error => {
      console.log(error);
    })
  }, []);
  
  const rows = data.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.phone}</td>
      <td>{element.email}</td>
      <td>{element.location}</td>
    </tr>
  ));
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
    </div> 
    );
}
export default HomePage