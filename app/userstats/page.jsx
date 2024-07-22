'use client'

import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button, Card, CardFooter, CardHeader, Spinner} from "@nextui-org/react";
import Image from 'next/image';
import sade from '@/public/sade.png';
import travis from '@/public/travis.png';
import abel from '@/public/abel.png';
import {motion} from "framer-motion";
import Link from "next/link";
import {IoIosArrowForward} from "react-icons/io";

export default function UserStats() {
    return (
        <div className="text-center justify-center">
            <div className="text-center font-bold w-full">
                <div className="pb-20 md:pt-0 pt-24 text-center w-full">
                    <div className="flex md:text-6xl text-xl text-center items-center justify-center">
                        <h1>Your music,</h1>
                        <h1 className="greenword md:mx-4 mx-2">your stats,</h1>
                        <h1>your story</h1>
                    </div>
                    <h1 className="text-tiny md:text-xl pt-4 text-[#7E7E7] font-bold">How are we feeling today?</h1>
                </div>

                <div className="md:flex block justify-center w-full">
                    <Link href="userstats/artists">
                        <motion.div whileHover={{scale: 1.08, transition: {duration: 0.3}}}
                                    className="flex justify-center">
                            <Card isFooterBlurred isPressable
                                  className="border-none bg-background/60 dark:bg-default-100/50 md:w-[20vw] w-[80%] m-5 ">
                                <CardHeader className="absolute z-10 top-1 flex-col items-start"/>
                                <Image
                                    removeWrapper
                                    alt="Card example background"
                                    className="z-0 w-full h-full scale-100 object-cover opacity-80"
                                    src={sade}
                                />
                                <CardFooter
                                    className="absolute bg-white/30 bottom-0 z-20 justify-start flex-col items-start">
                                    <p className="text-tiny uppercase font-bold">view</p>
                                    <div className="flex justify-center items-center">
                                        <h4 className="text-black text-2xl">Top Artists</h4>
                                        <IoIosArrowForward className="text-black " size={20}/>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </Link>

                    <Link href="userstats/tracks">
                        <motion.div whileHover={{scale: 1.08, transition: {duration: 0.3}}}
                                    className="flex justify-center">
                            <Card isFooterBlurred isPressable
                                  className="border-none bg-background/60 dark:bg-default-100/50 md:w-[20vw] w-[80%] m-5">
                                <CardHeader className="absolute z-10 top-1 flex-col items-start"/>
                                <Image
                                    removeWrapper
                                    alt="Card example background"
                                    className="z-0 w-full h-full scale-100 object-cover opacity-80"
                                    src={travis}
                                />
                                <CardFooter
                                    className="absolute bg-white/30 bottom-0 z-20 justify-start flex-col items-start">
                                    <p className="text-tiny uppercase font-bold text-white">view</p>
                                    <div className="flex justify-center items-center">
                                        <h4 className="text-2xl text-white">Top Tracks</h4>
                                        <IoIosArrowForward className="text-white" size={20}/>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </Link>


                        <motion.div whileHover={{scale: 1.08, transition: {duration: 0.3}}}
                                    className="flex justify-center">
                            <Card isFooterBlurred isPressable isDisabled
                                  className="border-none bg-background/60 dark:bg-default-100/50 md:w-[20vw] w-[80%] m-5">
                                <CardHeader className="absolute z-10 top-1 flex-col items-start"/>
                                <Image
                                    removeWrapper
                                    alt="Card example background"
                                    className="z-0 w-full h-full scale-100 object-cover opacity-80"
                                    src={abel}
                                />
                                <CardFooter
                                    className="absolute bg-white/30 bottom-0 z-20 justify-start flex-col items-start">
                                    <p className="text-tiny uppercase font-bold">view</p>
                                    <div className="flex justify-center items-center">
                                        <h4 className="text-black text-2xl">Top Genres</h4>
                                        <IoIosArrowForward className="text-black" size={20}/>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>

                </div>
            </div>
        </div>
    );
}
