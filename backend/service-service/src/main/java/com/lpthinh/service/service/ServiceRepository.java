package com.lpthinh.service.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    @Query("SELECT s FROM Service s WHERE s.agreementId = :agreementId")
    List<Service> findByAgreementId(@Param("agreementId") Integer agreementId);

    @Query("SELECT s FROM Service s WHERE s.category = :category")
    List<Service> findByCategoryId(@Param("category") Integer category);
}
