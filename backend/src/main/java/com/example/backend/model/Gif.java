package com.example.backend.model;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Gif {

    @Id
    private String id;

    @NotNull
    @Size(min = 3, max = 100)
    private String name;

    @NotEmpty
    @Size(min = 3, max = 100)
    private String description;

    @NotNull
    private String price;

    private boolean status;
}