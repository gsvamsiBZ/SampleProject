import React from "react"
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';

function Signup() {
  return (
    <div>
      <Container size={420} my={40}>
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <TextInput label="Name" placeholder="Full Name" mt="md" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Container>
    </div>
  )

}
export default Signup