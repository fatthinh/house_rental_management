package com.lpthinh.rentalservice.agreement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AgreementRepository extends JpaRepository<Agreement, Integer> {

    @Query("SELECT agr FROM Agreement agr WHERE agr.houseId = :houseId")
    Agreement findByHouseId(@Param("houseId") Integer houseId);

    @Query("SELECT agr FROM Agreement agr WHERE agr.state = :state")
    List<Agreement> findByState(@Param("state") AgreementState state);
}
