package com.lpthinh.rentalservice.agreement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AgreementRepository extends JpaRepository<Agreement, Integer> {
    List<Agreement> findAllByIdInOrderByDate(List<LocalDateTime> createdDate);

}
