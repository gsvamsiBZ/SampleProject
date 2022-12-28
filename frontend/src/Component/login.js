import React, { useEffect, useState } from "react"
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Login() {

  let [userEmail, setUserEmail] = useState("")
  let [userPassword, setUserPassword] = useState("")
  const navigate = useNavigate()

  const verify = async (e) => {
    e.preventDefault()
    axios.get("/api/login?user=" + userEmail
      + "&password=" + userPassword
    ).then(json => {
      localStorage.setItem('token', json.data);
      window.location.replace("/");
    }).catch(error => {
      showNotification({
        title: "Error",
        message: "Invalid Credentials",
        autoClose: 4000,
        color: "red"
      })
    })
  }
  return (
    <div>
      <Container size={420} my={40}>
        <form onSubmit={verify}>
          <TextInput label="Email or Username" placeholder="Email/Username" required onChange={(e) => setUserEmail(e.target.value)} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e) => setUserPassword(e.target.value)} />
          <Anchor href="/forgotPassword" size="sm">
            Forgot password?
          </Anchor>
          <Button fullWidth mt="xl" type="submit">
            Login in
          </Button>
        </form>
      </Container>
    </div>
  )

}
export default Login