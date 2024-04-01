// Packages
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
// Components
import Card from '../../components/card/Card';
import Footer from '../../components/footer/Footer';
import { validateEmail, registerUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
// Styling
import { TiUserAddOutline } from 'react-icons/ti';
import styles from './auth.module.scss';



const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    
    const { name, email, password, confirmPassword } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }
    const register = async (e) => {
        e.preventDefault();
        
        if(!name || !email || !password || !confirmPassword){
            return toast.error("Please fill in all fields.");
        }
        if(password.length < 6){
            return toast.error("Password must be at least 6 characters long.");
        }
        if(password !== confirmPassword){
            return toast.error("Passwords do not match.");
        }
        if(!validateEmail(email)){
            return toast.error("Invalid email address.");
        }

        const userData = { name, email, password };
        setIsLoading(true);
        try{
            const data = await registerUser(userData);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            toast.success("Registration Successful.");
            setIsLoading(false);
        }
        catch(error){
            setIsLoading(false);
            console.log(error.message);
        }
    }
    return ( 
        <div>
            <div className={ `container ${styles.auth}` }>
                { isLoading && <Loader /> }
                <Card>
                    <div className={styles.form}>
                        <div className="--flex-center">
                            <TiUserAddOutline size={35} color='#999'/>
                        </div>
                        <h2>Register</h2>
                    
                        <form onSubmit={ register }>
                            <input type="text" placeholder='Your Name' required name="name" value = { name } onChange={ handleChange }/>
                            <input type="email" placeholder='youremail@example.com' required name="email" value = { email } onChange={ handleChange }/>
                            <input type="password" placeholder='Password' required name="password" value = { password } onChange={ handleChange }/>
                            <input type="password" placeholder='Confirm Password' required name="confirmPassword" value = { confirmPassword } onChange={ handleChange }/>
                            <button type='submit' className="--btn --btn-primary --btn-block">Register</button>
                        </form>

                        <span className={styles.register}>
                            <Link to="/">Home</Link>
                            <p>&nbsp; Already have an account? &nbsp;</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>        
            </div>  
            <Footer />
        </div>
     );
}
 
export default Register;