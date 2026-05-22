"use client";

import LoadingDots from "@/src/components/LoadingDot";
import { useChatAdmin, useChatStudent, useGetSessions, useGetSessionMessages } from "@/src/services/hooks/hookChat";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    CircularProgress,
    Container,
    TextareaAutosize,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";

const MotionBox = motion(Box);

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function ChatComponent() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text: "Xin chào, tôi là trợ lý ảo của trường Đại học Văn Lang. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
    },
  ]);
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { postChatStudent } = useChatStudent();
  const { postChatAdmin } = useChatAdmin();
  const { sessions, getSessions } = useGetSessions();
  const { getSessionMessages } = useGetSessionMessages();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      getSessions();
    }
  }, []);

  const handleSessionSelect = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsDrawerOpen(false);
    try {
      const res = await getSessionMessages(sessionId);
      if (res && res.data) {
        const msgs: Message[] = [];
        res.data.forEach((m: any) => {
          msgs.push({ text: m.question, sender: "user" });
          msgs.push({ text: m.answer, sender: "bot" });
        });
        if (msgs.length === 0) {
          setChatMessages([{ text: "Xin chào, tôi là trợ lý ảo của trường Đại học Văn Lang. Tôi có thể giúp gì cho bạn?", sender: "bot" }]);
        } else {
          setChatMessages(msgs);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setChatMessages([
      {
        text: "Xin chào, tôi là trợ lý ảo của trường Đại học Văn Lang. Tôi có thể giúp gì cho bạn?",
        sender: "bot",
      },
    ]);
    setIsDrawerOpen(false);
  };

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setChatMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
    setInputText("");
    setLoading(true);

    try {
      let res;
      const token = Cookies.get("access_token");
      const payload = currentSessionId ? { question: trimmed, session_id: currentSessionId } : { question: trimmed };
      
      if (token) {
        res = await postChatStudent(payload);
      } else {
        res = await postChatAdmin(payload);
      }

      if (res.data.session_id && !currentSessionId) {
        setCurrentSessionId(res.data.session_id);
        if (token) {
          getSessions(); // Refresh list
        }
      }

      setChatMessages((prev) => [
        ...prev,
        { text: res.data.answer, sender: "bot" },
      ]);
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
      setChatMessages((prev) => [
        ...prev,
        { text: "Lỗi khi gửi tin nhắn.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      
      {/* Nút mở Menu */}
      <IconButton 
        onClick={() => setIsDrawerOpen(true)}
        sx={{ position: "fixed", top: 80, left: 16, zIndex: 10, bgcolor: "rgba(255,255,255,0.8)" }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, bgcolor: "#1e1e1e", color: "#fff" } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333" }}>
          <Typography variant="h6">Lịch sử Chat</Typography>
          <IconButton onClick={handleNewChat} sx={{ color: "#fff" }}>
            <AddIcon />
          </IconButton>
        </Box>
        <List sx={{ overflowY: "auto" }}>
          {sessions?.data?.map((session: any) => (
            <ListItem disablePadding key={session.id}>
              <ListItemButton 
                selected={session.id === currentSessionId}
                onClick={() => handleSessionSelect(session.id)}
                sx={{
                  "&.Mui-selected": { bgcolor: alpha("#C1272D", 0.5) },
                  "&.Mui-selected:hover": { bgcolor: alpha("#C1272D", 0.7) },
                }}
              >
                <ListItemText 
                  primary={session.title} 
                  primaryTypographyProps={{ noWrap: true, fontSize: 14 }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container
        maxWidth="xl"
        sx={{
          pt: "80px", 
          pb: "100px", 
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            width: { xs: "90vw", sm: 500, md: 1400 },
            minHeight: "calc(100vh - 64px - 120px)",
            bgcolor: (theme) => alpha(theme.palette.grey[600], 0.6),
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box sx={{ flex: 1, p: 2 }}>
            {chatMessages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: m.sender === "user" ? "#C1272D" : "#C4C4C4",
                    color: m.sender === "user" ? "#fff" : "#000",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.8 }}>
                    {m.sender === "user" ? "You" : "Bot"}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>{m.text}</Typography>
                </Box>
              </Box>
            ))}

            {loading && (
              <Box sx={{ width: 80, borderRadius: 2, bgcolor: "#C4C4C4", px: 2, py: 1 }}>
                <LoadingDots />
              </Box>
            )}
            <div ref={bottomRef} />
          </Box>
        </MotionBox>
      </Container>

      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "90vw", sm: 500, md: 1400 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          bgcolor: "#fff",
          borderRadius: 2,
          backdropFilter: "blur(10px)",
          zIndex: 3,
        }}
      >
        <TextareaAutosize
          ref={inputRef}
          placeholder="Nhập câu hỏi của bạn..."
          style={{
            flex: 1,
            minHeight: 24,
            maxHeight: 96,
            borderRadius: 8,
            padding: 8,
            resize: "none",
            outline: "none",
            fontSize: 14,
            fontFamily: "inherit",
            color: "black",
          }}
          minRows={1}
          maxRows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={() => !loading && handleSend()}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#77777" }} />
          ) : (
            <SendIcon sx={{ color: "#77777" }} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
