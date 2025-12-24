package com.foodOps.service;

import com.foodOps.Exceptions.UserException;
import com.foodOps.model.User;
import jdk.jshell.spi.ExecutionControl;

public interface UserService {
    public User findUserProfileByJwt(String jwt) throws UserException;

    public User findUserByEmail(String email) throws UserException;

}
