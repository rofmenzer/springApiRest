package com.javatechie.springbootapirest.service;

import com.javatechie.springbootapirest.entity.Product;
import com.javatechie.springbootapirest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;



    public Product saveProduct(Product product){
        return repository.save(product);
    }


    public List<Product> saveProducts(List<Product> products){
        return repository.saveAll(products);
    }

    public Product getProductById(int id){
        return repository.findById(id).orElse(null);
    }


    public List<Product> getAllProducts(){
        return repository.findAll();
    }
    public Product getProductByName(String name){
        return repository.findByName(name);
    }
    public String deleteProduct(int id){
        repository.deleteById(id);
        return "message: \"product removed!!" +id+"\"";
    }
    public Product updateProduct(Product product) {
    /*   Product existingProduct=repository.findById(product.getId()).orElse(null);
        existingProduct.setName(product.getName());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setPrice(product.getPrice());*/
        return repository.save(product);
    }
}
