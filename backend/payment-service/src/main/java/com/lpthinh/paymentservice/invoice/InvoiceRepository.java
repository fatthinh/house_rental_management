package com.lpthinh.paymentservice.invoice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    @Query("SELECT agr FROM Invoice agr WHERE agr.serviceId = :serviceId")
    Invoice findByService(@Param("serviceId") Long serviceId);
}
