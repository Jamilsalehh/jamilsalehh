import { useEffect, useState, useContext } from "react";
import { deleteTherapistSession, deleteUserSession, getTherapistSessions, getUserSessions } from "../../redux/services/bookingService";
import  '../../Css/UserSessions/UserSessions.css';
import isTherapistContext from "../UserContext/IsTherapist";

const UserSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [isTherapist,setIsTherapist] = useContext(isTherapistContext);
    const fetchData = async () => {
        try {
            var sessionsData;
            if(!isTherapist){
                sessionsData = await getUserSessions();   
            }else{
                sessionsData = await getTherapistSessions();
            }
            setSessions(sessionsData);
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        fetchData();
    }, []);

    const cancelSession = async (session) => {
        // Implement cancellation logic here
        if(!isTherapist){
            await deleteUserSession(session);
        }else{
            await deleteTherapistSession(session);
        }
        await fetchData();
    }

    return (
        <>
            {sessions.map(session => (
                <div key={session._id} className="session-container">
                    <div className="left-column">
                        <p>Name: {!isTherapist ? session.therapist.name : session.user.name}</p>
                        <p>Email: {!isTherapist ? session.therapist.email : session.user.email}</p>
                        <p>Session Time: { session.sessionTime}</p>
                        <p>Status: {session.status}</p>
                    </div>
                    <div className="right-column">
                        <p>Notes: {session.notes}</p>
                    </div>
                    <div className="footer">
                        <button onClick={() => cancelSession(session)}>Cancel</button>
                    </div>
                </div>
            ))}
        </>
    );
}
 
export default UserSessions;
