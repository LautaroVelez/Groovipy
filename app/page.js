import Landing from "@/app/landing/page";
import Head from "next/head";
import {Metadata} from 'next';

export const metadata = {
    title: 'Groovy',
};

export default function Home() {
    return<Landing/>

}
