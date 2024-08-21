package com.lpthinh.houseservice.house;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HouseRepository extends JpaRepository<House, Integer> {
    List<House> findAllByIdInOrderById(List<Integer> ids);
}
