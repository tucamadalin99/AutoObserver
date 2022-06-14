import './MainPage.scss';
import Header from '../Header/Header';
import PaperList from '../PapersList/PaperList';
import { useEffect, useState } from 'react';
import { firebase } from '../initFirebase';
import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
    const [userData, setUserData] = useState([]);
    const [userId, setUserId] = useState(null);
    const db = firebase.database();
    const navigate = useNavigate();

    function handleAddPaper(paperObject) {
        db.ref(`users/${userId}/data`).push(paperObject);
        setUserData(prevData => [...prevData, paperObject]);
    }

  useEffect(() => { 
    const dbUsers = [];
      db.ref('users').once('value').then(snapshot => {
          snapshot.forEach(childSnapshot => {
              console.log(childSnapshot.val());
              dbUsers.push({
                  id: Object.keys(snapshot.val())[0],
                  username: childSnapshot.val().username,
                  password: childSnapshot.val().password
              });
      });
        const user = {
            username: localStorage.getItem('userName'),
            password: localStorage.getItem('password')
        }
        
        if (user.username && user.password) {
            const foundUser = dbUsers.find(dbUser => dbUser.username == user.username &&
                dbUser.password == user.password);
            
            if (!foundUser) {
                navigate('/login');
            }
            else {
                setUserId(foundUser.id);
                db.ref(`users/${foundUser.id}`).once('value').then((snapshot) => {
                    const data = snapshot.val().data;
                    const userPaperData = [];

                    for (const key in data) {
                        userPaperData.push({
                            id: key,
                            ...data[key]
                        });
                    };

                    setUserData(userPaperData);
                 });
            }
        } else {
            navigate('/login');
        }
    });
  }, []);
    
    return (
        <div>
          <Header onAddPaper={handleAddPaper}></Header>
          <PaperList listData={userData}></PaperList>
        </div>
    );
}