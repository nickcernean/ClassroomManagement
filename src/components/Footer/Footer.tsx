import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" spacing={5}>
          <Grid item  xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body2" color="text.secondary">
              I am Nicolae, a dedicated software engineer, willing to learn new technologies.
            </Typography>
          </Grid>
          
          <Grid item justifyContent="flex-end" xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Me
            </Typography>
            <Link href="https://github.com/nickcernean" color="inherit">
              <GitHub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nicolae-cernean/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <LinkedIn />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}