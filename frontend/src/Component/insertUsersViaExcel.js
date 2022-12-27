import * as xlsx from "xlsx";
import React, { useState } from "react";
import axios from 'axios';
import DownloadExcel from "./truecallerSampleExcel";
import { showNotification } from '@mantine/notifications';
import { Table, Container, FileInput, Button, ScrollArea } from '@mantine/core';
import { IconUpload } from '@tabler/icons';


//function to insert data from excel
function InsertFromExcel() {
  const [myData, setMyData] = useState([]);
  const [value, setValue] = useState();
  //inserting data into database
  const insertingData = async () => {
    let content
    try {
      content = await axios.post("api/insertManyTruecallerUsers", myData)
      showNotification({
        title: "Success",
        message: "Records from excel Inserted Succesfully",
        autoClose: 4000,
        color: "green"

      })
    }
    catch (err) {
      console.log(err?.response?.data?.code)
      //11000 status is for duplicate record
      if (err?.response?.data?.code === 11000) {
        showNotification({
          title: "Error",
          message: "records successfully inserted but some duplicates exists",
          autoClose: 4000,
          color: "green"
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

  //converting excel data to json
  const excelToJSON = async (e) => {
    setValue(e)
    if (e) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setMyData(json)
      }
      reader.readAsArrayBuffer(e);
    };
  }

  const rows = myData.map((element) => (
    <tr key={element.phone}>
      <td >{element.name}</td>
      <td >{element.phone}</td>
      <td >{element.email}</td>
      <td >{element.location}</td>
    </tr>
  ));

  return (
    <Container
      mt={"xl"}
      size={"md"}
      my={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <center>
        <h1>You can insert data by uploading excel file</h1>
        <div>

          <FileInput
            placeholder="Pick excel file"
            label="Upload file"
            icon={<IconUpload size={14} />}
            radius="xs"
            size="xl"
            value={value}
            onChange={excelToJSON}
          />
          <br />
          <Button onClick={DownloadExcel} variant="outline">Download Sample file</Button>
        </div>
        <br /><br />
        <div>
          <ScrollArea style={{ height: 250 }}>
            {
              <div>
                <Table striped highlightOnHover  >
                  <thead style={{ position: "sticky", "inset-block-start": 0, backgroundColor: "white" }}>
                    <tr>
                      <th style={{ width: "27%" }}>Name</th>
                      <th style={{ width: "26%" }}>Phone</th>
                      <th style={{ width: "26%" }}>Email</th>
                      <th >Location</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </div>
            }
          </ScrollArea>
        </div>
        <br /><br />
        <Button onClick={insertingData}>
          insert
        </Button>
      </center>
    </Container>
  )
}

export default InsertFromExcel