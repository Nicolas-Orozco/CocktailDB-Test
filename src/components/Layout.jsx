import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import GitHubIcon from "@mui/icons-material/GitHub";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

function Layout({ switcher, children }) {
  const breakMedium = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const breakSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <>
      <header>
        <Box sx={{ mb: 9 }}>
          <AppBar>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <Toolbar>
                <Typography variant="h6" component="h1">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocalBarIcon />
                    {breakSmall && "CocktailDb Test"}
                    {switcher}
                    <Button variant="contained" component={RouterLink} to="/">
                      Home
                    </Button>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/cocktails"
                    >
                      Cocktails
                    </Button>
                  </Stack>
                </Typography>
              </Toolbar>
              <Toolbar>
                <Typography variant="h6" component="h2">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Link
                      href="https://github.com/"
                      underline="always"
                      color="inherit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon
                        titleAccess="Github Repo"
                        role="img"
                        sx={{ verticalAlign: "sub" }}
                      />
                      {breakMedium && " Github Repo"}
                    </Link>
                  </Stack>
                </Typography>
              </Toolbar>
            </Stack>
          </AppBar>
        </Box>
      </header>
      <main>
        <Box sx={{ maxWidth: "lg", mx: "auto", p: 2 }}>{children}</Box>
      </main>
    </>
  );
}
Layout.propTypes = {
  switcher: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};
export default Layout;
