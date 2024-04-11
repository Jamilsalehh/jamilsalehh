import { useEffect } from "react";
import { getUserSessions } from "../../redux/services/bookingService";

const UserSessions = () => {
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const sessions = await getUserSessions(); // Await the result of the getUser function
                console.log(sessions)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[])
    return ( <>
    HEYOOO
    </> );
}
 
export default UserSessions;