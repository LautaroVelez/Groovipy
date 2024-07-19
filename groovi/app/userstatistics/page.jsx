'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button} from "@nextui-org/button";
import {Card, CardFooter, CardHeader, Checkbox, Spinner} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import './page.css'
import {pacifico} from "@/app/landing/page";
import Image from 'next/image';
import ansiedak from '@/public/ansiedak.png'
import sade from '@/public/sade.png'
import kendrick from '@/public/kendrick.png'
import ronpe from '@/public/ronpe.png'
import wos from '@/public/wos.png'
import mac from '@/public/mac.png'
import travis from '@/public/travis.png'
import abel from '@/public/abel.png'

export default function UserStats() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [topArtists, setTopArtists] = useState([]);

    const types = [{
        key: "artist", label: "Artist"
    }, {
        key: 'tracks', label: 'Tracks'
    }]

    const timeRange = [{
        key: "short_term", label: '1 Month ago'
    }, {
        key: "medium_term", label: '6 Months ago'
    }, {
        key: "long_term", label: 'A year ago '
    },
    ]

    const limits = [{
        key: '5', label: '5'
    },
        {key: '10', label: '10'},
        {key: '20', label: '20'},
        {key: '50', label: '50'}

    ]

    const CLIENT_ID = "9e21c2f01ec54a98aeed0aa8bc9c2c11";
    const REDIRECT_URI = "http://localhost:3000/userstatistics";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

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
                    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
                } else {
                    setError(error.response?.data?.error?.message || error.message);
                }
            }
        };

        const getUserTop = async () => {
            try {
                const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTopArtists(data.items);
            } catch (error) {
                if (error.response?.data?.error?.message === "The access token expired") {
                    logout();
                    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
                } else {
                    setError(error.response?.data?.error?.message || error.message);
                }
            }
        };

        if (token) {
            getUser();
            getUserTop();
        } else {
            setError("No token found. Please login again.");
        }
    }, []);

    const HandleSelects = async (e) => {

        try {
            const {data} = await axios.get(`https://api.spotify.com/v1/me/top/${types.value}?time_range=${timeRange.value}&limit=${limits.value}&offset=0`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTopArtists(data.items);
        } catch (error) {
            if (error.response?.data?.error?.message === "The access token expired") {
                logout();
                window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
            } else {
                setError(error.response?.data?.error?.message || error.message);
            }
        }
    };


    return (
        <div className="text-center justify-center">
            {error ? (
                <div>
                    <h2>Error: {error}</h2>
                    <button onClick={logout}>Refresh Token</button>
                </div>
            ) : (
                <div className={'text-center font-bold w-full'}>
                    <div className={'pb-20 text-center w-full'}>
                        <div className={'flex text-6xl text-center items-center justify-center'}>
                            <h1>Your music, </h1>
                            <h1 className={`greenword mx-4`}> your stats,</h1>
                            <h1> your story</h1>
                        </div>
                        <h1 className={'text-2xl pt-4 text-[#7E7E7] font-bold'}>¿How are we feeling like today?</h1>
                    </div>

                    <div className={'flex '}>
                        <Card isFooterBlurred isPressable
                              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[20vw] mx-10">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">view</p>
                                <h4 className="text-black font-bold text-3xl underline ">Top Artists</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card example background"
                                className="z-0 w-full h-full scale-100  object-cover opacity-80"
                                src={sade}
                            />
                            <CardFooter
                                className="absolute bg-white/30 bottom-0 z-10 justify-between">

                                <Button className="text-tiny" color="success" radius={'md'} size="md">
                                    <b>Get my top artists </b>

                                </Button>
                            </CardFooter>
                        </Card>

                        <Card isFooterBlurred isPressable
                              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[20vw] mx-10">
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny text-white uppercase font-bold">view</p>
                                <h4 className="text-white font-bolder text-3xl underline ">Top Tracks</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card example background"
                                className="z-0 w-full h-full scale-100  object-cover  opacity-80"
                                src={travis}
                            />
                            <CardFooter
                                className="absolute bg-white/30 bottom-0 z-10 justify-between">

                                <Button className="text-tiny" color="success" radius={'md'} size="md">
                                    <b>Get my top tracks </b>

                                </Button>
                            </CardFooter>
                        </Card>

                        <Card isFooterBlurred isPressable
                              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[20vw] mx-10">
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny  uppercase font-bold">view</p>
                                <h4 className="text-white font-bolder text-3xl underline ">Top Genres</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card example background"
                                className="z-0 w-full h-full scale-100  object-cover  opacity-80"
                                src={abel}
                            />
                            <CardFooter
                                className="absolute bg-white/30 bottom-0 z-10 justify-between">

                                <Button className="text-tiny" color="success" radius={'md'} size="md">
                                    <b>Get my top genres </b>

                                </Button>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            )}

        </div>
    );
}
/*
<div className={'justify-end items-center flex'}>
    <div className={'flex items-center justify-end p-10'}>
        <h2 className={'text-2xl font-bold mx-5'}>Welcome {user.display_name}!</h2>

        {user.images && user.images.length > 0 ? (
            <>
                <img width={'50px'} height={'50px'} src={user.images[0].url} alt={'avatar'}
                     className={'rounded-3xl'}/>

            </>
        ) : (<h1>No image</h1>)}</div>
</div>


<form onSubmit={HandleSelects}>
    <div className={'flex justify-between items-center mx-5 mb-10'}>
        <Select
            label="Artist or Track"
            className="max-w-xs"
        >
            {types.map((type) => (
                <SelectItem key={type.key} value={type.key} onChange={HandleSelects}>
                    {type.label}
                </SelectItem>
            ))}
        </Select>

        <Select
            label="Time"
            className="max-w-xs"
        >
            {timeRange.map((time) => (
                <SelectItem key={time.key} value={time.key} onChange={HandleSelects}>
                    {time.label}
                </SelectItem>
            ))}
        </Select>

        <Select
            label="Amount"
            className="max-w-xs"
        >
            {limits.map((limit) => (
                <SelectItem key={limit.key} value={limit.key} onChange={HandleSelects}>
                    {limit.label}
                </SelectItem>
            ))}
        </Select>

        <Button size={'md'} type={'submit'} color={"success"} className={'w-60'}>Generate</Button>
    </div>
</form>

<div className={'flex justify-center'}>
    <div className={'justify-center w-[60%] glass-div p-10 overflow-auto absolute h-[70vh]'}>
        <div className={'justify-between flex'}>
            <Checkbox defaultSelected size={'lg'} color={"success"}>Names</Checkbox>
            <Checkbox defaultSelected size={'lg'} color={"success"}>Images</Checkbox>
        </div>
        {topArtists.map((artist, index) => (
            <div key={index}
                 className={'text-start w-full flex justify-between items-center relative mb-10 bg-zinc-100 p-4 rounded-2xl'}>
                <h1 className={'text-3xl font-bold'}>{artist.name}</h1>
                {artist.images && artist.images.length > 0 ? (
                    <img width={'100px'} height={'100px'} src={artist.images[0].url}
                         alt={'artist avatar'} className={'rounded-2xl'}/>
                ) : (
                    <h3>No image</h3>
                )}
            </div>
        ))}
    </div>
</div>

 */