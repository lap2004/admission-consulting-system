"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);

export default function NewSection() {
    // const scrollToContact = () => {
    //     const contactSection = document.getElementById('footer');
    //     if (contactSection) {
    //         contactSection.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
            }}
        >

            {/* vid va backdrop */}
            <Box

                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -2,
                    pointerEvents: "none",
                    overflow: "hidden",

                }}
            >
                <video
                    src="/testVideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}

                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: alpha("#000", 0.5),
                    }}
                />
            </Box>

            {/* noi dung */}
            <Container maxWidth="lg">
                <Grid container alignItems="center">
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Box sx={{ mt: { xs: 8, md: -10 } }}>
                            <Typography
                                component="span"
                                sx={{
                                    display: "inline-block",
                                    py: 1,
                                    px: 3,
                                    mb: 4,
                                    borderRadius: 999,
                                    fontWeight: 600,
                                    bgcolor: "rgba(98,99,255,.20)",
                                    color: "#6263FF",
                                    fontSize: "0.95rem",
                                }}
                            >
                                Tuyển sinh
                            </Typography>

                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 6,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    lineHeight: 1.2,
                                    fontSize: { xs: "2rem", md: "3rem" },
                                    backgroundImage: "linear-gradient(to right, #f5f5f5, #e2e2e2)",
                                    color: "transparent",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                VLU CHATBOT
                                <br />
                                Trợ lý thông minh của Đại Học Văn Lang
                            </Typography>

                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <Button
                                    component={Link}
                                    href="/tu-van"
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#6263FF",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { bgcolor: "#4C50DE" },
                                    }}
                                >
                                    Chat ngay với VLU CHATBOT
                                </Button>
                                <Button
                                    component={Link}
                                    href="https://www.vlu.edu.vn/about-us/history-milestone"
                                    variant="outlined"
                                    sx={{
                                        borderColor: "#6263FF",
                                        color: "#6263FF",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": {
                                            bgcolor: "rgba(98,99,255,.1)",
                                            borderColor: "#4C50DE",
                                        },
                                    }}
                                >
                                    TÌM HIỂU VỀ CHÚNG TÔI
                                </Button>

                                {/* <Button
                                    // component={Link}
                                    onClick={scrollToContact}
                                    variant="outlined"
                                    sx={{
                                        borderColor: "#6263FF",
                                        color: "#6263FF",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": {
                                            bgcolor: "rgba(98,99,255,.1)",
                                            borderColor: "#4C50DE",
                                        },
                                    }}
                                >
                                    TEST
                                </Button> */}

                            </Box>
                        </Box>
                    </MotionBox>
                </Grid>
            </Container>
        </Box>
    );
}
