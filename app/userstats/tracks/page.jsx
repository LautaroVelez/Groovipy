'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {Tabs, Tab, Divider, useDisclosure} from "@nextui-org/react";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {IoCalendarOutline} from "react-icons/io5";
import '@/app/globals.css'
import {motion} from "framer-motion"
import {FaSpotify} from "react-icons/fa";

export default function Tracks() {
    const [topTracks, setTopTracks] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState("short_term");
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    useEffect(() => {
        const getUserTop = async () => {
            try {
                const {data} = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTerm}&limit=50&offset=0`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTopTracks(data.items);
            } catch (error) {
                console.log(`hubo un error: ${error.message}`)
            }
        };

        if (token) {
            getUserTop();
        }


    }, [selectedTerm, token]);

    return (
        <div>
            <div className={'w-[80vw] justify-center items-center flex text-center'}>

                <div className={'w-full flex justify-center'}>
                <Tabs fullWidth size={'lg'} color={'success'} radius="full" variant={'solid'}
                      className={'text-black p-10 w-full'}
                      selectedKey={selectedTerm}
                      onSelectionChange={setSelectedTerm}
                >
                    <Tab key="short_term" title={
                        <div className="flex items-center space-x-2">
                            <IoCalendarNumberOutline/>
                            <span>Last month</span>
                        </div>}/>
                    <Tab key="medium_term" title={
                        <div className="flex items-center space-x-2">
                            <MdOutlineCalendarMonth/>
                            <span>Last 6 months</span>
                        </div>}/>
                    <Tab key="long_term" title={
                        <div className="flex items-center space-x-2">
                            <IoCalendarOutline/>
                            <span>Last Year</span>
                        </div>}/>
                </Tabs>
</div>
            </div>

            <div className={'flex justify-between pb-2 sticky '}>
                <h1 className={'text-gray-500 w-[30%] pl-20'}>Song</h1>
                <h1 className={'text-gray-500  w-[42%]'}>Album</h1>

            </div>

            <div
                className={'flex justify-center items-center isolate rounded-3xl bg-white/2 backdrop-blur-sm shadow-lg ring-1 ring-black/5 '}>

                <div className={' justify-center items-center overflow-y-auto overflow-x-hidden h-[70vh] w-full z-20'}>


                    {topTracks.map((track, index) => (
                        <>
                            <motion.div whileHover={{scale: 1.02, transition: {duration: 0.2}}} key={index}>
                                <div key={index}
                                     className={'flex justify-between items-center relative z-20 p-2'}>
                                    <div className={'flex w-[50%]'}>
                                        <div className={'flex items-center'}>
                                            <h1 className={'text-xl ml-2 items-center font-bold'}>{index + 1}</h1>
                                            <Divider orientation={'vertical'} className={'mx-3 '}/>
                                        </div>
                                        <div className={'flex-col'}>
                                            <h1 className={'text-2xl font-bold text-gray-800'}>{track.name}</h1>
                                            <h1 className={' font-bold text-gray-500 text-tiny'}>{track.artists[0].name}</h1>
                                        </div>
                                    </div>
                                    <div className={'w-[20%]'}>
                                        <h1 className={'text-xl  ml-2 font-thin'}>{track.album.name}</h1>
                                    </div>

                                    <div className={'flex items-center text-center w-[5%]'}><a
                                        href={track.external_urls.spotify}
                                        className={'flex items-center text-center mx-1 text-[#2fd566]'}><FaSpotify
                                        className={'w-[20px] h-auto'}/></a></div>
                                    {track.album.images && track.album.images.length > 0 ? (
                                        <img width="100" height="auto" src={track.album.images[0].url}
                                             alt="album cover" className={'rounded-3xl z-30'} key={index}/>

                                    ) : (
                                        <h3>No image</h3>
                                    )}
                                </div>
                                <Divider orientation={" horizontal"}/>
                            </motion.div>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
}
