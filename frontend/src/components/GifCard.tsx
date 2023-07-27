import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';


import {Gif} from "../models.ts";


type Props= {
    gif: Gif;
}

export default function GifCard(props: Props) {

    const {name, description, price} = props.gif;
    const theme = createTheme({});

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ Width:'100%', height: '100%',}}>
                <CardActionArea>
                    <CardContent style={{background: '#72BBDB', width: '100%'}}>
                        <Typography variant="body1">
                            <b>{name}</b>
                        </Typography>
                        <p></p>
                        <Typography variant="body2">
                            <b>Description:</b> {description}
                        </Typography>
                        <p></p>
                        <Typography variant="body2">
                            <b>Price:</b> {price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ThemeProvider>
    );
}
