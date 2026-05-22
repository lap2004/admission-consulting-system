import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import Link from "next/link";

const newsData = [
  {
    title:
      "Trường Đại học Văn Lang nhận hồ sơ thi đánh giá năng lực V‑SAT năm 2025",
    date: "2025-04-21",
    source: "Phòng Tuyển sinh & Truyền thông",
    image: "https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F16_5_18109442f0.jpg&w=1920&q=75",
  },
  {
    title: "Trường ĐH Văn Lang nhận hồ sơ xét duyệt học bổng tài năng 2025",
    date: "2025-04-21",
    source: "Phòng Tuyển sinh & Truyền thông",
    image: "https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2Fvlu_thong_bao_nhan_ho_so_xet_duyet_hoc_bong_tai_nang_nam_2025_cover_d71b2c301f.jpg&w=1920&q=75",
  },
  {
    title: "Thông tin tuyển sinh 2025 của Trường Đại học Văn Lang",
    date: "2025-04-21",
    source: "Phòng Tuyển sinh & Truyền thông",
    image: "https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2Fvlu_chinh_thuc_thong_tin_tuyen_sinh_2025_cover_3_d811772e03.jpg&w=1920&q=75",
  },
];

export default function News() {
  return (
    <Box sx={{ maxWidth: { md: 1440 }, mx: "auto", px: { xs: 2, md: 4 }, my: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.4rem", md: "1.75rem" } }}
        >
          Tin tức nổi bật
        </Typography>

        <Button
          href="https://tuyensinh.vlu.edu.vn/tin-tuc"
          target="_blank"
          variant="contained"
          sx={{
            bgcolor: "#1f224d",
            borderRadius: 4,
            px: 3,
            textTransform: "none",
            "&:hover": { bgcolor: "#2a2e6a" },
            display: "flex",
            gap: 1,
            fontSize: { xs: "0.8rem", md: "0.875rem" },
          }}
        >
          Xem toàn bộ tin tức
          <ArrowForwardIcon sx={{ color: "#d91f36", fontSize: { xs: 18, md: 20 } }} />
        </Button>
      </Box>

      <Grid container spacing={3}>
        {newsData.map((n, idx) => (
          <Grid item xs={12} md={6} lg={4} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
            >
              <Link
                href="https://tuyensinh.vlu.edu.vn/nganh-tuyen-sinh"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    transition: ".3s",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={n.image}
                    alt={n.title}
                    sx={{
                      height: { xs: 160, md: 180 },
                      objectFit: "cover",
                    }}
                  />

                  <CardContent>
                    <Typography
                      fontWeight="bold"
                      gutterBottom
                      sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                    >
                      {n.title.length > 50
                        ? `${n.title.slice(0, 50)}…`
                        : n.title}

                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                    >
                      <Typography color="text.secondary">{n.source}</Typography>
                      <Typography color="text.secondary">{n.date}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

