import React, { useEffect, useState } from "react"
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';

function Login() {

  return (
    <div>
      <Container size={420} my={40}>
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Anchor href="/forgotPassword" size="sm">
          Forgot password?
        </Anchor>
        <Button fullWidth mt="xl">
          Login in
        </Button>
      </Container>
    </div>
  )

}
export default Login