'use client'
import {Button} from "@nextui-org/button";
import Image from 'next/image';
import gif from '../../public/gif.gif';
import {Pacifico} from 'next/font/google';
import Link from 'next/link'
import '../globals.css'

export const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
});

export default function Landing() {
    const CLIENT_ID = "9e21c2f01ec54a98aeed0aa8bc9c2c11";
    const REDIRECT_URI = "http://localhost:3000/userstats";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = [
        "user-read-private",
        "user-top-read"
    ].join("%20");

    return (
        <div className="relative min-h-screen md:flex w-full ">
            <div className=" justify-center text-center text-4xl md:text-6xl font-bold z-10 md:flex flex-row  items-center md:justify-between ">

                <div className="md:w-[30vw] w-full pt-32 md:p-0 md:mx-48 text-center">
                    <h1 className="">Your spotify</h1>
                    <h1 className="">statistics with</h1>
                    <h1 className={`${pacifico.className} greenword md:text-6xl text-4xl text-center`}>groovy</h1>

                <a className={'md:text-2xl text-xl greenword aLink'}
                   href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>Connect
                    with Spotify </a>

                </div>

                <div className="md:justify-end flex justify-center w-full md:w-[30vw]">
                    <Image
                        src={gif}
                        alt="Groovy GIF"
                        width={400}
                        height={400}
                        priority // Ensure the GIF is prioritized for loading
                        unoptimized
                    />
                </div>

            </div>
        </div>
    );
}