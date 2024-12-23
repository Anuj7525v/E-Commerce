import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";



    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            toast.error("Password do not Match");
        }
        else{
           try {
            const res = await register({username,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
            toast.success("User successfully registered");
           } catch (err) {
            console.log(err);
            toast.error(err.data.message);
            
           }
        }
    };

    return (
        <section>
            <div>
                <h1>Register</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            id="name"
                            placeholder="Enter the name"
                            value={username}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            id="email"
                            placeholder="Enter the email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            placeholder="Enter the password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                            id="confirmPassword"
                            placeholder="Enter the Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit"
                        disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                    {isLoading && <Loader />}
                </form>

                <div>
                    <p>Aready have a account? {""}
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}
                        >Login</Link></p>
                </div>
            </div>
            <img 
                    src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
                    alt="" />
        </section>
    )

};

export default Register;