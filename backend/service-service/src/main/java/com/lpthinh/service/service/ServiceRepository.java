package com.lpthinh.service.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    @Query("SELECT s FROM Service s WHERE s.invoiceId = :invoiceId")
    List<Service> findByInvoiceId(@Param("invoiceId") Long invoiceId);
}
