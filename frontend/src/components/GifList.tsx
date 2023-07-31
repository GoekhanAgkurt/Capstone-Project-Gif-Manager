import {useEffect, useState} from 'react';
import axios from 'axios';
import {Gif} from "../models.ts";
import Grid from '@mui/material/Grid';
import GifCard from "./GifCard.tsx";


type Props = {
    gifs: Gif[];
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
        <div style={{width:'90%', margin: '5px'}}>
            <h3>Max Birthdayparty, 21.09.23</h3>
            <h5><b>Number of Gifs: </b>{gifs.length} </h5>
            <Grid container spacing={2}>
                {props.gifs.map(gif => (
                    <Grid key={gif.id} item xs={12}>
                        <GifCard gif={gif} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}