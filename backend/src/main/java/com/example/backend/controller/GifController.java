package com.example.backend.controller;


import com.example.backend.model.Gif;
import com.example.backend.service.GifService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gifs")
public class GifController {
    private final GifService gifService;

    public GifController(GifService gifService) {
        this.gifService = gifService;
    }

    @GetMapping
    public List<Gif> getListOfGifs(){return this.gifService.getListOfGifs();
    }


}
