import React from "react";
import { Table, Container } from '@mantine/core';
import Navbar from "./navbar";
function HomePage() {
  const elements = [
    { name: "Siddhartha Reddy Bethi", phone: "9550738033", email: "sid@gmail.com", location: "Nizamabad" },
    { name: "Karthik", phone: "9990078033", email: "kar@gmail.com", location: "Hyderabad" },
    { name: "Vamsi", phone: "8887318093", email: "vamsi@gmail.com", location: "Delhi" },
  ];
  const rows = elements.map((element) => (
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
        size={"lg"}
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