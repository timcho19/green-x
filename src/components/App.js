import Router from './Router';
import { useState } from "react";
import { authService } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";




console.log(authService.currentUser)

function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); //회원정보, 로그인정보 확인여부
  const [userObj, setUserObj] = useState(null); //회원정보 저장

  console.log(auth);

  onAuthStateChanged(auth, (user) => {
    if (user) {
  
      // const uid = user.uid;
      setIsLoggedIn(true);
      setUserObj(user.uid)
     
      
    } else {
      // User is signed out
      setIsLoggedIn(false);
    }
    setInit(true);
  });

  return (
    <div className="container">
      <h1>Green - x</h1>
      {
        init ?
        <Router isLoggedIn={isLoggedIn} userObj={userObj}/> 
        : 
        "초기화중..."
      }
      <hr/>
      <p>copyright timcho19 Allright reserved</p>
    </div>
  );
}

export default App;
