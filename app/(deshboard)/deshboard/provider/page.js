'use client'


import Development from "@/app/componnent/Development";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const About = () => {


    const Router = useRouter();

    useEffect(() => {
        Router.push("/deshboard/provider/myservices");
    }, []);



    return (
        <div>
            <Development />
        </div>
    )
}

export default About;