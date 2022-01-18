package com.javatechie.springbootapirest.repository;

import com.javatechie.springbootapirest.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Integer> {

    Product findByName( String name);
}
