// Packages
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
// Components
import Card from '../../components/card/Card';
import Footer from '../../components/footer/Footer';
import { resetPassword } from '../../services/authService';
// Styling
import { MdPassword } from 'react-icons/md';
import styles from './auth.module.scss';



const initialState = {
    password: "",
    confirmPassword: ""
}

const Reset = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const { password, confirmPassword } = formData;

    const { resetToken } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

    const reset = async (e) => {
        e.preventDefault();
        
        if(!password || !confirmPassword){
            return toast.error("Please fill in all fields.");
        }
        if(password.length < 6){
            return toast.error("Password must be at least 6 characters long.");
        }
        if(password !== confirmPassword){
            return toast.error("Passwords do not match.");
        }
        const userData = { password, confirmPassword };
        try{
            const data = await resetPassword(userData, resetToken);
            toast.success(data.message);
            setFormData(initialState);
            navigate("/login");
        } catch(error){
            toast.error(error.message);
        }
    }
    return ( 
        <div>
            <div className={ `container ${styles.auth}` }>
                <Card>
                    <div className={styles.form}>
                        <div className="--flex-center">
                            <MdPassword size={35} color='#999'/>
                        </div>
                        <h2>Reset Password</h2>
                        <form onSubmit={ reset }>
                            <input type="password" placeholder='New Password' required name="password" value={ password } onChange={ handleChange }/>
                            <input type="password" placeholder='Confirm New Password' required name="confirmPassword" value={ confirmPassword } onChange={ handleChange }/>
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
 
export default Reset;