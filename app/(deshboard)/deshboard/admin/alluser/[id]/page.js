"use client";
import useLoadingStore from "@/store/useLoadingStore";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeGet from "@/utilis/requestrespose/get";
import MakePut from "@/utilis/requestrespose/put";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SingleUserPage() {

    const { id } = useParams();
    const token = getCookie();
    const { isLoading, setLoading } = useLoadingStore();
    const [fetchloading, setfetchloading] = useState(true);
    const [isedit, setisedit] = useState(false);
    const [fname, setfname] = useState('');
    const [mname, setmname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [city, setcity] = useState('');
    const [zip, setzip] = useState('');
    const [address, setaddress] = useState('');
    const [address2, setaddress2] = useState('');
    const [alldata, setalldata] = useState([]);
    const [role, setrole] = useState('user');
    const [isprofileupdated, setisprofileupdated] = useState(false);
    const [maxcatagoryselection, setmaxcatagoryselection] = useState(10);
    const [maxareaselection, setmaxareaselection] = useState(10);



    const fetching = useCallback(async (id, token) => {
        try {
            const response = await MakeGet(`user/${id}`, token);

            setfname(response?.data?.fname);
            setmname(response?.data?.mname);
            setlname(response?.data?.lname);
            setemail(response?.data?.email);
            setphone(response?.data?.phone);
            setcity(response?.data?.city);
            setzip(response?.data?.zipcode);
            setaddress(response?.data?.address);
            setaddress2(response?.data?.address2);
            setrole(response?.data?.role);
            setisprofileupdated(response?.data?.isUpdated);
            setmaxcatagoryselection(response?.data?.maxCatagorySelect);
            setmaxareaselection(response?.data?.maxAreaSelect);
            setalldata(response?.data);

            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setfetchloading(false);
        }
    }, [id, token]);


    // Simulate fetching user data
    useEffect(() => {

        fetching(id, token);

    }, [id, token, fetching]);





    console.log(alldata);







    /************** handle profile update function here` ******************/
    const handleUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);

        const passdata = {
            fname,
            mname,
            lname,
            email,
            phone,
            city,
            zipcode: zip,
            address,
            address2,
            role,
            isUpdated: isprofileupdated,
            maxCatagorySelect: maxcatagoryselection,
            maxAreaSelect: maxareaselection,
        }

        const response = await MakePut(`user/${id}`, passdata, token);

        if (response?.success) {
            toast.success(response?.message);
            setisedit(false);
            fetching(id, token);
        } else {
            toast.error('Something went Wrong');
        }

        setLoading(false);

    };



    return (
        <div className="flex justify-center items-center">
            <div className="w-full">

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Single User Information
                    </h1>
                    <div>
                        {
                            isedit ? (
                                <button onClick={() => { setisedit(false) }} className="bg-yellow-300 cursor-pointer text-black px-2 rounded-md">Cancel</button>
                            ) : (
                                <button onClick={() => { setisedit(true) }} className="bg-green-300 text-black px-2 cursor-pointer rounded-md">Edit</button>
                            )
                        }


                    </div>
                </div>


                {
                    fetchloading ? (
                        // Skeleton Loading
                        <ProfileSkleton />
                    ) : (
                        <div className="space-y-5">

                            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                                {/* Name */}
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Frist Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={fname}
                                        disabled={!isedit}
                                        onChange={(e) => { setfname(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Middle Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={mname}
                                        disabled={!isedit}
                                        onChange={(e) => { setmname(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={lname}
                                        disabled={!isedit}
                                        onChange={(e) => { setlname(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-3">


                                {/* Email */}
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        disabled={true}
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* phone */}
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        disabled={!isedit}
                                        value={phone && phone != null ? phone : ""}
                                        onChange={(e) => { setphone(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>


                                {/* Role */}
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Role</label>
                                    <select
                                        name="isprofileupdated"
                                        disabled={!isedit}
                                        value={role}
                                        onChange={(e) => { setrole(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="user">user</option>
                                        <option value="provider">Service Provider</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>



                            </div>

                            {/* Address */}

                            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">City</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        disabled={!isedit}
                                        value={city && city != null ? city : ""}
                                        onChange={(e) => { setcity(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        disabled={!isedit}
                                        value={zip && zip != null ? zip : ""}
                                        onChange={(e) => { setzip(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Address</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        disabled={!isedit}
                                        value={address && address != null ? address : ""}
                                        onChange={(e) => { setaddress(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Address Two</label>
                                <textarea
                                    name="address"
                                    value={address2 && address2 != null ? address2 : ""}
                                    disabled={!isedit}
                                    onChange={(e) => { setaddress2(e.target.value) }}
                                    rows="6"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                ></textarea>
                            </div>



                            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Is Profile Update</label>
                                    <select
                                        name="isprofileupdated"
                                        disabled={!isedit}
                                        value={isprofileupdated}
                                        onChange={(e) => { setisprofileupdated(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Max Cetagory Selection</label>
                                    <input
                                        type="number"
                                        name="maxcatagoryselection"
                                        disabled={!isedit}
                                        value={maxcatagoryselection && maxcatagoryselection != null ? maxcatagoryselection : ""}
                                        onChange={(e) => { setmaxcatagoryselection(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-gray-700 mb-1">Max Area Selection</label>
                                    <input
                                        type="number"
                                        name="maxareaselection"
                                        disabled={!isedit}
                                        value={maxareaselection && maxareaselection != null ? maxareaselection : ""}
                                        onChange={(e) => { setmaxareaselection(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>




                            {/* Update Button */}
                            <div className="w-full flex justify-end">
                                <button
                                    disabled={!isedit}
                                    onClick={(e) => { handleUpdate(e) }}
                                    className="w-fit px-3 bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-600 transition flex items-center justify-center gap-2"
                                >

                                    {
                                        isLoading && <div className="w-[20px] h-[20px] rounded-full border-b-3 border-l-3 bordergray-50 animate-spin">
                                        </div>
                                    }

                                    Update Update User Info
                                </button>
                            </div>
                        </div>
                    )

                }



            </div>
        </div >
    );
}
















const ProfileSkleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="flex justify-end">
                <div className="h-12 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}