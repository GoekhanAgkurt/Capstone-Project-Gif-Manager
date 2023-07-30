package com.example.backend.controller;

import com.example.backend.model.Gif;
import com.example.backend.model.GifWithoutId;
import com.example.backend.service.GifService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gifs")
public class GifController {
    private final GifService gifService;

    public GifController(GifService gifService) {
        this.gifService = gifService;
    }

    @GetMapping
    public List<Gif> getListOfGifs() {
        return this.gifService.list();
    }

    @PostMapping
    public List<Gif> addNewParty(@RequestBody GifWithoutId gifWithoutId){
        this.gifService.addGif(gifWithoutId);
        return this.gifService.list();
    }
}
