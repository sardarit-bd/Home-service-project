'use client'


import getId from "@/utilis/helper/cookie/getid";
import { useEffect, useState } from "react";
import { LiaCoinsSolid } from "react-icons/lia";

const CreditPoint = () => {



    const [allpoint, setallpoint] = useState([]);
    const myid = getId();

    async function fetchAllCreditsPoint() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allcredits`);
        const data = await res.json();
        setallpoint(data.data);
    }


    useEffect(() => {
        await fetchAllCreditsPoint();
    }, [])


    const myCredit = allpoint?.filter((item) => {
        return item?.userId == myid;
    });


    return (
        <div className="text-gray-600 text-md font-semibold hover:bg-gray-200 rounded-md p-2 flex items-center gap-2">
            <LiaCoinsSolid className="text-xl" />
            <span className="flex items-center gap-1">My Credit :<span className="text-sm bg-green-100 border border-green-200 rounded-md w-fit pr-0.5">{myCredit?.length || 0}</span> </span>
        </div>
    )
}

export default CreditPoint;