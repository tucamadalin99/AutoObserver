import './LoginPage.scss';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function sendLoginData() {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        navigate('/');
    }

    return (
        <form className="login-form">
                <TextField
                    className='login-form__control'
                    id="input-with-icon-textfield"
                    label="Username"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    className='login-form__control'
                    id="input-with-icon-textfield"
                    label="Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={sendLoginData} className='login-form__control' variant="contained">Submit</Button>
        </form>
    );
}