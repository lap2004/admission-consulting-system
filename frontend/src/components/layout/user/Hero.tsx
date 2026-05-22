"use client";

import { Box, Button, Card, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";

export default function VideoHero() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: "#D9D9D9" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 6, md: 4 },
          py: { xs: 2, md: 4 },
          mt: 8,
          maxWidth: {md:1440},
          mx: "auto",
          px: { xs: 2, md: 4 },
        }}
      >
        <Card
          sx={{
            position: "relative",
            width: { xs: "100%", md: "60%" },
            pt: { xs: "56.25%", md: "34%" }, 
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/DJhS895ambk"
            title="Van Lang video"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </Card>

        <Box sx={{ flex: 1, mt: { xs: 0, md: 2 }, position: "relative" }}>
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: { xs: -60, md: 20 },
              right: { xs: 0, md: 0 },
              bgcolor: "#1F2251",
              color: "#F0DFA9",
              px: 3,
              py: 2,
              width: { xs: "80%", md: "120%" },
              fontWeight: 700,
              borderRadius: 2,
              fontSize: { xs: "0.6rem", md: "1.4rem" },
            }}
          >
            Văn Lang - nơi khơi nguồn tư duy sáng tạo, tạo đà cho những cải tiến đột phá. 
          </Typography>

          <Box
            sx={{
              mt: { xs: 2, md: 22 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
            }}
          >
            <Typography sx={{ xs: "0.6rem", md: "1.4rem" }}>
              Ngoài việc trang bị kiến thức và kỹ năng chuyên môn vững chắc, Văn Lang còn chú trọng
              nuôi dưỡng tư duy nghiên cứu cho người học, giúp họ nhạy bén với ý tưởng mới và sẵn
              sàng tạo ra những đột phá sáng tạo.
            </Typography>

            <Button onClick={() => router.push("https://www.vlu.edu.vn/about-us/history-milestone")} variant="text" sx={{ mt: 2 }}>
              <Box
                sx={{
                  bgcolor: "#B02E35",
                  color: "#fff",
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "end",
                  gap: 1,
                  transition: "transform .3s",
                  "&:hover": { transform: "translateY(-2px) scale(1.05)" },
                }}
              >
                <Typography fontWeight={600}>Tìm hiểu thêm về chúng tôi</Typography>
                <ArrowForwardIosIcon fontSize="small" />
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
