'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import Image from 'next/image';

export default function UserStatistics() {
    const [token, setToken] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)


        if (token) {
            const getUser = async (e) => {
                const {data} = await axios.get("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setUser(data)
            }

            getUser()
        }
    }, [])

    return (
        <div className="text-center">
            <h1>Display your Spotify profile data</h1>
                <h2>Logged in as {user.display_name}</h2>
        </div>
    );
}