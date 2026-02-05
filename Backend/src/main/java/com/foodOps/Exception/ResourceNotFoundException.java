package com.foodOps.Exception;

public class ResourceNotFoundException extends RuntimeException {

    private String resourceType;
    private Long resourceId;
    
    public ResourceNotFoundException(String resourceType, Long resourceId) {
        super(String.format("%s with id %d not found", resourceType, resourceId));
        this.resourceType = resourceType;
        this.resourceId = resourceId;
    }
    
    public ResourceNotFoundException(String resourceType, String identifier) {
        super(String.format("%s with identifier '%s' not found", resourceType, identifier));
        this.resourceType = resourceType;
        this.resourceId = null;
    }
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getResourceType() {
        return resourceType;
    }

    public Long getResourceId() {
        return resourceId;
    }
}
