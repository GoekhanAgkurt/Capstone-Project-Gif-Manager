import {GifWithoutId} from "../models.ts";
import InputForm from "./InputForm.tsx";


type Props = {
    onAddGif: (data: GifWithoutId) => void;
}

export default function AddPage(props: Props){
    const newGif: GifWithoutId = {id: "", name: "", description: "", price: ""}

    return <InputForm onSubmitGif={props.onAddGif} gif={newGif} legend={"Add new Gift"} backUrl="/" placeholder=""/>

}