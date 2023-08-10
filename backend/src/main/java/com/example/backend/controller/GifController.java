package com.example.backend.controller;

import com.example.backend.model.Gif;
import com.example.backend.model.GifWithoutId;
import com.example.backend.service.GifService;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/{id}")
    public Gif getGifById(@PathVariable String id){
        return this.gifService.getGifById(id);
    }

    @PostMapping
    public List<Gif> addNewGif(@RequestBody GifWithoutId gifWithoutId){
        this.gifService.addGif(gifWithoutId);
        return this.gifService.list();
    }

    @PutMapping("/{id}")
    public List<Gif> updateGifById(@PathVariable String id, @RequestBody GifWithoutId gifWithoutId){
        this.gifService.editGifById(gifWithoutId,id);
        return gifService.list();
    }



    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable String id) {
        gifService.deleteGif(id);
    }

}