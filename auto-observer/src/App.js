import './App.css';
import MainPage from './MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
