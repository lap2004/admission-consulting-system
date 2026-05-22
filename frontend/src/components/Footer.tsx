import { Email, Phone } from "@mui/icons-material";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      id="footer"
      sx={{
        backgroundColor: "#131F32",
        color: "white",
        py: 5,
        mt: 8,
        width: "100%",
        zIndex: 1,
      }}
    >
      <Container sx={{ maxWidth: { md: 1440 } }}>
        <Grid container spacing={4} justifyContent="space-between">

          <Grid item xs={12} md={3}>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Về Chúng Tôi
            </Typography>
            <Stack spacing={1} mt={1}>
              {["Tin tức", "Sự Kiện", "Blog", "Tuyển Dụng"].map((item, idx) => (
                <Link
                  href="#"
                  underline="none"
                  color="inherit"
                  className="font-light"
                  key={idx}
                  position={"relative"}
                >
                  <Typography
                    component="p"
                    variant="body2"
                    className="font-light"
                    color="grey"
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      ":hover": { color: "white" },

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: "2px",
                        backgroundColor: "primary.main",
                        transition: "width .3s ease-in-out",
                      },

                      "&:hover::after": {
                        color: "white",
                        width: "100%",
                      },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Helpful Links
            </Typography>
            <Stack spacing={1} mt={1}>
              {[
                "Services",
                "Supports",
                "Terms & Condition",
                "Privacy Policy",
              ].map((item) => (
                <Link
                  href="#"
                  underline="none"
                  color="inherit"
                  className="font-light"
                  key={item}
                  position={"relative"}
                >
                  <Typography
                    component="p"
                    variant="body2"
                    className="font-light"
                    color="grey"
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      ":hover": { color: "white" },

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: "2px",
                        backgroundColor: "primary.main",
                        transition: "width .3s ease-in-out",
                      },

                      "&:hover::after": {
                        color: "white",
                        width: "100%",
                      },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Contact Us
            </Typography>

            <Stack
              className="font-light text-amber-700"
              direction="row"
              alignItems="center"
              spacing={1}
              mt={1}
            >
              <Phone fontSize="small" />
              <Typography>+028.7105 9999</Typography>
            </Stack>

            <Stack
              className="font-light text-amber-700"
              direction="row"
              alignItems="center"
              spacing={1}
              mt={1}
            >
              <Email fontSize="small" />
              <Typography>info@vlu.edu.vn</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box
          mt={5}
          pt={2}
          borderTop="1px solid #ccc"
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography variant="body2">
            ©2025 | Van Lang University{" "}
          </Typography>
          <Stack direction="row" spacing={3}>
            {["FAQ", "Privacy", "Terms & Condition"].map((item) => (
              <Link href="#" underline="none" color="inherit" key={item}>
                <Typography variant="body2" className="font-light">
                  {item}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
