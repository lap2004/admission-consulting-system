"use client";

import ChatIcon from '@mui/icons-material/Chat';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import CallIcon from '@mui/icons-material/Call';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isLogin } from '../lib/helper';
import { removeAuthCookies } from '../lib/helper/token';
import { useProtectedProtected } from '../services/hooks/hookAuth';

const Header = () => {
  const pathname = usePathname();


  // user desktop menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  // user mobile menu
  const [openMobile, setOpenMobile] = React.useState(false);

  const handleMobile = () => {
    setOpenMobile(!openMobile);
  };


  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | undefined>(undefined);
  const { postProtectedProtected } = useProtectedProtected();

  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      removeAuthCookies()
      setUser(null);
      router.push("/login");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  const fetchUser = React.useCallback(async () => {
    try {
      const res = await postProtectedProtected({});
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }, [postProtectedProtected]);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
    setLoggedIn(isLogin());

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, fetchUser]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1,
          bgcolor: (theme) =>
            scrolled ? alpha(theme.palette.grey[700], 0.75) : "transparent",
          color: scrolled ? "white" : "black",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? 3 : "none",
          transition: "background-color .3s ease",
          px: 2,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            px: { xs: 2, md: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Image
              width={1000}
              height={1000}
              src="/logoVl.png"
              className="w-36"
              alt="logo"
              style={{ display: "block" }}
            />
          </Link>

          {/* —— DESKTOP MENU —— */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: "light",
                }}
              >
                <Link href={user?.role === "admin" ? "/admin/dashboard" : "/user/home"} style={{ textDecoration: "none", color: "white" }}
                  className={` ${pathname === "/" || pathname === '/user/home' ? "bg-[#AEB1B6] px-4 py-2 rounded-md" : ""}`}
                >
                  Trang Chủ
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                sx={{
                  color: "white",
                  fontWeight: "light",
                }}
              >
                <Link href={"/user/home#footer"} style={{ textDecoration: "none", color: "white" }}
                className={` ${pathname === "/user/home#footer" ? "bg-[#AEB1B6] px-4 py-2 rounded-md" : ""}`}
                >
                  Liên Hệ
                </Link>

              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                color="inherit"
                sx={{
                  // p: "10px 20px",
                  fontWeight: "light",

                }}

              >
                <Link href="/tu-van" style={{ textDecoration: "none", color: "white" }}
                  className={` ${pathname === "/tu-van" ? "bg-[#AEB1B6] px-4 py-2 rounded-md" : ""}`}
                >
                  {loggedIn ? "Chat Sinh Viên" : "Chat Tuyển Sinh"}
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                sx={{
                  color: "white",
                  fontWeight: "light",
                }}
              >
                <Link href={"/guide/1-gioi-thieu"} style={{ textDecoration: "none", color: "white" }}
                >
                  Hướng dẫn sử dung
                </Link>

              </Button>
            </motion.div>

            {/* Đăng Nhập / Đăng Xuất */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {!user && (
                <div
                  className={` ${loggedIn ? "" : "bg-[#1565c0]"} text-white font-light px-4 py-2 rounded-md`}
                  onClick={() => {
                    if (loggedIn) {
                      return
                    } else {
                      router.push("/login");
                    }
                  }}
                >
                  {
                    loggedIn ?
                      <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                          <Tooltip title="Account settings">
                            <IconButton
                              onClick={handleClick}
                              size="small"
                              sx={{ ml: 2 }}
                              aria-controls={open ? 'account-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                            >
                              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          slotProps={{
                            paper: {
                              elevation: 0,
                              sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                '&::before': {
                                  content: '""',
                                  display: 'block',
                                  position: 'absolute',
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: 'background.paper',
                                  transform: 'translateY(-50%) rotate(45deg)',
                                  zIndex: 0,
                                },
                              },
                            },
                          }}
                          disableScrollLock
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                          {/* doi */}
                          <MenuItem onClick={handleClose}>
                            <Avatar /> Thông tin người dùng
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={() => router.push("/change-password")}>
                            <ListItemIcon>
                              <Settings fontSize="small" />
                            </ListItemIcon>
                            Đổi mật khẩu
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </Menu>
                      </React.Fragment> :
                      "Đăng Nhập Cho Sinh Viên"
                  }
                </div>
              )}
            </motion.div>

          </Box>

          {/* —— MOBILE: nút menu —— */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>


      {/* —— DRAWER cho mobile —— */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <List
          sx={{ width: '100%', minWidth: 280, bgcolor: 'background.paper' }}
          className='p-2'
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Menu
            </ListSubheader>
          }
        >

          <ListItemButton onClick={() => {
            router.push("/")
            setDrawerOpen(!drawerOpen);

          }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItemButton>

          <ListItemButton onClick={() => {
            router.push("/tu-van")
            setDrawerOpen(!drawerOpen);
          }}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={loggedIn ? "Chat Sinh Viên" : "Chat Tuyển Sinh"} />
          </ListItemButton>

          <ListItemButton onClick={() => {
            router.push("/user/home#footer")
            setDrawerOpen(!drawerOpen);
          }}>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText primary="Liên Hệ" />
          </ListItemButton>
          

          {loggedIn ?
            <>
              <ListItemButton onClick={handleMobile}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Thông tin cá nhân" />
                {openMobile ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={openMobile} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => router.push("/change-password")}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4, borderRadius: "10px" }} onClick={() => {
                    handleLogout();
                    setDrawerOpen(false);
                  }}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Đăng xuất" />
                  </ListItemButton>

                </List>
              </Collapse>
            </>
            :
            <>
              <ListItemButton onClick={() => {
                router.push("/login")
                setDrawerOpen(!drawerOpen);

              }}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Đăng nhập cho sinh viên" />
              </ListItemButton>
            </>
          }


        </List>
      </Drawer>
    </>
  );
};

export default Header;
