import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup';
import UserLogin from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import UserDashboard from './components/UserDashboard';
import Attendance from './components/Attendance';
import EditAdmin from './components/EditAdmin';
import LoginTime from './components/LoginTime';
import LogoutTime from './components/LogoutTime';
import FindLogin from './components/FindLogin';
import FindLogout from './components/FindLogout';
import ChooseLogin from './components/ChooseLogin';
import DateLogin from './components/DateLogin';
import IdLogin from './components/IdLogin';
import ChooseLogout from './components/ChooseLogout';
import DateLogout from './components/DateLogout';
import IdLogout from './components/IdLogout';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
/*import Dashboard from './components/Dashboard'
import Horror from './components/Horror';
import Kids from './components/Kids';
import Booking from './components/Booking';
import Payment from './components/Payment';
import Gpay from './components/Gpay';
import PhonePay from './components/PhonePay';
import Paytm from './components/Paytm';*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<UserLogin />}></Route>
        <Route path='/admin_dashboard/:id' element={<AdminDashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/admin_dashboard/:id/edit_admin/:id' element={<EditAdmin />}></Route>
          <Route path='/admin_dashboard/:id/employee' element={[<Employee />,<IdLogin/>]}></Route>
          <Route path='/admin_dashboard/:id/category' element={<Category />}></Route>
          <Route path='/admin_dashboard/:id/attendance' element={<Attendance />}></Route>
          <Route path='/admin_dashboard/:id/logintime' element={<LoginTime />}></Route>
          <Route path='/admin_dashboard/:id/chooselogin' element={<ChooseLogin />}></Route>
          <Route path='/admin_dashboard/:id/findlogin_date' element={<DateLogin />}></Route>
          <Route path='/admin_dashboard/:id/findlogin_id' element={<IdLogin />}></Route>
          <Route path='/admin_dashboard/:id/findlogin' element={<FindLogin />}></Route>
          <Route path='/admin_dashboard/:id/logouttime' element={<LogoutTime />}></Route>
          <Route path='/admin_dashboard/:id/chooselogout' element={<ChooseLogout />}></Route>
          <Route path='/admin_dashboard/:id/findlogout_date' element={<DateLogout />}></Route>
          <Route path='/admin_dashboard/:id/findlogout_id' element={<IdLogout />}></Route>
          <Route path='/admin_dashboard/:id/findlogout' element={<FindLogout />}></Route>
          <Route path='/admin_dashboard/:id/add_category' element={<AddCategory />}></Route>
          <Route path='/admin_dashboard/:id/add_employee' element={<AddEmployee />}></Route>
          <Route path='/admin_dashboard/:id/edit_employee/:id' element={<EditEmployee />}></Route>
        </Route>
        <Route path='/user_dashboard/:id' element={<UserDashboard />}>
          <Route path='/user_dashboard/:id/profile' element={<Profile />}></Route>
          <Route path='/user_dashboard/:id/edit_profile' element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App;
