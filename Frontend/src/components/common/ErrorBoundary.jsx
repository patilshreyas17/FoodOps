import React from 'react';
import { Box, Typography, Button, Paper, Alert, AlertTitle } from '@mui/material';
import { Refresh, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 3,
            bgcolor: 'background.default'
          }}
        >
          <Paper
            sx={{
              p: 4,
              maxWidth: 600,
              textAlign: 'center',
              bgcolor: 'background.paper'
            }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Something went wrong!</AlertTitle>
              We encountered an unexpected error. This has been logged and we'll look into it.
            </Alert>

            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
              Application Error
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              {this.state.error && this.state.error.toString()}
            </Typography>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'left' }}>
                  Error Details:
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    textAlign: 'left',
                    maxHeight: 200,
                    overflow: 'auto'
                  }}
                >
                  <pre style={{ fontSize: '0.8rem', margin: 0 }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </Paper>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={() => window.location.reload()}
                sx={{ minWidth: 120 }}
              >
                Reload Page
              </Button>
              <ErrorBoundaryActions />
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryActions = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<Home />}
      onClick={() => navigate('/')}
      sx={{ minWidth: 120 }}
    >
      Go Home
    </Button>
  );
};

export default ErrorBoundary;
