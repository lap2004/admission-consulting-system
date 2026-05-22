"use client";
import Chat from "@/src/components/chat/Chat";
import Achieve from "@/src/components/layout/user/Achieve";
import VideoHero from "@/src/components/layout/user/Hero";
import Major from "@/src/components/layout/user/Major";
import News from "@/src/components/layout/user/News";
import NewSection from "@/src/components/layout/user/NewSection";
import RoadPath from "@/src/components/layout/user/RoadPath";
import {
  Container
} from "@mui/material";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <NewSection />
      <Container maxWidth="xl">
        <VideoHero />
        <Achieve />
        <RoadPath />
        <Major />
        <News />
        <Chat />
      </Container>
    </motion.div>
  );

}
