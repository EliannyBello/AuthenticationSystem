import { useForm } from "react-hook-form";
import { Context } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2'
import '../styles/register.css'



const Register = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()



    const onSubmit = async (data) => {
        console.log(data)
        const response = await actions.register(data)
        console.log(response)
        Swal.fire({
            position: "center",
            icon: response.status,
            title: response.message,
            showConfirmButton: false,
            timer: 1500
        });
        (response.status == 'success') && navigate('/')
    }
    return (
        <div className="container pt-3 mt-3">
            <div className="card card-register">
                <h3 className="text-center">Register</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
                    <div className="mb-1">
                        <label htmlFor="input" className="form-label">Email</label>
                        <input type="email" className="form-control " name='email' placeholder="email@example.com" {...register('email', { required: 'Email is required!' })} />
                        {errors.email?.type === "required" && (
                            <p className="text-danger p-1 m-1" role="alert">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="input" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" {...register('username', { required: 'Username is required!' })} />
                        {errors.username?.type === "required" && (
                            <p className="text-danger p-1 m-1" role="alert">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="input" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="******"  {...register('password', { required: 'Password is required!' })} />
                        {errors.password?.type === "required" && (
                            <p className="text-danger p-1 m-1" role="alert">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="input" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="******" {...register('confirm_password', { required: 'Confirm password is required!' })} />
                        {errors.confirm_password?.type === "required" && (
                            <p className="text-danger p-1 m-1" role="alert">{errors.confirm_password.message}</p>
                        )}
                    </div>
                    <button className="btn btn-primary">Create Account</button>
                </form>
            </div>
        </div>

    )
}

export default Register