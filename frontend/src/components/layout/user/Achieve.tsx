import { Box, Grid, Typography } from '@mui/material';
import { motion } from "framer-motion";

const achievementsData = [
    { value: "145.000+", desc: ["người học lựa chọn"], color: "#F0B428", },
    { value: "60", desc: ["ngành đào tạo đại học", "cho phép sinh viên linh", "hoạt lựa chọn",], color: "#F0B428", },
    { value: "400+", desc: ["bài công bố khoa học", "cùng nhiều dự án nghiên", "cứu hướng đến giải quyết", "các vấn đề của xã hội",], color: "#F0B428", },
]

export default function Achieve() {
    return (
        <Box sx={{ bgcolor: "#151C4A", py: { xs: 6, md: 8 } }}>
            <Box sx={{ maxWidth: { md: 1440 }, mx: "auto", px: { xs: 2, md: 4 } }}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                    color="#F0B428"
                    textAlign="center"
                    mb={5}
                    sx={{ fontSize: { xs: "1.4rem", md: "1.75rem" } }}
                >
                    Thành tựu nổi bật
                </Typography>

                <Grid container spacing={4}>
                    {achievementsData.map((a, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <motion.div
                                aria-label={`achievement-${i}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Box
                                    sx={{
                                        p: 4,
                                        textAlign: "center",
                                        borderRadius: 3,
                                        bgcolor: "rgba(255,255,255,.06)",
                                        backdropFilter: "blur(6px)",
                                        transition: "box-shadow .35s, transform .35s",
                                        "&:hover": {
                                            boxShadow: "0 8px 20px #F0B42855",
                                            transform: "translateY(-6px)",
                                        },
                                    }}
                                >

                                    <Typography
                                        variant="h3"
                                        fontWeight={800}
                                        sx={{
                                            color: a.color,
                                            mb: 1,
                                            lineHeight: 1,
                                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                                        }}
                                    >
                                        {a.value}
                                    </Typography>

                                    {a.desc.map((line, idx) => (
                                        <Typography
                                            key={idx}
                                            color="#FFFFFF"
                                            sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
                                        >
                                            {line}
                                        </Typography>
                                    ))}
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
