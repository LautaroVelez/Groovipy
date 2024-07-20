'use client'
import {useEffect, useState} from "react";
import axios from "axios";

export default function Artists() {
    const [topArtists, setTopArtists] = useState([]);
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    useEffect(() => {
        const getUserTop = async () => {
            try {
                const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTopArtists(data.items);
            } catch (error) {
                console.log(`hubo un error: ${error.message}`)
            }
        };

        if(token){
            getUserTop();
        }

    },[]);

    return (
        <>
            <div className={'flex justify-center items-center '}>
                <div className={'justify-center items-center pt-50 glass-div  overflow-auto absolute h-[100vh]'}>

                    {topArtists.map((artist, index) => (
                        <div key={index}
                             className={'text-start w-full flex justify-between items-center relative mb-10 bg-zinc-100 rounded-2xl'}>
                            <h1 className={'text-4xl font-bold'}>{artist.name}</h1>
                            {artist.images && artist.images.length > 0 ? (
                                <img width={'80px'} height={'80px'} src={artist.images[0].url}
                                     alt={'artist avatar'} className={'rounded-2xl'}/>
                            ) : (
                                <h3>No image</h3>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}