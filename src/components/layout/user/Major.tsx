import { Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const majors = [
    { title: "THIẾT KẾ", icon: "/mt.jpg" },
    { title: "LUẬT - KINH DOANH & QUẢN LÝ", icon: "/kte.jpg" },
    { title: "TRUYỀN THÔNG", icon: "/chnv.jpg" },
    { title: "XÃ HỘI NHÂN VĂN - NGÔN NGỮ", icon: "/chnv.jpg" },
    { title: "CÔNG NGHỆ - KỸ THUẬT", icon: "/cn.jpg" },
    { title: "KIẾN TRÚC", icon: "/kt.jpg" },
    { title: "KHOA HỌC SỨC KHỎE", icon: "/yt.jpg" },
    { title: "NGHỆ THUẬT", icon: "/mt.jpg" },
    { title: "DU LỊCH", icon: "/dl.jpg" },
];

export default function Major() {
    const router = useRouter();
    return (
        <Grid
            container
            spacing={3}
            sx={{
                maxWidth: { md: 1440 },
                // mx: "auto",
                px: { xs: 2, md: 4 },
            }}
        >
            {majors.map((m, i) => (
                <Grid item xs={12} sm={6} md={4} key={m.title}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: i * 0.05 }}
                    >
                        <Link onClick={()=> router.push('https://tuyensinh.vlu.edu.vn/nganh-tuyen-sinh')} sx={{ textDecoration: "none" }}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 2,
                                    transition: "transform .3s",
                                    "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={m.icon}
                                    alt={m.title}
                                    sx={{
                                        width: { xs: 60, md: 80 },
                                        height: { xs: 60, md: 80 },
                                        p: 2,
                                    }}
                                />
                                <CardContent sx={{ textAlign: "center", py: { xs: 1, md: 2 } }}>
                                    <Typography
                                        fontWeight="bold"
                                        sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
                                    >
                                        {m.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>

                    </motion.div>
                </Grid>
            ))}
        </Grid>
    );
};

