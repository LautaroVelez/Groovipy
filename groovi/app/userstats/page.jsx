'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button} from "@nextui-org/button";
import {Card, CardFooter, CardHeader, Checkbox, Spinner} from "@nextui-org/react";
import './page.css'
import Image from 'next/image';
import sade from '@/public/sade.png'
import travis from '@/public/travis.png'
import abel from '@/public/abel.png'
import {motion} from "framer-motion"
import Link from "next/link";
import {IoIosArrowForward} from "react-icons/io";


export default function UserStats() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [topArtists, setTopArtists] = useState([]);


    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
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
                    window.location.href = '/';
                } else {
                    setError(error.response?.data?.error?.message || error.message);
                }
            }
        };

        if (token) {
            getUser();
        } else {
            setError("No token found. Please login again.");
        }
    }, []);


    return (
        <div className="text-center justify-center">
            {error ? (
                <div>
                    <h2>Error: {error}</h2>
                    <button onClick={logout}>Refresh Token</button>
                </div>
            ) : (
                <div className={'text-center font-bold w-full'}>
                    <div className={'pb-20 md:pt-0 pt-40 text-center w-full'}>
                        <div className={'flex md:text-6xl text-3xl text-center items-center justify-center'}>
                            <h1>Your music, </h1>
                            <h1 className={`greenword mx-4`}> your stats,</h1>
                            <h1> your story</h1>
                        </div>
                        <h1 className={'text-2xl pt-4 text-[#7E7E7] font-bold'}>¿How are we feeling like today?</h1>
                    </div>

                    <div className={'md:flex block justify-center w-full'}>
                        <Link href={'userstats/artists'}>
                            <motion.div whileHover={{
                                scale: 1.08,
                                transition: {duration: 0.3},
                            }} className={'flex justify-center'}>
                                <Card isFooterBlurred isPressable
                                      className="border-none bg-background/60 dark:bg-default-100/50 md:max-w-[20vw] max-w-xs md:mx-10">
                                    <CardHeader className="absolute z-10 top-1 flex-col items-start">

                                    </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card example background"
                                        className="z-0 w-full h-full scale-100  object-cover opacity-80"
                                        src={sade}
                                    />
                                    <CardFooter
                                        className="absolute bg-white/30 bottom-0 z-20 justify-start flex-col items-start">
                                        <p className="text-tiny uppercase font-bold">view</p>
                                        <div className={'flex justify-center items-center'}>
                                            <h4 className="text-black  text-2xl">Top Artists </h4>
                                            <IoIosArrowForward className={'w-5 h-5 mt-2'}/>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </Link>

                        <Link href={'userstats/tracks'}>
                            <motion.div whileHover={{
                                scale: 1.08,
                                transition: {duration: 0.3},
                            }} className={'flex justify-center'}>
                                <Card isFooterBlurred isPressable
                                      className="border-none bg-background/60 dark:bg-default-100/50 md:max-w-[20vw] max-w-xs md:mx-10 md:mt-0 mt-10">
                                    <CardHeader className="absolute z-10 top-1 flex-col items-start">

                                    </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card example background"
                                        className="z-0 w-full h-full scale-100  object-cover opacity-80"
                                        src={travis}
                                    />
                                    <CardFooter
                                        className="absolute bg-white/30 bottom-0 z-30 justify-start flex-col items-start">
                                        <p className="text-tiny uppercase text-white font-bold">view</p>
                                        <div className={'flex justify-center items-center'}>
                                            <h4 className="text-white  text-2xl">Top Tracks </h4>
                                            <IoIosArrowForward className={'w-5 h-5 mt-2 text-white'}/>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </Link>

                        <Link href={'userstats/genres'}>
                            <motion.div whileHover={{
                                scale: 1.08,
                                transition: {duration: 0.3},
                            }} className={'flex justify-center'}>
                                <Card isFooterBlurred isPressable
                                      className="border-none bg-background/60 dark:bg-default-100/50 md:max-w-[20vw] max-w-xs md:mx-10 md:mt-0 mt-10">
                                    <CardHeader className="absolute z-10 top-1 flex-col items-start">

                                    </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card example background"
                                        className="z-0 w-full h-full scale-100  object-cover opacity-80"
                                        src={abel}
                                    />
                                    <CardFooter
                                        className="absolute bg-white/30 bottom-0 z-30 justify-start flex-col items-start">
                                        <p className="text-tiny uppercase font-bold">view</p>
                                        <div className={'flex justify-center items-center'}>
                                            <h4 className="text-black  text-2xl">Top Genres </h4>
                                            <IoIosArrowForward className={'w-5 h-5 mt-2'}/>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </Link>

                    </div>
                </div>
            )}

        </div>
    );
}
