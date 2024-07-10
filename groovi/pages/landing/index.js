'use client'
import {Button, ButtonGroup} from "@nextui-org/button";
import Image from 'next/image'
import bg from '../../public/bg.jpg'
import gif from '../../public/gif.gif'

export default function Landing() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            <Image src={bg} className="absolute inset-0 -z-10 bg-cover object-cover opacity-55" fill={true}/>
            <div className="text-center text-3xl md:text-5xl font-bold z-10 p-4">
                <div className="flex flex-wrap justify-center items-center">
                    <h1 className="mr-2">Get your</h1>
                    <h1 className="accent-green-600 mx-3">spotify</h1>
                    <h1 className="ml-2">statistics</h1>
                </div>
                <div className="flex flex-wrap justify-center items-center mt-4">
                    <h1 className="mr-2">with</h1>
                    <h1 className="accent-green-600 mx-4">groovy</h1>
                </div>
                <div>
                    <Image src={gif} width={300} height={300}></Image>
                </div>
            </div>
        </div>
    )
}