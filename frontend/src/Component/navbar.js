import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { createStyles, Header, Group, Box, Space, Image, Text } from "@mantine/core"



const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },
}))

function Navbar() {
  const { classes, theme } = useStyles()
  return (
    <div>
      <Box
        style={{
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
        <Header
          style={{
            // backgroundColor: !dark ? "hsla(0,0%,100%,.8)" : "hsl(225, 7%, 11%,.8)",
            backdropFilter: "saturate(180%) blur(5px)",
          }}
          height={60}
          px="md"
        >
          <Group sx={{ height: "100%" }} position="apart">
            <Group sx={{ height: "100%" }}>
              <Link to="/" className={classes.link}>
                <Image width={35} height={35} radius={"lg"} fit="contain" src="./logo192.png" />
                <Space w="xs" />
                <Text size={"lg"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}> TrueCaller</span>
                </Text>
              </Link>
            </Group>

            <Group position="center" sx={{ height: "100%" }}  >
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link to="/add" className={classes.link}>
                Add
              </Link>
              <Link to="/submissions" className={classes.link}>
                Search Users
              </Link>
            </Group>



            {/* <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} /> */}
          </Group>
        </Header>
      </Box>
    </div>

  )
}

export default Navbar;
