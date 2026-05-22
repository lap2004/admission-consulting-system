"use client";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import Cookies from "js-cookie";

import { isLogin } from '@/src/lib/helper';
import { removeAuthCookies } from '@/src/lib/helper/token';
import { useProtectedProtected } from '@/src/services/hooks/hookAuth';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, href: '/admin/users' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any | undefined>(undefined);
    const { postProtectedProtected } = useProtectedProtected();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = async () => {
        try {
            removeAuthCookies()
            setUser(null);
            router.push("/");

        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const fetchUser = React.useCallback(async () => {
        try {
            const res = await postProtectedProtected({});
            setUser(res);
            if (res.role !== "admin") {
                router.push("/");
            }
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
    }, [fetchUser]);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                position: 'relative'
            }}
        >
            <Toolbar className='flex items-center justify-center bg-[#B02E35]'>
                <Image src={"/chatbot.png"} width={1000} height={1000} alt='logoVanLang' className='w-12 h-12'></Image>
            </Toolbar>
            <Box sx={{ overflow: 'auto', flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <List>
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href} passHref>
                            <ListItem button selected={pathname === item.href}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Box sx={{
                    background: "#1f2937",
                    height: "5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: 2,
                    alignItems: "center"
                }}>
                    <Box sx={{ color: "white", display: "flex" }}>
                        <AccountCircleIcon sx={{ fontSize: "2rem", marginRight: "5px" }} />
                        <Box sx={{ gap: 4 }}>
                            {/* thay */}
                            <Typography sx={{ fontSize: "76.25%" }}>admin@vanlanguni.vn</Typography>
                            <Typography sx={{ fontSize: "76.25%", color: "#D46B36" }}>VLU@2025</Typography>
                        </Box>
                    </Box>
                    <div className='hover:cursor-pointer' onClick={handleLogout}><LogoutIcon sx={{ color: "white", fontSize: "1.5rem" }} /></div>
                </Box>
            </Box>

        </Drawer>
    );
}
