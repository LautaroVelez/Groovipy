'use client'
import {Button} from "@nextui-org/button";
import Image from 'next/image';
import gif from '../../public/gif.gif';
import {Pacifico} from 'next/font/google';

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
});

export default function Landing() {
    const CLIENT_ID = "9e21c2f01ec54a98aeed0aa8bc9c2c11";
    const REDIRECT_URI = "http://localhost:3000/userstatistics";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = [
        "user-read-private",
        "user-top-read"
    ].join("%20");

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            <div className="text-center text-3xl md:text-5xl font-bold z-10 p-4">
                <div className="flex flex-wrap justify-center items-center">
                    <h1 className="mr-2">¡Get your</h1>
                    <h1 className="greenword mx-3">spotify</h1>
                    <h1 className="ml-2">statistics</h1>
                </div>
                <div className="flex flex-wrap justify-center items-center mt-4">
                    <h1 className="mr-2">with</h1>
                    <h1 className={`greenword mx-4 md:text-6xl text-3xl mb-3 ${pacifico.className}`}>groovy!</h1>
                </div>
                <div className="justify-center flex">
                    <Image
                        src={gif}
                        alt="Groovy GIF"
                        width={300}
                        height={300}
                        priority // Ensure the GIF is prioritized for loading
                        unoptimized
                    />
                </div>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>Login to Spotify</a>
            </div>
        </div>
    );
}