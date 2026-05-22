// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Stack,
//   Button,
//   Input,
//   Divider,
//   ButtonGroup,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import Header from "@/src/components/Header";


// const AdminDatabasePage = () => {
//   const [jsonType, setJsonType] = useState<"admissions" | "students" | "">("");

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !jsonType) {
//       toast.error("Vui lòng chọn loại dữ liệu và file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", jsonType);

//     try {
//       await api.post("/admin/upload-json", formData);
//       toast.success("Tải JSON thành công!");
//     } catch {
//       toast.error("Lỗi khi tải JSON");
//     }
//   };

//   const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await api.post("/admin/upload-pdf", formData);
//       toast.success("Tải PDF thành công!");
//     } catch {
//       toast.error("Lỗi khi tải PDF");
//     }
//   };

//   return (
//     <Box p={4}>
//       <Header />

//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Quản lý dữ liệu hệ thống
//       </Typography>

//       <Divider sx={{ my: 3 }} />

//       {/* Upload JSON */}
//       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Tải file JSON
//         </Typography>

//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           Bạn có thể thay thế dữ liệu của hệ thống bằng file admissions hoặc students (.json).
//         </Typography>

//         <Stack direction="row" spacing={2} alignItems="center" mt={2}>
//           <ButtonGroup variant="outlined" size="small">
//             <Button onClick={() => setJsonType("admissions")} color={jsonType === "admissions" ? "primary" : "inherit"}>
//               File Admissions
//             </Button>
//             <Button onClick={() => setJsonType("students")} color={jsonType === "students" ? "primary" : "inherit"}>
//               File Students
//             </Button>
//           </ButtonGroup>

//           <Input type="file" onChange={handleUpload} />
//         </Stack>
//       </Paper>

//       {/* Upload PDF */}
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Tải lên file PDF
//         </Typography>

//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           Tệp PDF sẽ được lưu vào thư mục hệ thống và sử dụng trong truy vấn dữ liệu.
//         </Typography>

//         <Stack direction="row" spacing={2} alignItems="center" mt={2}>
//           <Input type="file" onChange={handlePdfUpload} />
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default AdminDatabasePage;
