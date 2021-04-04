import {logout} from "../../services/userService";

function Logout (){
    logout();
    window.location = '/'
}

export default Logout;