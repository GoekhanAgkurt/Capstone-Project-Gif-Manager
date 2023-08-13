package com.example.backend.security;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("users")
public class MongoUser {

    @Id
    String id;
    String username;

    String password;
}
