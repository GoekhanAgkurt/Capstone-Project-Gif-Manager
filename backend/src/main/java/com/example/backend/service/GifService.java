package com.example.backend.service;

import com.example.backend.Exception.NoSuchGifException;
import com.example.backend.model.Gif;
import com.example.backend.model.GifWithoutId;
import com.example.backend.repository.GifRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class GifService {
    private final GifRepository gifRepository;
    private final UuIdService uuIdService;

    public GifService(GifRepository gifRepository, UuIdService uuIdService) {
        this.gifRepository = gifRepository;
        this.uuIdService = uuIdService;
    }

    public List<Gif> list() {
        return this.gifRepository.findAll();
    }

    public Gif addGif(GifWithoutId gifWithoutId) {
        String id = uuIdService.getRandomId();
        Gif gif = new Gif(id, gifWithoutId.getName(), gifWithoutId.getDescription(), gifWithoutId.getPrice(), gifWithoutId.isStatus());
        return this.gifRepository.insert(gif);
    }

    public Gif editGifById(GifWithoutId g, String id) {
        Gif gif = this.gifRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gif with Id" + id + "not found"));

        Gif editedGif = new Gif(gif.getId(), g.getName(), g.getDescription(), g.getPrice(), g.isStatus());
        return this.gifRepository.save(editedGif);
    }


    public Gif getGifById(String id) {
        return this.gifRepository.findById(id)
                .orElseThrow(() -> new NoSuchGifException("Gif mit der ID " + id + " wurde nicht gefunden"));
    }


    public void deleteGif(String id) {
        Gif gif = this.gifRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(id));
        this.gifRepository.delete(gif);
    }
}
