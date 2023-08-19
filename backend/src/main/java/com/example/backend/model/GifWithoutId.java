package com.example.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GifWithoutId {
    private String name;
    private String description;
    private String price;
    private boolean status;
}
