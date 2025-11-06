'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoadingStore from "../../../store/useLoadingStore";
import setCookie from "../../../utilis/helper/cookie/setcookie";
import logingandsignupmakepost from "../../../utilis/requestrespose/logingandsignupmakepost";

import SpinLoader from "@/app/componnent/SpingLoader";
import useLogedUserStore from "@/store/useLogedUser";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Signin = () => {

    const router = useRouter();
    const { isLoading, setLoading } = useLoadingStore();
    const { loginUser, setLoginUser } = useLogedUserStore();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password && role) {
            setLoading(true);
            const response = await logingandsignupmakepost("login", { email, password, role });

            if (response) {
                setCookie("token", response?.data?.token, 1);
                setCookie("id", response?.data?._id, 1);
                setCookie("name", response?.data?.name, 1);
                setCookie("role", response?.data?.role, 1);
                setLoginUser({
                    name: response?.data?.name,
                    token: response?.data?.token,
                    role: response?.data?.role
                });

                toast.success(response?.message);
                setLoading(false);

                switch (response?.role?.trim()) {
                    case "admin":
                        router.push('/deshboard/admin');
                        break;
                    case "provider":
                        router.push('/deshboard/provider');
                        break;
                    default:
                        router.push('/');
                        break;
                }

            } else {
                setLoading(false);
                toast.error("Something Went Wrong!");
            }
        } else {
            toast.warn("Required All Feilds");
        }

    };


    return (
        <div className="w-screen h-[60vh] flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-xl text-black font-bold mb-4">Sign IN </h2>

                <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                    />

                    <select onChange={(e) => { setRole(e.target.value) }} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="provider">Service Provider</option>

                    </select>


                    <button
                        disabled={isLoading}
                        className="w-full bg-sky-400 text-white font-semibold py-2 rounded-md hover:bg-sky-600 transition cursor-pointer flex items-center justify-center gap-2"
                    >

                        {
                            isLoading && <SpinLoader />
                        }


                        Login
                    </button>
                </form>

                <Link href="/forgotpass" className="block mt-3 text-sm text-gray-600 hover:underline">
                    Forget Password
                </Link>

                <span className="flex text-gray-600 items-center gap-1 pt-2 justify-center">Did not have an account ? <Link href="signup" className="text-sm text-gray-600 hover:underline text-sky-500">
                    sign Up
                </Link></span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signin;
