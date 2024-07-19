import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Image from "next/image";
import bg from "@/public/bg.jpg";
import groovy from '@/public/groovy.png'
import {Pacifico} from "next/font/google";
import Link from "next/link";
import {Button} from "@nextui-org/button";
import {FaSpotify} from "react-icons/fa";


const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
});
export default function RootLayout({children}) {


    return (
        <html lang="en">
        <body>
        <NextUIProvider>
            <header className={'fixed top-0 left-0 w-full'}>
                <div className={'w-[98vw] justify-between flex bg-transparent border-b items-center '}>
                    <div className={'flex justify-start items-center text-end h-[8vh] m-0 bg-transparent z-10 '}>
                        <Image src={groovy} width={70} height={5} alt={'groovy'} className={'ml-5'}/>
                        <h3 className={`${pacifico.className} text-xl`}>groovy</h3>
                    </div>
                    <Button className={'bg-[#1E452E] text-[#1ED760] m-2'} size={'md'}
                            startContent={<FaSpotify/>}>Connect</Button>
                </div>
            </header>
            <div className="relative min-h-screen items-center justify-center">
                <Image
                    src={bg}
                    alt="Background"
                    className="absolute inset-0 -z-20 bg-cover object-cover opacity-10"
                    fill={true}
                    priority
                />
                <div className={'relative z-10'}>
                    {children}
                </div>
            </div>
        </NextUIProvider>
        </body>
        </html>
    );
}
