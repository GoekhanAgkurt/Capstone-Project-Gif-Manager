import {GifWithoutId} from "../models.ts";
import InputForm from "./InputForm.tsx";


type Props = {
    onAddGif: (data: GifWithoutId) => void;
}


export default function AddPage(props: Props){

    return <InputForm onAddGif={props.onAddGif} legend={"Add new Gift"} backUrl="/" placeholder="" />
}
