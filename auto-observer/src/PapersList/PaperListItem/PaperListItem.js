import './PaperListItem.scss';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddRoadIcon from '@mui/icons-material/AddRoad';



export default function PaperListItem(props) {
    return <ListItem disablePadding>
            <ListItemButton>
            <ListItemIcon>
                {props.type === 'Rovinieta' && <AddRoadIcon />}
                {props.type === 'Inspectie' && <ConstructionIcon />}
                {props.type === 'Asigurare' && <ReceiptIcon />}
            </ListItemIcon>
            <div className='list-item-data'>
                <ListItemText primary='Act' secondary={props.type}/>
                <ListItemText primary='Expirare' secondary={props.endDate} />
                <ListItemText primary='Inmatriculare' secondary={props.license} />
            </div>
            </ListItemButton>
          </ListItem>;
}