"use client";
import { Box } from '@mui/material';
import Sidebar from "@/src/components/layout/admin/Sidebar";
import Topbar from "@/src/components/layout/admin/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar />
          <Box sx={{ p: 3, bgcolor: '#f9f9f9', flexGrow: 1 }}>{children}</Box>
        </Box>
      </Box>
    </>

  );
}
