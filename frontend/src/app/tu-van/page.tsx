"use client";
import ChatComponent from "@/src/components/ChatComponent";
import Header from "@/src/components/Header";
import {
  Box
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ChatPage() {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Header />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          pointerEvents: "none",
        }}
      >
        <video
          src="/testVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: alpha("#000", 0.7),
          zIndex: -1,
        }}
      />
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ChatComponent />
      </MotionBox>
    </Box>
  );
}
