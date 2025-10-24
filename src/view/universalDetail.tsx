import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
import { Dialog, DialogContent } from "@mui/material";

const UniversalDetail: React.FC = () => {
    const { setSelectNav } = useStateGeneral()
    const navigate = useNavigate()

    const { resTitleDetail, setResTitleDetail } = useResTitleDetailState()
    const { resTitleStreamingSource, setResTitleStreamingSource } = useResTitleStreamingSourceState()
    const { resTitleSeasons, setResTitleSeasons } = useResTitleSeasonState()
    const { resTitleEpisodes, setResTitleEpisode } = useResTitleEpisodeState()
    const { resTitleCast, resTitleCrew, setResTitleCastCrew } = useResTitleCast_CrewState()

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5, //so slider hien thi
            slidesToSlide: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 4,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

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

    const { icons, imgs } = useGlobal()

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };

    const [selectSeasons, setSelectSeasons] = useState<number>(0)
    const [modalOpen, setModalOpen] = useState<boolean>(false);


    return (
        <>
            <div className='w-full px-5 sticky z-[999] top-[80px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <div
                        onClick={() => navigate("/universal")}
                        className='transition duration-300 ease css-icon'>Universal</div>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Detail</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto flex flex-col gap-20">
                <section className="relative bg-black">
                    <img src={resTitleDetail?.trailer_thumbnail} alt={resTitleDetail?.title} className="w-full h-[70vh] opacity-30" onError={handleImgError} />
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
                                <button className="flex css-icon gap-2 h-[50px] px-6 bg-cyan-600 items-center rounded-[10px] text-white font-bold text-lg "
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                ><span>{icons.iconPlay}</span> Trailer</button>
                                <button className="flex css-icon gap-2 h-[50px] px-6 bg-white/40 backdrop-blur-[10px] items-center rounded-[10px] text-white font-bold text-lg"><span>{icons.iconAdd}</span> Add My List</button>
                            </div>
                            <Dialog
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                            >
                                <DialogContent sx={{ padding: 0, maxWidth: 'auto' }}>
                                    <div className="mx-auto flex flex-col gap-4 items-center p-5">
                                        <h1 className="text-3xl w-full">{resTitleDetail?.title}</h1>
                                        <iframe
                                            width="500"
                                            height="320"
                                            src="https://www.youtube.com/embed/MjP-63ZG74I?autoplay=1&controls=1"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </DialogContent>

                            </Dialog>
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
                            {resTitleStreamingSource.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease ">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Sources</h3>
                                    </div>
                                    <div className="text-lg text-white/70 mt-5 gap-4 grid grid-cols-3 gap-4">
                                        {resTitleStreamingSource.map((res) => (
                                            <button key={res.source_id} className={`flex flex-col gap-4 self-end w-full text-white text-start items-center p-3 w-fit rounded-[10px] transition-all duration-300 ease shadow-lg shadow-cyan-300/10 border-[1px] border-gray-800 bg-gray-900 hover:-translate-y-[3px] hover:shadow-cyan-300/50`}>
                                                <div className="flex gap-2 w-full">
                                                    <span className={`py-1 px-2 rounded-[6px] shadow-sm ${res.type === "buy" ? "bg-red-500 text-white" : "bg-cyan-600 text-gray-900"} ${res.type === 'free' && "bg-green-500"} font-bold text-sm`}>{res.type === "buy" ? "$" + res.price : res.type.toUpperCase()}</span>
                                                    <span className={`py-1 px-2 rounded-[6px] text-sm border-[1px] border-cyan-600 text-cyan-600 ${res.format === null ? "hidden" : ""}`}>{res.format}</span>
                                                </div>
                                                <h3 className="text-2xl text-white font-bold w-full">{res.name}</h3>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            }
                            {resTitleEpisodes.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Episodes</h3>
                                    </div>
                                    <div className="text-lg text-white/70 mt-5 gap-6 flex flex-col gap-4">
                                        {resTitleSeasons.map((res) => (
                                            <button key={res.id}
                                                onClick={() => setSelectSeasons(res.id)}
                                                className={`border-[1px] css-icon ${selectSeasons === res.id ? "text-cyan-300 border-cyan-300" : "border-gray-500"} w-fit h-[40px] text-lg px-4 rounded-[10px] hover:text-cyan-300 hover:border-cyan-300`}>{res.name}</button>
                                        ))}
                                        {resTitleEpisodes.map((res) => (
                                            <div key={res.id} className={`${selectSeasons === res.season_id ? "" : "hidden"} flex gap-4 rounded-[10px] transition-all duration-100 ease group hover:border-l-[3px] hover:border-l-cyan-300 pl-[1px]`}>
                                                <img src={res.thumbnail_url} alt={res.name} className="w-[150px] rounded-[10px] group-hover:scale-102" onError={handleImgError} />
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg text-white"><strong>{res.name}</strong> <span>{"(" + res.release_date + ")"}</span></h3>
                                                        <span className="text-sm py-1 px-4 rounded-[10px] bg-cyan-500/10 text-cyan-300 border-[1px] border-cyan-500/10">{res.runtime_minutes} minutes</span>
                                                    </div>
                                                    <p className="text-sm text-white/70">{res.overview}</p>
                                                    <p className="text-sm">Sources: <strong className="text-cyan-300">{res.sources.length}</strong></p>
                                                </div>
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
                                    <div className="w-full mx-auto mt-5 px-4 xl:max-w-6xl">
                                        <Carousel
                                            responsive={responsive}
                                            draggable //truot tren pc, laptop
                                            swipeable //vuot tren mobile
                                            arrows={true} //mui ten
                                            infinite //truot vo hang 2 huong
                                            minimumTouchDrag={100} // kcach keo vuot cac trang tiep theo
                                            itemClass="p-2 rounded-[10px]"
                                            containerClass="flex w-full relative overflow-hidden items-center"
                                            className="w-full"
                                            keyBoardControl //su dung phim de dieu huong
                                            showDots={false} //hiển cham o duoi
                                            renderDotsOutside={true} // hien thi cham ngoai vung chua nd
                                            focusOnSelect={false}
                                            centerMode={false}
                                            additionalTransfrom={0}
                                            shouldResetAutoplay
                                            rewind={false} //tua lai
                                            rewindWithAnimation={false} //
                                            rtl={false} //huong bang chuyen (r->l)
                                            renderButtonGroupOutside={false}
                                        >
                                            {resTitleCast.map((res) => (
                                                <div
                                                    key={res.person_id}
                                                    className="flex flex-col items-center gap-2 group"
                                                >
                                                    <img
                                                        src={res.headshot_url}
                                                        alt={res.full_name}
                                                        className="w-full object-cover rounded-[10px] transition-all duration-300 ease group-hover:scale-105"
                                                    />
                                                    <h3 className="text-lg text-white font-bold transition-all duration-300 ease group-hover:text-cyan-300">{res.full_name}</h3>
                                                    <p className="text-xs text-center text-white/70 transition-all duration-300 ease group-hover:text-cyan-300/70">{res.role}</p>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            }
                            {resTitleCrew.length > 0 &&
                                <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl text-white">Crew</h3>
                                        <button className="flex gap-1 items-center text-cyan-300">View all <span>{icons.iconNext}</span></button>
                                    </div>
                                    <div className="w-full mx-auto mt-5 px-4 xl:max-w-6xl">
                                        <Carousel
                                            responsive={responsive}
                                            draggable //truot tren pc, laptop
                                            swipeable //vuot tren mobile
                                            arrows={true} //mui ten
                                            infinite //truot vo hang 2 huong
                                            minimumTouchDrag={100} // kcach keo vuot cac trang tiep theo
                                            itemClass="p-2 rounded-[10px]"
                                            containerClass="flex w-full relative overflow-hidden items-center"
                                            className="w-full"
                                            keyBoardControl //su dung phim de dieu huong
                                            showDots={false} //hiển cham o duoi
                                            renderDotsOutside={true} // hien thi cham ngoai vung chua nd
                                            focusOnSelect={false}
                                            centerMode={false}
                                            additionalTransfrom={0}
                                            shouldResetAutoplay
                                            rewind={false} //tua lai
                                            rewindWithAnimation={false} //
                                            rtl={false} //huong bang chuyen (r->l)
                                            renderButtonGroupOutside={false}
                                        >
                                            {resTitleCrew.slice(0, 10).map((res) => (
                                                <div
                                                    key={res.person_id}
                                                    className="flex flex-col items-center gap-2 group"
                                                >
                                                    <img
                                                        src={res.headshot_url}
                                                        alt={res.full_name}
                                                        className="w-full object-cover rounded-[10px] transition-all duration-300 ease group-hover:scale-105"
                                                    />
                                                    <h3 className="text-lg text-white font-bold transition-all duration-300 ease group-hover:text-cyan-300">{res.full_name}</h3>
                                                    <p className="text-xs text-center text-white/70 transition-all duration-300 ease group-hover:text-cyan-300/70">{res.role}</p>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col gap-6 self-start">
                            <div className="relative group">
                                <img src={resTitleDetail?.poster} alt={resTitleDetail?.title} className="w-full rounded-[10px] transition-all duration-300 ease shadow-lg shadow-gray-900 group-hover:scale-103 group-hover:opacity-70 group-hover:shadow-cyan-300/50" onError={handleImgError} />
                                <button
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                    className="absolute text-white bottom-[10px] left-[10px] p-5 rounded-full bg-cyan-500 backdrop-blir-[10px] css-icon transition-all duration-300 ease opacity-0 group-hover:opacity-100">{icons.iconPlay}</button>
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
                                    <div className="flex wrap gap-4 mt-2">
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
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.user_rating ?? 0}/10</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Critic Score:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.critic_score ?? 0}%</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                        <span>Relevance Percentile:</span>
                                        <span className="text-white font-bold text-xl">{resTitleDetail?.relevance_percentile ?? 0}%</span>
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