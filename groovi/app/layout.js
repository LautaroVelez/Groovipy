import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Image from "next/image";
import bg from "@/public/bg.jpg";
import groovy from '@/public/groovy.png';
import {Pacifico} from "next/font/google";
import Link from "next/link";
import {Button} from "@nextui-org/button";
import {FaSpotify} from "react-icons/fa";

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
});

export default function RootLayout({children}) {
    const CLIENT_ID = "9e21c2f01ec54a98aeed0aa8bc9c2c11";
    const REDIRECT_URI = "http://localhost:3000/userstats";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = [
        "user-read-private",
        "user-top-read"
    ].join("%20");

    return (
        <html lang="en">
        <body>
        <NextUIProvider>
            <header className={'fixed top-0 left-0 w-full z-20'}>
                <div className={'w-full mx-10 justify-between flex bg-transparent border-b items-center'}>
                    <Link href={'/'}>
                        <div className={'flex justify-start items-center text-end h-[8vh]  bg-transparent'}>
                            <Image src={groovy} width={70} height={'auto'} alt={'groovy'} priority/>
                            <h3 className={`${pacifico.className} text-xl`}>groovy</h3>
                        </div>
                    </Link>
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>
                        <Button className={'bg-[#1E452E] text-[#1ED760] mr-20'} size={'md'}
                                startContent={<FaSpotify/>}>Connect</Button>
                    </a>
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
                <div className={'z-10 w-full h-full flex justify-center items-center'}>
                    {children}
                </div>
            </div>
        </NextUIProvider>
        </body>
        </html>
    );
}