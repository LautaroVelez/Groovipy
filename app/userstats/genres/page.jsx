'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {Tabs, Tab, Divider, useDisclosure} from "@nextui-org/react";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {IoCalendarOutline} from "react-icons/io5";
import '@/app/globals.css'
import {motion} from "framer-motion"

export default function Genres() {
    const [topGenres, setTopGenres] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState("short_term");

    const [token, setToken] = useState(null);
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        const getUserTop = async () => {
            try {
                const {data} = await axios.get(`https://api.spotify.com/v1/me/top/genres?time_range=${selectedTerm}&limit=50&offset=0`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTopGenres(data.items);
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
            <div className={'w-[80vw] pb-20 justify-center flex'}>
                <Tabs fullWidth size={'lg'} color={'success'} radius="full" variant={'solid'}
                      className={'text-black font-bold'}
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


            <div
                className={'flex justify-center items-center isolate rounded-3xl bg-white/2 backdrop-blur-sm shadow-lg ring-1 ring-black/5'}>
                <div className={' justify-center items-center overflow-y-auto overflow-x-hidden h-[60vh] w-full z-20'}>
                    {topGenres.map((genre, index) => (
                        <>
                            <motion.div whileHover={{scale: 1.02, transition: {duration: 0.2}}}>
                                <div key={index}
                                     className={'text-start flex justify-between items-center relative z-20 px-5'}>
                                    <div className={'flex'}>
                                        <h1 className={'text-3xl font-bold ml-2'}>{index + 1}-</h1>
                                        <h1 className={'text-3xl font-bold ml-2'}>{genre.name}</h1>
                                    </div>
                                    {genre.images && genre.images.length > 0 ? (

                                        <img width={'100px'} height={'auto'} src={genre.images[0].url}
                                             alt={'artist avatar'} className={'rounded-2xl z-30'}/>

                                    ) : (
                                        <h3>No image</h3>
                                    )}
                                </div>
                                <Divider orientation={"horizontal"} className={' mb-2 mt-2'}/>
                            </motion.div>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
}
