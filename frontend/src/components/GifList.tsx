import {useEffect, useState} from 'react';
import axios from 'axios';
import {Gif} from "../models.ts";
import Grid from '@mui/material/Grid';
import GifCard from "./GifCard.tsx";


type Props = {
    gifs: Gif[];
    onDeleteGif: (id: string) => void;
    onEditGif: (data: Gif) => void
}

export default function GifList(props:Props) {
    const [gifs, setGifs] = useState<Gif[]>([]);

    useEffect(() => {
        axios.get('/api/gifs')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }, []);


    return (
        <div style={{width:'100%', margin: '5px'}}>
            <h3> Birthdayparty</h3>
            <p><b>Number of Gifs: </b>{gifs.length} </p>
            <Grid container spacing={2}>
                {props.gifs.map(gif => (
                    <Grid key={gif.id} item xs={12}>
                        <GifCard onDeleteGif={props.onDeleteGif} onEditGif={props.onEditGif} gif={gif} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}