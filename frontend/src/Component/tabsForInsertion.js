import { Tabs, Container } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconForms, IconFile, IconFiles, IconUser, IconUsers } from '@tabler/icons';
import Adduser from './insertUserViaForm';
import InsertFromExcel from './insertUsersViaExcel';
import Navbar from "./navbar";

function Insertion() {
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
        <Tabs color="indigo" defaultValue="form">

          <Tabs.List grow position="center">
            <Tabs.Tab value="form" icon={<IconUser size={28} />}>Form</Tabs.Tab>
            <Tabs.Tab value="excel" icon={<IconUsers size={28} />}>Excel</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="form" pt="xs">
            <Adduser></Adduser>
          </Tabs.Panel>

          <Tabs.Panel value="excel" pt="xs">
            <InsertFromExcel></InsertFromExcel>
          </Tabs.Panel>

        </Tabs>
      </Container>
    </div>
  );
}

export default Insertion;