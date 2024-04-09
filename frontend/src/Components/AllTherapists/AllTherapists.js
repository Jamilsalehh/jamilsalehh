import { useEffect, useContext, useState } from "react";
import UserContext from "../UserContext/UserContext";
import { useNavigate } from 'react-router-dom'; 
import { getAllTherapists } from "../../redux/services/authService";
import { userbookSession } from "../../redux/services/bookingService";
import "../../Css/AllTherapists/AllTherapists.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const AllTherapists = () => {
    const [user, setUser] = useContext(UserContext);
    const [allTherapists, setAllTherapists] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState(null);
    const[notes,setNotes] = useState("");
    const[bookedDate,setBookedDate] = useState(null);

    useEffect(()=>{
        console.log("Notes: " + notes);
        console.log("bookedDate: " + bookedDate);
    },[notes,bookedDate])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTherapists();
                setAllTherapists(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (therapist, selectedDay) => {
        console.log(therapist);
        setSelectedTherapist(therapist);
    
        // Split the selected day into day name and time range
        const parts = selectedDay.split(' ');
        const dayName = parts[0];
        const timeRange = parts.slice(1).join(' ');
    
    
        // Extract start time and end time from the time range
        const [startTime, endTime] = timeRange.split(' - ');
    
        // Convert start time and end time to Date objects
        const currentDate = new Date();
        const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(dayName);
        const availabilityStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (dayIndex - currentDate.getDay()), ...startTime.split(':'));
        const availabilityEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (dayIndex - currentDate.getDay()), ...endTime.split(':'));
        
        // Create an object representing the availability with date-time
        const availabilityWithDate = { day: dayName, start: availabilityStartDate, end: availabilityEndDate };
    
        setSelectedAvailability([availabilityWithDate]); // Set the selected availability
        setOpen(true); // Open the modal
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleDateSelect = (selectedDate) => {

        // Check if selected date falls within the available time ranges
        if (selectedAvailability) {
            const availabilityOnSelectedDay = selectedAvailability.find((availability) => availability.day.toLowerCase() === selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());
            
            if (availabilityOnSelectedDay) {
            const { start, end } = availabilityOnSelectedDay;
                if (selectedDate >= start && selectedDate <= end) {
                    console.log("Selected date falls within the schedule.");
                    setBookedDate(selectedDate);
                } else {
                    console.log("Selected date does not fall within the schedule.");
                }
            } else {
                console.log("No availability found for the selected date.");
            }
        }
    };

    const bookSession = async (therapist)=>{
        const formData = {
            therapistId:therapist._id,
            sessionTime:bookedDate,
            notes:notes
        }
       await userbookSession(formData);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className="alltherapists_page_wrapper">
            <div className="alltherapists_page_wrap">
                {allTherapists && allTherapists.map(therapist => (
                    <div key={therapist._id} className="alltherapists_wrapper">
                        <div className="therapists_profile_wrapper">
                            <div style={{ border: '1px solid black', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                            <div>{therapist.name}</div>
                            <div>{therapist.email}</div>
                        </div>
                        <div className="therapists_bio_wrapper">
                            <div>{therapist.bio}</div>
                        </div>
                        <div className="therapists_availability_wrapper">
                            <div> Available </div>
                            <div>
                                {therapist.availability.map((day, index) => (
                                    <div key={index} onClick={() => handleOpen(therapist,day)} className="therapists_availability_dates">{day}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>{selectedTherapist?.name}</h2>
                    <p>Select a suitable time on this date:</p>
                    <form onSubmit={(e) => {
                        e.preventDefault(); // Prevent default form submission
                        bookSession(selectedTherapist); // Call your custom function
                    }}>

                    <input
                            type="datetime-local"
                            min={selectedAvailability && formatDate(selectedAvailability[0].start)}
                            max={selectedAvailability && formatDate(selectedAvailability[0].end)} 
                            // value={selectedAvailability[0].start.toISOString().slice(0, -8)}                           
                            onChange={(e) => handleDateSelect(new Date(e.target.value))}
                            disabled={!selectedAvailability} // Disable if no availability selected
                        />
                    <textarea placeholder="Notes" onChange={(e)=>{setNotes(e.target.value)}}>
                            
                    </textarea>
                    <div>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit">Book Session</Button>
                    </div>
                    </form>
                    
                </Box>
            </Modal>
        </div>
    );
};

export default AllTherapists;
