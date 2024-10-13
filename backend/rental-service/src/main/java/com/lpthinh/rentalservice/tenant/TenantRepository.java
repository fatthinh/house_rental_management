package com.lpthinh.rentalservice.tenant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TenantRepository extends JpaRepository<Tenant, String> {

    @Query("SELECT tenant FROM Tenant tenant WHERE LOWER(tenant.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Tenant> findByName(@Param("name") String name);
}
