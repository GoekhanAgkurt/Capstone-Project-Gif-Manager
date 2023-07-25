package com.example.backend.service;

import com.example.backend.model.Gif;
import com.example.backend.repository.GifRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GifService {
    private GifRepository gifRepository;

    public GifService(GifRepository gifRepository) {
        this.gifRepository = gifRepository;
    }

    public List<Gif> getListOfGifs() {
        return this.gifRepository.findAll();
    }

}
