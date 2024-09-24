package com.lpthinh.houseservice.house;

import com.lpthinh.houseservice.exception.HouseNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HouseService {
    private final HouseRepository repository;
    private final HouseMapper mapper;

    public Integer create(
            HouseRequest request
    ) {
        var house = mapper.toHouse(request);
        house.setState(HouseState.AVAILABLE);

        return this.repository.save(house).getId();
    }

    public List<HouseResponse> findAll() {
        return this.repository
                .findAll()
                .stream()
                .map(mapper::toHouseResponse)
                .collect(Collectors.toList());
    }

    public List<HouseResponse> findByState(String state) {
        return this.repository
                .findAll()
                .stream()
                .filter(item -> item.getState().equals(HouseState.valueOf(state.toUpperCase())))
                .map(mapper::toHouseResponse)
                .collect(Collectors.toList());
    }

    public HouseResponse findById(Integer id) {
        return this.repository.findById(id)
                .stream()
                .map(mapper::toHouseResponse)
                .findFirst().orElseThrow(() -> new HouseNotFoundException("House not found with ID:: " + id));
    }

    public void changeState(String newState, Integer id) {
        House house = this.repository.findById(id)
                .orElseThrow(() -> new HouseNotFoundException("House not found with id " + id));
        house.setState(HouseState.valueOf(newState.toUpperCase()));
        this.repository.save(house);
    }

    public void update(HouseRequest request) {
        var house = this.repository
                .findById(request.id())
                .orElseThrow(() -> new HouseNotFoundException(String.format("Cannot update house:: No house found with the provided ID: %s", request.id())));
        mergeHouse(house, request);
        this.repository.save(house);
    }

    public void delete(Integer id) {
        this.repository.deleteById(id);
    }

    private void mergeHouse(House house, HouseRequest request) {
        if (StringUtils.isNotBlank(request.name()))
            house.setName(request.name());
        if (request.price() != null)
            house.setPrice(request.price());
    }
}
