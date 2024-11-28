import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { persistor } from "../../store/store";


function Dashboard() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        persistor.purge(); 
        
        dispatch(logout());  
        alert('You have been logged out!');
      };
      
  return (
    <div>Dashboard


<button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard