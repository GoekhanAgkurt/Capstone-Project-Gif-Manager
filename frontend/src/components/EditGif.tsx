import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {GifWithoutId, Gif} from "../models.ts";
import InputForm from "./InputForm.tsx";

type Props = {
    onEditGif: (id: string, data: GifWithoutId) => void;
}

export default function EditPage(props: Props) {
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

    function handleSubmit(editedGif: GifWithoutId) {
        props.onEditGif(id, editedGif)
    }

    const gifWithoutID: GifWithoutId = typeof gif !== "undefined"
        ? {name: gif.name, description: gif.description, price: gif.price}
        : {name: "", description: "", price: ""}

    return gif &&
        <InputForm onSubmitGif={handleSubmit} gif={gifWithoutID} legend="Edit Gift" backUrl={`/${id}`} placeholder=""/>
}
