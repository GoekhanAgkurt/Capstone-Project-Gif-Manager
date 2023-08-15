package com.example.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MongoUsertest {

    private MongoUser user;

    @BeforeEach
    void setUp() {
        user = new MongoUser("abc", "Goekhan", "123");
    }

    @Test
    void id() {
        assertEquals("abc", this.user.id());
    }

    @Test
    void username() {
        assertEquals("Goekhan", this.user.username());
    }

    @Test
    void password() {
        assertEquals("123", this.user.password());
    }


}
