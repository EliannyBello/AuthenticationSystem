import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../context/GlobalContext";
import Swal from "sweetalert2";

const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const response = await actions.login(data);
        if (response) {
            navigate('/private');
        } else {
            Swal.fire({
                title: 'Incorrect credentials',
                timer: 2000,
                icon: 'error',
                position: 'center'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h2>Login</h2>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    {...register('email', { required: 'Email is required!' })}
                    placeholder="Email"
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    {...register('password', { required: 'Password is required!' })}
                    placeholder="Password"
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

export default Login;
