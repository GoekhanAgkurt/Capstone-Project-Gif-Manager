package com.example.backend.repository;

import com.example.backend.model.Gif;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GifRepository extends MongoRepository<Gif, String> {
}
