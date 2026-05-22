"use client";

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { ROLE_VALUE } from "@/src/config/const";
import { getUserRole } from "@/src/lib/helper";
import { setAuthCookies } from "@/src/lib/helper/token";
import { useUserLogin } from "@/src/services/hooks/hookAuth";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { postUserLogin } = useUserLogin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await postUserLogin({
        email: form.email,
        password: form.password,
      });

      console.log(res.data);
      console.log(res.data.force_password_change)
      if (res?.data?.access_token) {
        setAuthCookies(res.data.access_token, res.data.refresh_token);
        Cookies.set(ROLE_VALUE, res.data.role);

        const savedRole = getUserRole();

        if (res.data.force_password_change === true) {
          router.push("/change-password");
          toast.info("Bạn đang sử dụng mật khẩu tạm thời. Vui lòng đổi mật khẩu.");
          return;
        }

        toast.success("Đăng nhập thành công!");

        if (savedRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.data?.detail || "Đăng nhập thất bại!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Đăng nhập thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" align="center" fontWeight={600}>
              Đăng nhập
            </Typography>

            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                placeholder="nguyenvana@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "55%",
                    transform: "translateY(-50%)",
                    minWidth: "40px",
                    color: "grey.600",

                  }}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </Button>
              </Box>

              <FormControlLabel
                control={<Checkbox />}
                label="Ghi nhớ đăng nhập"
                sx={{ mt: 1 }}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  disabled={isloading}
                  onClick={handleLogin}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-300 ${isloading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isloading ? "Đang đăng nhập..." : "Đăng Nhập"}
                </button>
              </motion.div>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
                onClick={() => router.push("/forgot-password")}
              >
                Quên mật khẩu?
              </Typography>

              <Divider sx={{ my: 3 }}>hoặc</Divider>

              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const idToken = credentialResponse.credential;
                    if (!idToken) {
                      toast.error("Không lấy được token từ Google!");
                      return;
                    }

                    try {
                      const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BACKEND_DOMAIN}/auth/google`,
                        { id_token: idToken }
                      );

                      const data = res.data;

                      if (data?.access_token) {
                        setAuthCookies(data.access_token); // ✅ Không cần refresh_token
                        Cookies.set(ROLE_VALUE, data.role); // Lưu role

                        toast.success("Đăng nhập Google thành công!");

                        // ✅ Delay nhẹ để đảm bảo cookie đã được set
                        setTimeout(() => {
                          const role = getUserRole();

                          if (data.force_password_change === true) {
                            router.push("/change-password");
                          } else if (role === "admin") {
                            router.push("/admin/dashboard");
                          } else {
                            router.push("/");
                          }
                        }, 100);
                      } else {
                        toast.error("Không lấy được access_token từ server!");
                      }
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                      toast.error(error?.response?.data?.detail || "Lỗi xác thực Google");
                    }
                  }}
                  onError={() => toast.error("Đăng nhập Google thất bại")}

                />
              </Box>
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Bạn chưa có tài khoản?{" "}
                <Box
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                  onClick={() => router.push("/register")}
                >
                  Đăng ký ngay
                </Box>
              </Typography>
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
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;