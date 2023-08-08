import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Gif} from "../models.ts";
import InputForm from "./InputForm.tsx";

type Props = {
    onEditGif: (data: Gif) => void
    gifs: Gif[];
}

export default function EditGif(props: Props) {
    const [id, setId] = useState<string>("")
    const [gif, setGif] = useState<Gif>()

    const params = useParams();

    useEffect(() => {
        axios.get(`/api/gifs/${params.id}`)
            .then(response => response.data)
            .catch(console.error)
            .then(data => {
                setId(data.id)
                setGif(data)
            })
    }, [params.id])



    return gif &&
        <InputForm onEditGif={props.onEditGif} gif={gif}  legend="Edit Gift" backUrl={`/${id}`} placeholder=""/>
}
