import React from 'react';
import { Alert, AlertTitle, Box, Collapse, IconButton, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useState } from 'react';

const ErrorDisplay = ({ error, onClose, severity = "error", showDetails = false }) => {
  const [showFullError, setShowFullError] = useState(false);

  if (!error) return null;

  let errorMessage = error;
  let errorDetails = null;
  let validationErrors = null;

  if (typeof error === 'object' && error.message) {
    errorMessage = error.message;
    errorDetails = {
      error: error.error,
      status: error.status,
      timestamp: error.timestamp,
      path: error.path
    };
    validationErrors = error.validationErrors;
  }

  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{ width: '100%', mb: 2 }}
      action={
        showDetails && errorDetails && (
          <IconButton
            aria-label="expand"
            size="small"
            onClick={() => setShowFullError(!showFullError)}
          >
            {showFullError ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )
      }
    >
      <AlertTitle>{severity === 'error' ? 'Error' : severity === 'warning' ? 'Warning' : 'Info'}</AlertTitle>

      {/* Main error message */}
      <Typography variant="body2">
        {errorMessage}
      </Typography>

      {/* Validation errors */}
      {validationErrors && Object.keys(validationErrors).length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Validation Issues:
          </Typography>
          {Object.entries(validationErrors).map(([field, message]) => (
            <Typography key={field} variant="body2" sx={{ ml: 2, fontSize: '0.8rem' }}>
              • {field}: {message}
            </Typography>
          ))}
        </Box>
      )}

      {/* Detailed error information */}
      {showDetails && errorDetails && (
        <Collapse in={showFullError}>
          <Box sx={{ mt: 2, p: 1, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
            <Typography variant="caption" component="pre" sx={{ fontSize: '0.7rem' }}>
              {JSON.stringify(errorDetails, null, 2)}
            </Typography>
          </Box>
        </Collapse>
      )}
    </Alert>
  );
};

export default ErrorDisplay;
