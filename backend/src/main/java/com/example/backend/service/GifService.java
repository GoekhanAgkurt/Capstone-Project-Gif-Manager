package com.example.backend.service;

import com.example.backend.model.Gif;
import com.example.backend.model.GifWithoutId;
import com.example.backend.repository.GifRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class GifService {
    private final GifRepository gifRepository;
    private final UuIdService uuIdService;

    public GifService(GifRepository gifRepository, UuIdService uuIdService){
        this.gifRepository = gifRepository;
        this.uuIdService = uuIdService;
    }

    public List<Gif> list() {
        return this.gifRepository.findAll();
    }

    public Gif addGif(GifWithoutId gifWithoutId){
        String id= uuIdService.getRandomId();
        Gif gif = new Gif(id,gifWithoutId.getName(), gifWithoutId.getDescription(), gifWithoutId.getPrice());
        return this.gifRepository.insert(gif);
    }
}
