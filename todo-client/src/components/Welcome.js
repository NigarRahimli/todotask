import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Welcome() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 1,
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h3" gutterBottom>
            Welcome to Todo App
          </Typography>
          <Typography component="p" variant="h6" sx={{ mb: 4 }}>
            Manage your tasks efficiently and effectively.
          </Typography>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
