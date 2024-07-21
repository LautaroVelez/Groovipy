'use client'

import "./globals.css";
import {NextUIProvider, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Image from "next/image";
import bg from "@/public/bg.jpg";
import groovy from '@/public/groovy.png';
import {Pacifico} from "next/font/google";
import {FaSpotify} from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";


const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
});

export default function RootLayout({children}) {
    const [token, setToken] = useState("");
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const CLIENT_ID = "9e21c2f01ec54a98aeed0aa8bc9c2c11";
    const REDIRECT_URI = "http://localhost:3000/userstats";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = ["user-read-private", "user-top-read"].join("%20");

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
        window.location.href = "/";
    };

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            const accessToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"));
            if (accessToken) {
                token = accessToken.split("=")[1];
                window.location.hash = "";
                window.localStorage.setItem("token", token);
            }
        }

        setToken(token);

        const getUser = async () => {
            try {
                const {data} = await axios.get("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(data);
            } catch (error) {
                if (error.response?.data?.error?.message === "The access token expired") {
                    logout();
                } else {
                    setError(error.response?.data?.error?.message || error.message);
                }
            }
        };

        if (token) {
            getUser();
        }
    }, [token]);

    return (
        <html lang="en">
        <body>
        <NextUIProvider>
            <header className="fixed top-0 left-0 w-full z-20">
                <div className="w-full mx-10 justify-between flex bg-transparent border-b items-center">
                    <Link href="/" color="foreground">
                        <div className="flex justify-start items-center text-end h-[8vh] bg-transparent">
                            <Image src={groovy} width={70} height="auto" alt="groovy" priority/>
                            <h3 className={`${pacifico.className} text-xl`}>groovy</h3>
                        </div>
                    </Link>

                    {token ? (
                        <div className={'mr-20'}>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant={'outlined'}>
                                        <div className="flex items-center text-center">
                                            <h1 className={'pr-2 text-zinc-800 font-bold md:block hidden'}>
                                                Hello {user?.display_name}!</h1>
                                            {user?.images && user.images.length > 0 && (
                                                <img width="40" height="40" src={user.images[0].url} alt="avatar"
                                                     className={'rounded-3xl'}/>
                                            )}
                                              <IoIosArrowDown className={'ml-2'}/>
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="menu" href={"/userstats"}>Menu</DropdownItem>
                                    <DropdownItem key="logout" className="text-danger" color="danger" onClick={logout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ) : (
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>
                            <Button className="bg-[#1E452E] text-[#1ED760] mr-20" size="md" startContent={<FaSpotify/>}>
                                Connect
                            </Button>
                        </a>
                    )}
                </div>
            </header>
            <div className="relative min-h-screen min-w-screen flex items-center justify-center overflow-hidden">
                <Image
                    src={bg}
                    alt="Background"
                    className="absolute z-0 bg-cover object-cover w-full h-full opacity-10"
                    fill={true}
                    priority
                />
                <div className="z-10 w-full h-full flex justify-center items-center">
                    {children}
                </div>
            </div>
        </NextUIProvider>
        </body>
        </html>
    );
}