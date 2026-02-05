export const handleApiError = (error) => {
  if (error.response) {
    const errorData = error.response.data;

    if (errorData.message && errorData.error && errorData.status) {
      return {
        message: errorData.message,
        error: errorData.error,
        status: errorData.status,
        timestamp: errorData.timestamp,
        path: errorData.path,
        validationErrors: errorData.validationErrors,
        isBackendError: true
      };
    }

    if (errorData.message) {
      return {
        message: errorData.message,
        status: error.response.status,
        isBackendError: true
      };
    }

    return {
      message: `Server error: ${error.response.status}`,
      status: error.response.status,
      isBackendError: true
    };
  } else if (error.request) {
    return {
      message: "Network error. Please check your internet connection.",
      isNetworkError: true
    };
  } else {
    return {
      message: error.message || "An unexpected error occurred",
      isClientError: true
    };
  }
};

export const getErrorMessage = (error) => {
  const handledError = handleApiError(error);

  if (handledError.isBackendError) {
    if (handledError.validationErrors) {
      const validationMessages = Object.values(handledError.validationErrors);
      return validationMessages.join(', ') || handledError.message;
    }

    switch (handledError.error) {
      case 'Authentication Failed':
        return 'Invalid email or password. Please try again.';
      case 'Access Denied':
        return 'You do not have permission to perform this action.';
      case 'Validation Error':
        return handledError.message;
      case 'Resource Not Found':
        return 'The requested resource was not found.';
      case 'Payment Error':
        return 'Payment processing failed. Please try again.';
      default:
        return handledError.message;
    }
  }

  if (handledError.isNetworkError) {
    return 'Network connection failed. Please check your internet and try again.';
  }

  return handledError.message;
};

export const isAuthError = (error) => {
  const handledError = handleApiError(error);
  return handledError.status === 401 || handledError.error === 'Authentication Failed';
};

export const isValidationError = (error) => {
  const handledError = handleApiError(error);
  return handledError.error === 'Validation Error' || handledError.validationErrors;
};

export const isAuthzError = (error) => {
  const handledError = handleApiError(error);
  return handledError.status === 403 || handledError.error === 'Access Denied';
};

export const isNotFoundError = (error) => {
  const handledError = handleApiError(error);
  return handledError.status === 404 || handledError.error === 'Resource Not Found';
};

export const getValidationErrors = (error) => {
  const handledError = handleApiError(error);
  return handledError.validationErrors || {};
};
