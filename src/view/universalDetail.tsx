import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    getTitleCast_Crew,
    getTitleDetails,
    getTitleEpisodes,
    getTitleSeasons,
    getTitleStreamingSources
} from "../services/userService"

import {
    useResTitleCast_CrewState,
    useResTitleDetailState,
    useResTitleEpisodeState,
    useResTitleSeasonState,
    useResTitleStreamingSourceState
} from '../state/useTitleState'
import { useStateGeneral } from '../state/useStateGeneral'
import { useGlobal } from "../context/GlobalContext";

const UniversalDetail: React.FC = () => {
    const { setSelectNav } = useStateGeneral()
    const navigate = useNavigate()

    const { resTitleDetail, setResTitleDetail } = useResTitleDetailState()
    const { resTitleStreamingSource, setResTitleStreamingSource } = useResTitleStreamingSourceState()
    const { resTitleSeasons, setResTitleSeasons } = useResTitleSeasonState()
    const { resTitleEpisodes, setResTitleEpisode } = useResTitleEpisodeState()
    const { resTitleCast, resTitleCrew, setResTitleCast, setResTitleCrew, setResTitleCastCrew } = useResTitleCast_CrewState()

    const getApiTitleDetails = async (titleId: number) => {
        try {
            const res = await getTitleDetails(titleId)
            setResTitleDetail(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getTitleDetails", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getTitleDetails")
        }
    }

    const getApiTitleStreamingSources = async (titleId: number) => {
        try {
            const res = await getTitleStreamingSources(titleId)
            setResTitleStreamingSource(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getTitleStreamingSources", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getTitleStreamingSources")
        }
    }

    const getApiTitleSeasons = async (titleId: number) => {
        try {
            const res = await getTitleSeasons(titleId)
            setResTitleSeasons(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getTitleSeasons", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getTitleSeasons")
        }
    }

    const getApiTitleEpisodes = async (titleId: number) => {
        try {
            const res = await getTitleEpisodes(titleId)
            setResTitleEpisode(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getTitleEpisodes", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getTitleEpisodes")
        }
    }

    const getApiTitleCast_Crew = async (titleId: number) => {
        try {
            const res = await getTitleCast_Crew(titleId)
            setResTitleCastCrew(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getTitleCast_Crew", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getTitleCast_Crew")
        }
    }

    const location = useLocation();
    const { idDetail } = location.state || {};
    useEffect(() => {
        setSelectNav(1)
        if (idDetail === undefined) {
            navigate("/universal")
        } else {
            // getApiTitleDetails(idDetail)
            // getApiTitleStreamingSources(idDetail)
            // getApiTitleSeasons(idDetail)
            // getApiTitleEpisodes(idDetail)
            // getApiTitleCast_Crew(idDetail)
        }
    }, [])

    const { icons, imgs, styleColor } = useGlobal()

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };



    return (
        <>
            <div className="max-w-[1535px] mx-auto flex flex-col gap-20">
                <section className="relative bg-black">
                    <img src={resTitleDetail?.backdrop} alt={resTitleDetail?.title} className="w-full h-[70vh] opacity-30" onError={handleImgError} />
                    <div className="flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-[1025px] px-10 relative flex flex-col gap-5">
                            <h1 className="text-white font-bold text-7xl">{resTitleDetail?.title}</h1>
                            <div className="flex wrap items-center gap-4 text-white/80 text-lg">
                                <div className="flex items-center gap-2 h-[40px] px-4 rounded-[10px] bg-gray-950 border-[1px] border-gray-700">
                                    <p>{resTitleDetail?.us_rating}</p>
                                </div>
                                <p>{resTitleDetail?.type}</p>
                                <p>{resTitleDetail?.year}</p>
                                <p>{resTitleDetail?.original_language}</p>
                                <div className="flex gap-1">
                                    {resTitleDetail?.genre_names.map((res, id) => (
                                        <p key={id}>
                                            {res}
                                            {id < resTitleDetail?.genre_names.length - 1 && ", "}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <p className="text-white text-lg font-bold">
                                {resTitleDetail?.plot_overview}
                            </p>
                            <div className="flex gap-4">
                                <button className="flex gap-2 h-[50px] px-6 bg-cyan-600 items-center rounded-[10px] text-white font-bold text-lg "><span>{icons.iconPlay}</span> Watch on sources</button>
                                <button className="flex gap-2 h-[50px] px-6 bg-white/40 backdrop-blur-[10px] items-center rounded-[10px] text-white font-bold text-lg"><span>{icons.iconAdd}</span> Add My List</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 flex gap-6 text-cyan-950 text-lg grid grid-cols-5 w-[90%]">
                        <div className="grid justify-center gap-2 items-center rounded-[10px] bg-cyan-500 backdrop-blur-[10px] p-5 border-gray-800 shadow-sm shadow-cyan-300/50 transition-all duration-300 ease hover:-translate-y-[3px]">
                            <span className="text-3xl font-bold text-cyan-950 text-center ">{resTitleSeasons.length}</span>
                            Seasons
                        </div>
                        <div className="grid justify-center gap-2 items-center rounded-[10px] bg-cyan-500 backdrop-blur-[10px] p-5 border-gray-800 shadow-sm shadow-cyan-300/50 transition-all duration-300 ease hover:-translate-y-[3px]">
                            <span className="text-3xl font-bold text-cyan-950 text-center ">{resTitleEpisodes.length}</span>
                            Episodes
                        </div>
                        <div className="grid justify-center gap-2 items-center rounded-[10px] bg-cyan-500 backdrop-blur-[10px] p-5 border-gray-800 shadow-sm shadow-cyan-300/50 transition-all duration-300 ease hover:-translate-y-[3px]">
                            <span className="text-3xl font-bold text-cyan-950 text-center ">{resTitleDetail?.user_rating ?? 0}/10</span>
                            User Score
                        </div>
                        <div className="grid justify-center gap-2 items-center rounded-[10px] bg-cyan-500 backdrop-blur-[10px] p-5 border-gray-800 shadow-sm shadow-cyan-300/50 transition-all duration-300 ease hover:-translate-y-[3px]">
                            <span className="text-3xl font-bold text-cyan-950 text-center ">{resTitleDetail?.critic_score ?? 0}%</span>
                            Critic Score
                        </div>
                        <div className="grid justify-center gap-2 items-center rounded-[10px] bg-cyan-500 backdrop-blur-[10px] p-5 border-gray-800 shadow-sm shadow-cyan-300/50 transition-all duration-300 ease hover:-translate-y-[3px] transition-all duration-300 ease hover:-translate-y-[3px]">
                            <span className="text-3xl font-bold text-cyan-950 text-center ">{resTitleDetail?.runtime_minutes ?? 0}</span>
                            Runtime Minutes
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-8">
                    <div className="grid grid-cols-[5fr_2fr] gap-6">
                        <div className="flex flex-col gap-6 self-start">
                            <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease ">
                                <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                    <h3 className="text-xl text-white">Sources</h3>
                                </div>
                                <div className="text-lg text-white/70 mt-5 gap-4 grid grid-cols-3 gap-4">
                                    {resTitleStreamingSource.map((res) => (
                                        <button key={res.source_id} className={`flex flex-col gap-4 self-end w-full text-white text-start items-center p-3 w-fit rounded-[10px] transition-all duration-300 ease shadow-lg shadow-cyan-300/10 border-[1px] border-gray-800 bg-gray-900 hover:-translate-y-[3px] hover:shadow-cyan-300/50`}>
                                            <div className="flex gap-2 w-full">
                                                <span className={`py-1 px-2 rounded-[6px] shadow-sm ${res.type === "buy" ? "bg-red-500 text-white" : "bg-cyan-600 text-gray-900"} font-bold text-sm`}>{res.type === "buy" ? "$" + res.price : res.type.toUpperCase()}</span>
                                                <span className="py-1 px-2 rounded-[6px] text-sm border-[1px] border-cyan-600 text-cyan-600">{res.format}</span>
                                            </div>
                                            <h3 className="text-2xl text-white font-bold w-full">{res.name}</h3>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {resTitleSeasons.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Seasons</h3>
                                        <button className="flex gap-1 items-center text-cyan-300">View all <span>{icons.iconNext}</span></button>
                                    </div>
                                    <div className="text-lg text-white/70 mt-5 gap-4 grid grid-cols-5 gap-4">
                                        {resTitleSeasons.map((res) => (
                                            <div key={res.season_number}>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {resTitleEpisodes.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Episodes</h3>
                                        <button className="flex gap-1 items-center text-cyan-300">View all <span>{icons.iconNext}</span></button>
                                    </div>
                                    <div className="text-lg text-white/70 mt-5 gap-4 grid grid-cols-5 gap-4">
                                        {resTitleEpisodes.map((res) => (
                                            <div key={res.episode_number}>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {resTitleCast.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Cast</h3>
                                        <button className="flex gap-1 items-center text-cyan-300">View all <span>{icons.iconNext}</span></button>
                                    </div>
                                    <div className="text-lg text-white/70 mt-5 gap-4 grid grid-cols-5 gap-4">
                                        {resTitleCast.slice(0, 10).map((res) => (
                                            <div key={res.person_id} className="flex flex-col gap-2 group">
                                                <img src={res.headshot_url} alt={res.full_name} className="w-full rounded-[10px] transition-all duration-300 ease group-hover:opacity-50 group-hover:scale-102" />
                                                <h3 className="text-lg text-white font-bold">{res.full_name}</h3>
                                                <p className="text-sm">{res.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {resTitleCrew.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Crew</h3>
                                        <button className="flex gap-1 items-center text-cyan-300">View all <span>{icons.iconNext}</span></button>
                                    </div>
                                    <div className="text-lg text-white/70 mt-5 gap-4 grid grid-cols-5 gap-4">
                                        {resTitleCrew.slice(0, 10).map((res) => (
                                            <div key={res.person_id} className="flex flex-col gap-2 group">
                                                <img src={res.headshot_url} alt={res.full_name} className="w-full rounded-[10px] transition-all duration-300 ease group-hover:opacity-50 group-hover:scale-102" />
                                                <h3 className="text-lg text-white font-bold">{res.full_name}</h3>
                                                <p className="text-sm">{res.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col gap-6 self-start">
                            <div className="relative group">
                                <img src={resTitleDetail?.poster} alt={resTitleDetail?.title} className="w-full rounded-[10px] transition-all duration-300 ease shadow-lg group-hover:scale-103 group-hover:opacity-70 group-hover:shadow-lg group-hover:shadow-cyan-300/50" />
                                <button className="absolute text-white bottom-[10px] left-[10px] p-5 rounded-full bg-cyan-500 backdrop-blir-[10px] css-icon transition-all duration-300 ease opacity-0 group-hover:opacity-100">{icons.iconPlay}</button>
                            </div>
                            <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50">
                                <h3 className="text-white text-xl">Information</h3>
                                <div className="text-lg text-white/70 gap-2 flex flex-col">
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Type:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.type}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Runtime Minutes:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.runtime_minutes}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Release Date:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.release_date}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Original Language:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.original_language}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Us Rating:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.us_rating}</span>
                                    </div>
                                    <div className="flex wrap gap-4">
                                        {resTitleDetail?.genre_names.map((res, id) => (
                                            <span key={id} className="bg-white/10 py-1 px-4 rounded-full">
                                                {res}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50">
                                <h3 className="text-white text-xl">Statistical</h3>
                                <div className="text-lg text-white/70 gap-2 flex flex-col">
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>User Rating:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.user_rating}/10</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Critic Score:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.critic_score}%</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Relevance Percentile:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.relevance_percentile}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default UniversalDetail