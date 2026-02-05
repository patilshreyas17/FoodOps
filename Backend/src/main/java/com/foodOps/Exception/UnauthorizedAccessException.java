package com.foodOps.Exception;

public class UnauthorizedAccessException extends RuntimeException {

    private String requiredRole;
    private String currentRole;
    
    public UnauthorizedAccessException(String message) {
        super(message);
    }
    
    public UnauthorizedAccessException(String requiredRole, String currentRole) {
        super(String.format("Access denied. Required role: %s, Current role: %s", requiredRole, currentRole));
        this.requiredRole = requiredRole;
        this.currentRole = currentRole;
    }
    
    public UnauthorizedAccessException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getRequiredRole() {
        return requiredRole;
    }

    public String getCurrentRole() {
        return currentRole;
    }
}
