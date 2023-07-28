import {FormEvent, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {GifWithoutId} from "../models.ts";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

type Props = {
    onSubmitGif: (data: GifWithoutId) => void
    gif: GifWithoutId | undefined
    legend: string
    backUrl: string
    placeholder: string
}

export default function InputForm(props: Props) {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const navigate = useNavigate()

    const[open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    useEffect(() => {
        if (typeof props.gif !== "undefined") {
            setName(props.gif.name)
            setDescription(props.gif.description)
            setPrice(props.gif.price)
        }
    }, [props.gif])


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data: GifWithoutId = {
            name: name,
            description: description,
            price: price
        }
        props.onSubmitGif(data)
    }


    return <form onSubmit={handleSubmit}>
        <fieldset>
            <legend style={{marginBottom: '20px', fontWeight: 'bold', fontSize: '28px'}}>{props.legend}</legend>
            <TextField sx={{ml: 2, width: '85%'}}
                       label="Theme"
                       type="text"
                       value={name}
                       id="theme"
                       placeholder="choose Theme"
                       required
            />
            <TextField sx={{ml: 2, width: '85%'}}
                       label="Date"
                       type="date"
                       value={description}
                       id="date"
                       required
            />
            <TextField sx={{ml: 2, width: '85%'}}
                       label="Location"
                       type="text"
                       value={price}
                       id="location"
                       placeholder="choose Location"
                       required
            />
            <div>
                <Button sx={{mt: 1, mr: 1, color: "rgb(44, 161, 173)", borderColor: "rgb(44, 161, 173)"}}
                        variant="outlined" disableElevation
                        onClick={handleClickOpen}> Cancel
                </Button>

                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>{"Go back without saving?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to go back to the party, without saving?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => navigate(props.backUrl)} color="error" variant="outlined">Go back</Button>
                    </DialogActions>
                </Dialog>


                <Button sx={{mt: 1, mr: 1, bgcolor: "rgb(44, 161, 173)"}} type="submit" variant="contained">
                    Submit
                </Button>
            </div>
        </fieldset>
    </form>
}
