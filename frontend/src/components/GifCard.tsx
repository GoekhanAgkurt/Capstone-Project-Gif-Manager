import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { Gif } from '../models.ts';

type Props = {
    gif: Gif;
    onDeleteGif: (id: string) => void;
    onEditGif: (data: Gif) => void;
};

export default function GifCard(props: Props) {
    const { id, name, description, price, status } = props.gif;
    const navigate = useNavigate();

    const changeStatus = () => {
        const updatedGif = { id: id, name: name, description: description, price: price, status: !status };
        props.onEditGif(updatedGif);
    };

    return (
        <div style={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: '100%', boxShadow: 'none' }}>
                <CardContent style={{ background: !status ? 'white' : '#F0FFF0', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <Typography variant="body1">
                            <b>{name}</b>
                        </Typography>
                        <Typography variant="body2">
                            <b>Description:</b> {description}
                        </Typography>
                        <Typography variant="body2">
                            <b>Price:</b> {price} <> Euro </>
                        </Typography>

                        <button onClick={() => props.onDeleteGif(props.gif.id)}>DELETE</button>
                        <button onClick={() => navigate(`/${props.gif.id}/edit`)}>EDIT</button>
                    </div>
                    {status && <CheckCircleIcon style={{ color: 'green', marginRight: '2.0rem' }} />}
                </CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '15px', marginTop: '-60px', paddingBottom:"12px" }}>
                    <Switch checked={status} onChange={changeStatus} color="primary" />
                    <Typography variant="body2" style={{ marginTop: '-0.7rem' }}>{status ? 'Gekauft!' : 'Gekauft?'}</Typography>
                </div>
            </Card>
        </div>
    );
}
