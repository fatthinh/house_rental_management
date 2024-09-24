package com.lpthinh.service.category;

import com.lpthinh.service.exception.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;
    private final CategoryMapper mapper;

    public Integer create(CategoryRequest request) {
        var category = mapper.toCategory(request);
        return this.repository.save(category).getId();
    }

    public List<CategoryResponse> findAll() {
        return this.repository
                .findAll()
                .stream()
                .map(mapper::toCategoryResponse)
                .collect(Collectors.toList());
    }

    public CategoryResponse findById(Integer id) {
        return this.repository
                .findById(id)
                .stream()
                .map(mapper::toCategoryResponse)
                .findFirst()
                .orElseThrow(() -> new CategoryNotFoundException("Service not found with ID:: " + id));
    }

    public void update(CategoryRequest request) {
        var category = this.repository
                .findById(request.id())
                .orElseThrow(() -> new CategoryNotFoundException(String.format("Cannot update category:: No category found with the provided ID: %s", request.id())));
        mergeService(category, request);
        this.repository.save(category);
    }

    public void delete(Integer id) {
        this.repository.deleteById(id);
    }

    private void mergeService(Category category, CategoryRequest request) {
        if (StringUtils.isNotBlank(request.name())) {
            category.setName(request.name());
        }
        if (request.price() != null) {
            category.setPrice(request.price());
        }
        if (request.quantityPerUnit() != null) {
            category.setQuantityPerUnit(request.quantityPerUnit());
        }
        if (StringUtils.isNotBlank(request.unit())) {
            category.setUnit(request.unit());
        }
    }
}