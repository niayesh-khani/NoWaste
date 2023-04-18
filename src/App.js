import{ createMuiTheme, ThemeProvider} from '@material-ui/core'
import { purple } from '@material-ui/core/colors';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass'
import Verification from './pages/Verification';
import HomePage  from './pages/Homepage';
import Landing from './pages/Landing';
import Routing from './pages/Routing';
import { SpinningBubbles } from "react-loading";
import { useEffect, useState } from 'react';
import { set } from 'date-fns';
import RestaurantView from './pages/Restaurant-View';
import EditProfile from './pages/EditProfile';
import Edit from './pages/Test';
import NewPassword from './pages/NewPassword';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    })
  }, []);

  return (
    // <div> 
    //   {loading ? (
    //     <div >
    //       <SpinningBubbles></SpinningBubbles>
    //       <SpinningBubbles color="#ffffff" />
    //     </div>
    //   ) : (
      <Router>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path='/forgot-password'>
            <ForgotPass />
          </Route>
          <Route path="/new-password">
            <NewPassword />
          </Route>
          <Route path="/verification">
            <Verification />
          </Route>
          <Route exact path="/homepage">
            <HomePage />
          </Route>
          <Route path="/landing">

            <Routing/>
          </Route>
          <Route path="/restaurant-view/:id">
            <RestaurantView />
          </Route>
          <Route path="/edit-profile">
            <EditProfile />
          </Route>
          <Route path="/test">
            <Edit />
          </Route>
      </Router>
    //   )}
    // </div>
  );
}

export default App;
