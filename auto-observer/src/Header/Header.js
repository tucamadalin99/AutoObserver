import './Header.scss';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/lab';
import { useState } from 'react';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import dateFormat from '../utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Header(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [license, setLicense] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [type, setType] = useState('');
    const [invalidForm, setInvalidForm] = useState(false);

    const handleChange = (event) => {
        setInvalidForm(false);
        setType(event.target.value);
    };

    const handleCategorySelection = (selection) => {
        props.onSelectCategory(selection);
    }

    const resetFormInputs = () => {
        setType('');
        setStartDate(null);
        setEndDate(null);
        setLicense('');
        setInvalidForm(false);
    }

    const sendPaperData = () => {

        if (!license || !type || !startDate || !endDate) {
            setInvalidForm(true);
        } else {
            const formData = {
                number: license,
                type: type,
                startDate: dateFormat(startDate, 'dd-MM-yyyy'),
                endDate: dateFormat(endDate, 'dd-MM-yyyy')
            };
            props.onAddPaper(formData);
            resetFormInputs();
            handleClose();
        }
        
    };

    return (
        <div className="header">
            <div className="header__actions">
                <div className="header__actions-add">
                    <span className="header__actions-add-label">Roviniete</span>
                      <IconButton onClick={() => handleCategorySelection('Rovinieta')} aria-label="add entry" component="span">
                        <AddRoadIcon />
                      </IconButton>
                </div>
                <div className="header__actions-add">
                    <span className="header__actions-add-label">Asigurari</span>
                      <IconButton onClick={() => handleCategorySelection('Asigurare')} aria-label="add entry" component="span">
                        <ReceiptIcon />
                      </IconButton>
                </div>
                <div className="header__actions-add">
                    <span className="header__actions-add-label">ITP</span>
                      <IconButton onClick={() => handleCategorySelection('Inspectie')} aria-label="add entry" component="span">
                        <ConstructionIcon />
                      </IconButton>
                </div>
                <div className="header__actions-add">
                    <span className="header__actions-add-label">Add</span>
                      <IconButton onClick={handleOpen} aria-label="add entry" component="span">
                        <AddBoxIcon />
                      </IconButton>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='add-form-container'>
                        <FormControl fullWidth>
                            <TextField
                            className='login-form__control'
                            id="input-with-icon-textfield"
                            label="Nr. inmatriculare"
                            variant="standard"
                                onChange={(e) => {
                                    setInvalidForm(false);
                                    setLicense(e.target.value);
                                }}
                            />       
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Act</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Tip"
                            onChange={handleChange}
                            >
                            <MenuItem value={'Rovinieta'}>Rovinieta</MenuItem>
                            <MenuItem value={'Asigurare'}>Asigurare</MenuItem>
                            <MenuItem value={'Inspectie'}>Inspectie</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <DatePicker
                                label='Data start'
                                renderInput={(params) => <TextField {...params} />}
                                value={startDate}
                                onChange={(newDate) => {
                                    setInvalidForm(false);
                                    setStartDate(newDate);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <DatePicker
                                label='Data expirare'
                                renderInput={(params) => <TextField {...params} />}
                                value={endDate}
                                onChange={(newDate) => {
                                    setInvalidForm(false);
                                    setEndDate(newDate);
                                }}
                            />
                        </FormControl> 
                        <FormControl fullWidth>
                          <Button onClick={sendPaperData} className='login-form__control' variant="contained">Submit</Button>  
                        </FormControl>
                        {invalidForm && <Alert variant="outlined" severity="error">
                            Date introduse incorect
                        </Alert> }
                        
                    </div>
                </Box>
            </Modal>
        </div>
    );
}