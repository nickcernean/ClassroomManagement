import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      className="mt-screen"
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.secondary.dark
            : theme.palette.grey[400],
        p: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="common.white" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body2" color="common.white">
              I am Nicolae, a dedicated software engineer, willing to learn new
              technologies.
            </Typography>
          </Grid>

          <Grid item justifyContent="flex-end" xs={12} sm={4}>
            <Typography variant="h6" color="common.white" gutterBottom>
              Follow Me
            </Typography>
            <Link href="https://github.com/nickcernean" color="common.white">
              <GitHub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nicolae-cernean/"
              color="common.white"
              sx={{ pl: 1, pr: 1 }}
            >
              <LinkedIn />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
