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
import RestaurantView from './pages/Restaurant-View';
import EditProfile from './pages/EditProfile';

function App() {
  return (
      <Router>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path='/forgotpass'>
            <ForgotPass />
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
          <Route path="/restaurant-view">
            <RestaurantView />
          </Route>
          <Route path="/edit-profile">
            <EditProfile />
          </Route>
          <Route path="/change-password" >

          </Route>
      </Router>
  );
}

export default App;
