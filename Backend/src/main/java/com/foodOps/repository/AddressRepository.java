package com.foodOps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodOps.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
