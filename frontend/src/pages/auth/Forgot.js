// Packages
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
// Components
import Card from '../../components/card/Card';
import Footer from '../../components/footer/Footer';
import { validateEmail, forgotPassword } from '../../services/authService';
// Styling
import { AiOutlineMail } from 'react-icons/ai';
import styles from './auth.module.scss';



const Frogot = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");


    const forgot = async (e) => {
        e.preventDefault();
        if(!email){
            return toast.error("Please fill in all fields.");
        }
        if(!validateEmail(email)){
            return toast.error("Invalid email address.");
        }
        const userData = { email };
        await forgotPassword(userData);
        setEmail("");
        toast.success("Password reset link sent to your email.");
        navigate("/login");
    }

    return ( 
        <div>
            <div className={ `container ${styles.auth}` }>
                <Card>
                    <div className={styles.form}>
                        <div className="--flex-center">
                            <AiOutlineMail size={35} color='#999'/>
                        </div>
                        <h2>Frogot Password?</h2>
                    
                        <form onSubmit={ forgot }>
                            <input type="email" placeholder='youremail@example.com' required name="email" value = { email } onChange={
                                (e) => setEmail(e.target.value)
                            }/>
                            <button type='submit' className="--btn --btn-primary --btn-block">Reset Password</button>
                            <div className={styles.links}>
                                <p><Link to="/"> - Home</Link></p>
                                <p><Link to="/register">- Register</Link></p>
                            </div>    
                        </form>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
     );
}
 
export default Frogot;