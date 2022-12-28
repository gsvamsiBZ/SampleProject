import React from "react"
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from "axios";
import { showNotification } from '@mantine/notifications';
function Adduser() {
  async function add(values) {
    let content
    try {
      content = await axios.post("api/insertTruecallerUser", values)
      showNotification({
        title: "Success",
        message: "Record Inserted Succesfully",
        autoClose: 4000,
        color: "green",
      })
    }
    catch (err) {
      console.log(err)
      //409 status is for duplicate record
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
    return (email.length == 0) || (email.endsWith('@gmail.com') && email.length > 10)
  }
  const form = useForm({
    initialValues: {
      email: '',
      phone: '',
      name: '',
      location: ''
    },
    validate: {
      email: (value) => (validateEmail(value) ? null : 'Invalid email'),
      phone: (value) => (validateMobile(value) ? null : 'Invalid number'),
    },
  });
  return (
    <div>
      <Box sx={{ maxWidth: 300 }} mx="auto" mt="2%">
        <form onSubmit={form.onSubmit((values) => add(values))}>
          <TextInput
            id="name"
            required
            withAsterisk
            label="Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            withAsterisk
            label="Phone"
            {...form.getInputProps('phone')}
          />
          <TextInput
            label="Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Location"
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