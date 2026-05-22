// "use client";

// import { useEffect, useState } from "react";
// //import { api } from "@/src/lib/axios";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { Container, Typography, Button, Box, CircularProgress } from "@mui/material";

// interface User {
//   id: string;
//   email: string;
//   full_name: string;
//   role: string;
//   created_at: string;
// }

// export default function ProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Kiểm tra token và lấy thông tin user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/users/protected");
//         setUser(res.data);
//       } catch (err) {
//         toast.error("⚠️ Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
//         localStorage.removeItem("access_token");
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Đăng xuất
//   const handleLogout = async () => {
//     localStorage.removeItem("access_token");
//     toast.success(" Đã đăng xuất");
//     router.push("/login");
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
//         <CircularProgress />
//         <Typography mt={2}>Đang tải thông tin người dùng...</Typography>
//       </Container>
//     );
//   }

//   if (!user) return null;

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Xin chào, {user.full_name || "Người dùng"}
//       </Typography>
//       <Typography>Email: {user.email}</Typography>
//       <Typography>Vai trò: {user.role}</Typography>
//       <Typography>Ngày tạo tài khoản: {new Date(user.created_at).toLocaleString()}</Typography>

//       <Box mt={4}>
//         <Button variant="contained" color="error" onClick={handleLogout}>
//           Đăng xuất
//         </Button>
//       </Box>
//     </Container>
//   );
// }
