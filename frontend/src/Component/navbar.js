import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { createStyles, Header, Group, Box, Space, Image, Text } from "@mantine/core"
import Util from "./Service/util";
import { RiLogoutCircleLine } from "react-icons/ri";


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
  const util = new Util();
  const { classes, theme } = useStyles()
  let [loggedIn, setLoggedIn] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    let isLogin = util.loggedIn();
    setIsAdmin(util.isAdmin());
    setLoggedIn(isLogin);
    if (!isLogin && window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }, [])
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
              {loggedIn ? (<Link to="/" className={classes.link}>
                <Image width={35} height={35} radius={"lg"} fit="contain" src="./logo192.png" />
                <Space w="xs" />
                <Text size={"lg"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}> TrueCaller</span>
                </Text>
              </Link>) :
                (<>
                  <Image width={35} height={35} radius={"lg"} fit="contain" src="./logo192.png" />
                  <Space w="xs" />
                  <Text size={"lg"}>
                    {" "}
                    <span style={{ fontWeight: "bold" }}> TrueCaller</span>
                  </Text>
                </>)
              }
            </Group>

            <Group position="center" sx={{ height: "100%" }}  >
              {loggedIn &&
                <Link to="/" className={classes.link}>
                  Home
                </Link>
              }
              {loggedIn && isAdmin &&
                <Link to="/add" className={classes.link}>
                  Add
                </Link>
              }
              {loggedIn &&
                <Link to="/search" className={classes.link}>
                  Search Users
                </Link>
              }
              {loggedIn &&
                <a
                  className={classes.link}
                  title="logout"
                  href="/login"
                  onClick={() => {
                    util.logout()
                  }}
                ><RiLogoutCircleLine size={25} />
                </a>
              }
            </Group>



            {/* <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} /> */}
          </Group>
        </Header>
      </Box>
    </div>

  )
}

export default Navbar;
