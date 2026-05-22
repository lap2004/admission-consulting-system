import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const trainingItems = [
  {
    thumb: "/DH.webp",
    tag: "CHƯƠNG TRÌNH ĐẠI HỌC",
    title:
      "Chương trình toàn diện giúp hình thành và đẩy mạnh tư duy nghiên cứu ở người học, trang bị các kỹ năng hữu ích để phát triển sự nghiệp tương lai.",
    href: "https://www.vlu.edu.vn/academics#ungraduate_programs_content",
  },
  {
    thumb: "/SDH.webp",
    tag: "CHƯƠNG TRÌNH SAU ĐẠI HỌC",
    title:
      "Chương trình đào tạo nâng cao, cung cấp tài nguyên học thuật và nghiên cứu phong phú để giúp người học tìm tòi sâu hơn vào lĩnh vực mong muốn.",
    href: "https://www.vlu.edu.vn/academics#graduate_programs_content",
  },
  {
    thumb: "/LKQT.webp",
    tag: "CHƯƠNG TRÌNH LIÊN KẾT QUỐC TẾ",
    title:
      "Chương trình tạo cơ hội cho người học nhận bằng cấp từ các đại học hàng đầu thế giới và có thêm trải nghiệm với tư cách một công dân toàn cầu.",
    href: "https://www.vlu.edu.vn/academics#international_programs_content",
  },
];

export default function RoadPath() {
  return (
    <Box sx={{ my: 8 }}>
      <Box
        sx={{
          maxWidth: { md: 1440 },
          mx: "auto",
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          sx={{ fontSize: { xs: "1.6rem", md: "2.125rem" } }}
        >
          Chương trình đào tạo
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="space-around"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Cột ảnh chính */}
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ overflow: "hidden", borderRadius: 12 }}
            >
              <Link href="https://www.vlu.edu.vn/admissions/program/tuyen-sinh-dai-hoc">
                <Image
                  src="/phan2.png"
                  alt="Chương trình Đại học"
                  width={1000}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            </motion.div>
          </Grid>

          {/* Danh sách chương trình */}
          <Grid item xs={12} md={6}>
            {trainingItems.map((it, idx) => (
              <Link key={idx} href={it.href} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ overflow: "hidden" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      py: 2,
                      borderBottom:
                        idx !== trainingItems.length - 1
                          ? "1px solid #e0e0e0"
                          : "none",
                    }}
                  >
                    <Image
                      src={it.thumb}
                      alt={it.title}
                      width={160}
                      height={96}
                      sizes="(max-width:768px) 40vw, 160px"
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />

                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#C1272D",
                          fontWeight: 700,
                          fontSize: { xs: "0.7rem", md: "0.8rem" },
                        }}
                      >
                        {it.tag}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#000",
                          fontWeight: 600,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        {it.title.length > 90
                          ? `${it.title.slice(0, 87)}…`
                          : it.title}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
