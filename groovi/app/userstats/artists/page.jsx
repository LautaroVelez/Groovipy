'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {Tabs, Tab, Divider} from "@nextui-org/react";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {IoCalendarOutline} from "react-icons/io5";
import '@/app/globals.css'

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

                if (token) {
                    getUserTop();
                }


    }, []);

    return (


        <div>
            <div className={'w-[80vw] pb-20 justify-center flex'}>
                <Tabs fullWidth size={'lg'} color={'success'} radius="full" variant={'solid'}
                      className={'text-black font-bold'}>
                    <Tab key="last-month" title={
                        <div className="flex items-center space-x-2">
                            <IoCalendarNumberOutline/>
                            <span>Last month</span>
                        </div>}/>
                    <Tab key="music" title={
                        <div className="flex items-center space-x-2">
                            <MdOutlineCalendarMonth/>
                            <span>Last 6 months</span>
                        </div>}/>
                    <Tab key="videos" title={
                        <div className="flex items-center space-x-2">
                            <IoCalendarOutline/>
                            <span>Last Year</span>
                        </div>}/>
                </Tabs>
            </div>


            <div
                className={'flex justify-center items-center isolate rounded-3xl bg-white/2 backdrop-blur-sm shadow-lg ring-1 ring-black/5'}>
                <div className={' justify-center items-center overflow-auto h-[60vh] w-full z-20'}>
                    {topArtists.map((artist, index) => (
                        <>
                            <div key={index}
                                 className={'text-start  flex justify-between items-center relative'}>
                                <h1 className={'text-3xl font-bold ml-2'}>{artist.name}</h1>
                                {artist.images && artist.images.length > 0 ? (
                                    <img width={'50px'} height={'auto'} src={artist.images[0].url}
                                         alt={'artist avatar'} className={'rounded-2xl'}/>
                                ) : (
                                    <h3>No image</h3>
                                )}
                            </div>
                            <Divider orientation={"horizontal"} className={' mb-2 mt-2'}/>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
}
