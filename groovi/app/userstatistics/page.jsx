'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button} from "@nextui-org/button";
import {Spinner} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import './page.css'

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

    return (
        <div className="text-center justify-center">
            {error ? (
                <h2>Error: {error}</h2>
            ) : (
                <>
                    <div className={'flex items-center justify-end p-10'}>
                        <h2 className={'text-2xl font-bold mx-5'}>Welcome {user.display_name}!</h2>

                        {user.images && user.images.length > 0 ? (
                            <img width={'50px'} height={'50px'} src={user.images[0].url} alt={'avatar'}
                                 className={'rounded-3xl'}/>
                        ) : (<h1>No image</h1>)}</div>


                    <div className={'flex justify-between items-center mx-10 mb-10'}>
                        <Select
                            placeholder="Artist or Track"
                            className="max-w-xs"
                        >
                            {types.map((type) => (
                                <SelectItem key={type.key} value={type.key}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            placeholder="Time"
                            className="max-w-xs"
                        >
                            {timeRange.map((time) => (
                                <SelectItem key={time.key} value={time.key}>
                                    {time.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            placeholder="Amount"
                            className="max-w-xs"
                        >
                            {limits.map((limit) => (
                                <SelectItem key={limit.key} value={limit.key}>
                                    {limit.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className={'justify-center w-[50%] glass-div p-10 overflow-auto absolute h-[70vh]'}>
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

                </>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
}