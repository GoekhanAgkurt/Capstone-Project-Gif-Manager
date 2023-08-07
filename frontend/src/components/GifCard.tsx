import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';


import {Gif} from "../models.ts";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


type Props= {
    gif: Gif;
}

export default function GifCard(props: Props) {

    const {name, description, price} = props.gif;
    const theme = createTheme({});
    const navigate = useNavigate();



    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ Width:'100%', height: '100%',}}>
                    <CardContent style={{background: '#72BBDB', width: '100%'}}>
                        <Typography variant="body1">
                            <b>{name}</b>
                        </Typography>
                        <Typography variant="body2">
                            <b>Description:</b> {description}
                        </Typography>
                        <Typography variant="body2">
                            <b>Price:</b> {price}
                        </Typography>

                        <Button sx={{bgcolor: "rgb(44, 161, 173)"}} type="submit" variant="contained" className="button-right" onClick={() => navigate(`/${props.gif.id}/edit`)}>
                            Edit
                        </Button>

                    </CardContent>
            </Card>
        </ThemeProvider>
    );
}
