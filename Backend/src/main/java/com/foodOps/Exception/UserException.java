package com.foodOps.Exception;

public class UserException extends RuntimeException {

	private String errorCode;

	public UserException(String message) {
		super(message);
	}

	public UserException(String message, String errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public UserException(String message, Throwable cause) {
		super(message, cause);
	}

	public UserException(String message, String errorCode, Throwable cause) {
		super(message, cause);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}
}
