// frontend/src/App.js
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage'
import {restoreUser} from './store/session'
function App() {
  const dispatch=useDispatch()
  // const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreUser()); //.then(() => setIsLoaded(true));
  },[dispatch])
  return (
    <> {/*isLoaded &&*/}
    
      <h4>(Hello from App)</h4>
      <Switch>
      <Route exact path="/">
        <h3>Home</h3>
      </Route>  
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
    </>


  );
}

export default App;
