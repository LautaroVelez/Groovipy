'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button} from "@nextui-org/button";
import {Spinner} from "@nextui-org/react";

export default function UserStatistics() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [topArtists, setTopArtists] = useState([]);

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

        const getUserTopArtists = async () => {
            try {
                const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0", {
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
            getUserTopArtists();
        } else {
            setError("No token found. Please login again.");
        }
    }, []);

    return (
        <div className="text-center">
            <h1>Display your Spotify profile data</h1>
            {error ? (
                <h2>Error: {error}</h2>
            ) : (
                <>
                    <h2>Logged in as {user.display_name}</h2>
                    {user.images && user.images.length > 0 ? (
                        <img width={'200px'} height={'200px'} src={user.images[0].url} alt={'avatar'}/>
                    ) : (<h1>No image</h1>)}

                    <h1>Top Artists (Short Term)</h1>
                    {topArtists.map((artist, index) => (
                        <div key={index}>
                            <h2>{artist.name}</h2>
                            {artist.images && artist.images.length > 0 ? (
                                <img width={'200px'} height={'200px'} src={artist.images[0].url} alt={'artist avatar'}/>
                            ) : (
                                <h3>No image</h3>
                            )}
                        </div>
                    ))}
                </>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
}