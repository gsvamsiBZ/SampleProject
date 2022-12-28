import React, { useEffect, useState } from "react"
import { showNotification } from '@mantine/notifications';
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import axios from 'axios';

function Signup() {
  let [userEmail, setUserEmail] = useState("")
  let [userPassword, setUserPassword] = useState("")
  let [userFullName, setUserFullName] = useState("")
  let [userUserName, setUserUserName] = useState("")

  const validatEmail = () => {
    let email = userEmail.trim()
    return (email.endsWith('@gmail.com') && email.length > 10)
  }
  const createAccount = async (e) => {
    e.preventDefault()
    if (!validatEmail()) {
      showNotification({
        title: "Error",
        message: "Invalid Email",
        autoClose: 4000,
        color: "red"
      })
    }
    else {
      let body = {
        username: userUserName,
        name: userFullName,
        email: userEmail,
        password: userPassword
      }
      axios.post("/api/signUp", body
      ).then(json => {
        showNotification({
          title: "Success",
          message: "Account created successfully Please Login",
          autoClose: 4000,
          color: "green"
        })
        document.getElementById("signUpForm").reset();
      }).catch(err => {
        if (err?.response?.data == "email") {
          showNotification({
            title: "Error",
            message: "Account already exists with this email",
            autoClose: 4000,
            color: "red"
          })
        }
        else if (err?.response?.data == "username") {
          showNotification({
            title: "Error",
            message: "Account already exists with this Username",
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
      })
    }
  }

  return (
    <div>
      <Container size={420} my={40}>
        <form id="signUpForm" onSubmit={createAccount}>
          <TextInput label="Email" placeholder="you@mantine.dev" required onChange={(e) => setUserEmail(e.target.value)} />
          <TextInput label="Username" placeholder="UserName" mt="md" required onChange={(e) => setUserUserName(e.target.value)} />
          <TextInput label="Name" placeholder="Full Name" mt="md" required onChange={(e) => setUserFullName(e.target.value)} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e) => setUserPassword(e.target.value)} />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Container>
    </div>
  )

}
export default Signup