import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate,} from "react-router-dom";
import {Gif} from "../models.ts";


type Props= {
    gif: Gif;
    onDeleteGif: (id: string)=> void
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
                            <b>Price:</b> {price} <> Euro </>
                        </Typography>

                        <button onClick={() => props.onDeleteGif(props.gif.id)}> Löschen </button>

                        <button  onClick={() => navigate(`/${props.gif.id}/edit`)}>
                            Edit
                        </button>

                    </CardContent>
            </Card>
        </ThemeProvider>
    );
}
