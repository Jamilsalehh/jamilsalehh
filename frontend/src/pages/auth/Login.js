// Packages
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
// Components
import Card from '../../components/card/Card';
import Footer from '../../components/footer/Footer';
import { validateEmail, loginUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
// Styling
import { BiLogIn } from 'react-icons/bi';
import styles from './auth.module.scss';

const initialState = {
    email: "",
    password: ""
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);


    const { email, password } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }
    const login = async (e) => {
        e.preventDefault();
        
        if(!email || !password){
            return toast.error("Please fill in all fields.");
        }
        if(password.length < 6){
            return toast.error("Password must be at least 6 characters long.");
        }
        if(!validateEmail(email)){
            return toast.error("Invalid email address.");
        }

        const userData = { email, password };
        setIsLoading(true);
        try{
            const data = await loginUser(userData);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            toast.success("Login Successful.");
            setIsLoading(false);
        }
        catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    return ( 
        <div>
            <div className={ `container ${styles.auth}` }>
                { isLoading && <Loader /> }
                <Card>
                    <div className={styles.form}>
                        <div className="--flex-center">
                            <BiLogIn size={35} color='#999'/>
                        </div>
                        <h2>Login</h2>
                        
                        <form onSubmit={ login }>
                            <input type="email" placeholder='youremail@example.com' required name="email" value={ email } onChange={ handleChange }/>
                            <input type="password" placeholder='Password' required name="password" value={ password } onChange={ handleChange }/>
                            <button type='submit' className="--btn --btn-primary --btn-block">Login</button>
                        </form>

                        <Link to="/forgot">Forgot Password?</Link>
                        <span className={styles.register}>
                            <Link to="/">Home</Link>
                            <p>&nbsp; Don't have an account? &nbsp;</p>
                            <Link to="/register">Register</Link>
                        </span>
                    </div>
                    </Card>        
            </div>
            <Footer />
        </div>
    );
}
 
export default Login;