import './MainPage.scss';
import Header from '../Header/Header';
import PaperList from '../PapersList/PaperList';
import { useEffect, useState } from 'react';
import { firebase, initFirebaseMessaging } from '../initFirebase';
import { useNavigate } from 'react-router-dom';

export default function MainPage(props) {
    const [userData, setUserData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [initialResults, setInitialResults] = useState([]);
    const [roviniete, setRoviniete] = useState([]);
    const [asigurari, setAsigurari] = useState([]);
    const [inspectii, setInspectii] = useState([]);
    const db = firebase.database();
    const navigate = useNavigate();

    function handleAddPaper(paperObject) {
        db.ref(`users/${userId}/data`).push(paperObject).then(snapshot => {
            paperObject.id = snapshot.key;
            if (paperObject.type === 'Rovinieta') {
                setRoviniete(prevData => [...prevData, paperObject]);
                setUserData([...roviniete, paperObject]);
            }
            else if (paperObject.type === 'Asigurare') {
                setAsigurari(prevData => [...prevData, paperObject]);
                setUserData([...asigurari, paperObject]);
            }
            else {
                setInspectii(prevData => [...prevData, paperObject]);
                setUserData([...inspectii, paperObject]);
            }
        });
    }

    function handleCategorySort(category) {
        if (category === 'Rovinieta') {
            setUserData(roviniete)
        }
        else if (category === 'Asigurare') {
            setUserData(asigurari);
        }
        else {
            setUserData(inspectii);
        }
    }

useEffect(() => { 
    //initFirebaseMessaging();
    const dbUsers = [];
      db.ref('users').once('value').then(snapshot => {
          snapshot.forEach(childSnapshot => {
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
                    const userRoviniete = [];
                    const userAsigurari = [];
                    const userInspectii = [];

                    for (const key in data) {
                        if (data[key].type === 'Rovinieta') {
                            userRoviniete.push({
                                id: key,
                                ...data[key]
                            })
                        }
                        else if (data[key].type === 'Asigurare') {
                            userAsigurari.push({
                                id: key,
                                ...data[key]
                            })
                        }
                        else {
                            userInspectii.push({
                                id: key,
                                ...data[key]
                            })
                        }
                    };

                    setUserData(userRoviniete);
                    setRoviniete(userRoviniete);
                    setAsigurari(userAsigurari);
                    setInspectii(userInspectii);
                    setInitialResults([...userRoviniete, ...userAsigurari, ...userInspectii]);
                 });
            }
        } else {
            navigate('/login');
        }
    });
  }, []);
    
    return (
        <div>
          <Header onSelectCategory={handleCategorySort} onAddPaper={handleAddPaper}></Header>
          <PaperList listData={userData}></PaperList>
        </div>
    );
}