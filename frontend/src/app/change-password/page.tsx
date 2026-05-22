"use client";

import { useState, Suspense } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.warning("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!currentPassword) {
      toast.warning("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_DOMAIN}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Lỗi khi đổi mật khẩu.");
      }

      toast.success("Mật khẩu đã được thay đổi thành công.");
      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="xs" sx={{ textAlign: "center" }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" mb={3}>
              Đặt lại mật khẩu
            </Typography>
            {submitted ? (
              <>
                <Typography color="primary" mb={2}>
                  Mật khẩu của bạn đã được thay đổi. Bạn có thể đăng nhập lại.
                </Typography>
                <Button
                  variant="outlined"
                  href="/user/home" // hoặc '/login' tùy cấu trúc route của bạn
                >
                  Quay về trang chat
                </Button>
              </>
            ) : (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  type="password"
                  label="Mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  fullWidth
                  disabled={loading}
                />
                <Box sx={{ position: "relative" }}>
                  <TextField
                    type={showNewPassword ? "text" : "password"}
                    label="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      minWidth: "40px",
                      color: "grey.600",

                    }}
                    aria-label={showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </Box>

                <Box sx={{ position: "relative" }}>
                  <TextField
                    type={showConfirmPassword ? "text" : "password"}
                    label="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    disabled={loading}
                  />
                  <Button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        minWidth: "40px",
                        color: "grey.600",
                      }}
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : "Xác nhận đổi mật khẩu"}
                </Button>

                <Divider></Divider>
                <Typography
                variant="body2"
                align="center"
                sx={{
                  mt: 2,
                  color: "primary.main",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  '&:hover': { color: '#1F2251' }
                }}
                onClick={() => router.push("/user/home")}
              >
                <ArrowLeftIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
                Trang chủ
              </Typography>
              </Box>
            )}

          </Paper>
        </Container>
      </Box>
    </Suspense>
  );
}