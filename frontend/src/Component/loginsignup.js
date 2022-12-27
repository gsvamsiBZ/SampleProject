import React, { useEffect, useState } from "react"
import { Tabs, Container, Paper } from '@mantine/core';
import Login from "./login"
import Signup from "./signup"

function LoginandSignup() {
  return (
    <div>
      <Container size={620} my={40}>
        <Paper withBorder shadow="md" p={50} mt={30} size="md" radius="lg">
          <Tabs radius="xs" defaultValue="Login">
            <Tabs.List grow position="center">
              <Tabs.Tab value="Login">Login</Tabs.Tab>
              <Tabs.Tab value="Signup">Signup</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Login" pt="xs">
              <Login></Login>
            </Tabs.Panel>

            <Tabs.Panel value="Signup" pt="xs">
              <Signup></Signup>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Container>
    </div>
  )
}
export default LoginandSignup