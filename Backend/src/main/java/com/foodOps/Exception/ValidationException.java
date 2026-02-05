package com.foodOps.Exception;

public class ValidationException extends RuntimeException {

    private String field;
    private Object rejectedValue;
    
    public ValidationException(String message) {
        super(message);
    }
    
    public ValidationException(String field, String message, Object rejectedValue) {
        super(String.format("Validation failed for field '%s': %s", field, message));
        this.field = field;
        this.rejectedValue = rejectedValue;
    }
    
    public ValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getField() {
        return field;
    }

    public Object getRejectedValue() {
        return rejectedValue;
    }
}
