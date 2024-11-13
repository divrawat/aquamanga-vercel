"use client"
import { useState, useEffect } from 'react';
import { adminSignin, getCookie, isAuth, authenticate } from '../../actions/auth';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const token = getCookie('token');

const Admin = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => { if (isAuth() && isAuth().role === "1") { router.push(`/divyanshu-admin`); } }, []);


    const handleSubmit = e => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        adminSignin(user).then(data => {
            console.log('data', data);
            if (data && data.error) {
                setValues({ ...values, error: data.error, loading: false });
                toast.error(data.error);
            }
            else if (data && data.status == false) {
                setValues({ ...values, error: data.error, loading: false });
                toast.error(data.message);
            }
            else {
                toast.success('Login successful');
                authenticate(data, () => {
                    if (isAuth().role == 1) { router.push(`/admin`); }
                    else { router.push(`/`); }
                });
            }
        });
    };


    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };


    const head = () => (
        <Head>
            <title>Admin</title>
            <meta name="robots" content="noindex, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        </Head >
    );

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            {head()}
            <Toaster />
            <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">

                <div className="relative py-3 sm:w-96 mx-auto text-center">
                    <span className="text-2xl font-light ">Admin Login to your account</span>
                    <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                        <div className="h-2 bg-lime-400 rounded-t-md"></div>
                        <div className="px-8 py-6 ">
                            <label className="block font-semibold"> Email </label>
                            <input value={email} onChange={handleChange('email')} name="email" type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <label className="block mt-3 font-semibold"> Password </label>
                            <input value={password} onChange={handleChange('password')} name="password" type="password" placeholder="Password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <div className="flex justify-between items-baseline">
                                <button type="submit" className="mt-4  bg-lime-500 text-white py-2 px-6 rounded-md hover:bg-lime-600 ">Login</button>
                                {/* <a href="#" className="text-sm hover:underline">Forgot password?</a> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default Admin