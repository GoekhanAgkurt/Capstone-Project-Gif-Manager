import {useEffect, useState} from 'react';
import axios from 'axios';
import {Gif} from "../models.ts";



export default function useGif(gifId: string) {
    const [gif, setGif] = useState<Gif | null>(null);

    useEffect(() => {
        if (!gifId) {
            setGif(null);
            return;
        }

        axios
            .get(`/api/player/${gifId}`)
            .then((response) => response.data)
            .then((data: Gif) => {
                setGif(data || null);
            })
            .catch(() => setGif(null));
    }, [gifId]);

    return gif;
}