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
    useResTitleStreamingSourceState,
    type Source
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
            items: 3,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 2
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
            if (res.data.lenght > 0) {
                setResTitleSeasons(res.data)
                setSelectSeasons(res.data[0].id)
            }
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
        // getApiTitleDetails(idDetail)
        // getApiTitleStreamingSources(idDetail)
        // getApiTitleSeasons(idDetail)
        // getApiTitleEpisodes(idDetail)
        // getApiTitleCast_Crew(idDetail)
    }, [])

    const { icons, imgs } = useGlobal()

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };

    const [selectSeasons, setSelectSeasons] = useState<number>(0)
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [selectEpisodeSources, setSelectEpisodeSources] = useState<number>(-1)

    const convertDateEpisodes = (dateStr: string) => {
        const date = new Date(dateStr);

        if (isNaN(date.getTime())) {
            return ""; // Trả về rỗng nếu chuỗi không hợp lệ
        }

        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yyyy = date.getFullYear();

        return `${mm}/${dd}/${yyyy}`;
    }

    const convertDate = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);

        if (isNaN(date.getTime())) {
            return ""; // Trả về rỗng nếu chuỗi không hợp lệ
        }

        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yyyy = date.getFullYear();

        return `${mm}/${dd}/${yyyy}`;
    };

    return (
        <>
            <div className='w-full sticky z-[999] md:top-[80px] top-[73px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <div
                        onClick={() => navigate("/universal")}
                        className='transition duration-300 ease css-icon'>Universal</div>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Detail</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto flex flex-col lg:gap-20 gap-6 py-5">
                <section className="relative bg-black max-lg:flex max-lg:flex-col max-lg:gap-6">
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                        {/* Background Image */}
                        <div className="relative w-full aspect-[16/9]">
                            <img
                                src={resTitleDetail?.trailer_thumbnail || imgs.imgDefault}
                                alt={resTitleDetail?.title}
                                onError={handleImgError}
                                className="w-full h-full object-cover brightness-75 lg:brightness-50 transition-all duration-300"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent max-lg:hidden"></div>
                        </div>

                        {/* Content overlay */}
                        <div className="lg:absolute inset-0 flex items-center justify-center max-lg:mt-5 lg:px-12">
                            <div className="flex flex-col xl:gap-6 gap-4 max-w-[1000px] text-white z-10">
                                {/* Title */}
                                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
                                    {resTitleDetail?.title}
                                </h1>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80 text-xl sm:text-lg">
                                    {/* Rating */}
                                    {resTitleDetail?.us_rating && (
                                        <div className="flex items-center gap-2 h-[40px] px-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
                                            <p>{resTitleDetail.us_rating}</p>
                                        </div>
                                    )}
                                    <p className="uppercase">{resTitleDetail?.type}</p>
                                    <p>{resTitleDetail?.year}</p>
                                    <p className="capitalize">{resTitleDetail?.original_language}</p>

                                    {/* Genres */}
                                    <div className="flex flex-wrap gap-x-1">
                                        {resTitleDetail?.genre_names?.map((res, id) => (
                                            <p key={id}>
                                                {res}
                                                {id < resTitleDetail?.genre_names.length - 1 && ","}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Plot */}
                                <p className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed max-w-4xl">
                                    {resTitleDetail?.plot_overview}
                                </p>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {/* Trailer Button */}
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="flex items-center gap-3 px-7 py-2 bg-cyan-600 text-white font-bold text-lg rounded-xl shadow-md shadow-cyan-400/30 hover:shadow-cyan-400/60 hover:scale-[1.03] transition-all duration-300"
                                    >
                                        <span className="text-2xl">{icons.iconPlay}</span> Trailer
                                    </button>

                                    {/* Add to List Button */}
                                    <button className="flex items-center gap-3 px-7 py-2 bg-white/20 backdrop-blur-md text-white font-semibold text-lg rounded-xl border border-white/30 hover:bg-white/30 hover:scale-[1.03] transition-all duration-300">
                                        <span className="text-2xl">{icons.iconAdd}</span>
                                        <p className="max-sm:hidden">Add to My List</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Trailer Modal */}
                        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                            <DialogContent sx={{ padding: 0, maxWidth: "auto" }}>
                                <div className="mx-auto flex flex-col gap-4 items-center p-5">
                                    <h1 className="text-3xl font-bold text-center mb-2">
                                        {resTitleDetail?.title}
                                    </h1>
                                    <iframe
                                        className="sm:w-[600px] sm:h-[340px] w-[90vw] h-[260px] rounded-xl"
                                        src="https://www.youtube.com/embed/MjP-63ZG74I?autoplay=1&controls=1"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div
                        className="
    lg:absolute lg:-bottom-[60px] lg:left-1/2 lg:-translate-x-1/2
    flex flex-wrap justify-center 
    text-cyan-100 lg:text-lg text-sm 
    gap-5 
    lg:grid lg:grid-cols-5
    lg:w-[90%] w-full
  "
                    >
                        {[
                            { label: "Seasons", value: resTitleSeasons.length },
                            { label: "Episodes", value: resTitleEpisodes.length },
                            { label: "User Score", value: `${resTitleDetail?.user_rating ?? 0}/10` },
                            { label: "Critic Score", value: `${resTitleDetail?.critic_score ?? 0}%` },
                            { label: "Runtime", value: `${resTitleDetail?.runtime_minutes ?? 0} min` },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="
        relative flex flex-col justify-center items-center
        rounded-2xl p-4 w-[45%] sm:w-[30%] md:w-[18%] lg:w-auto
        text-center overflow-hidden
        bg-gradient-to-br from-cyan-500/80 via-cyan-400/60 to-cyan-600/80
        backdrop-blur-xl border border-cyan-300/30
        shadow-lg shadow-cyan-400/20
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-cyan-300/50 hover:scale-[1.03]
      "
                            >
                                {/* Hiệu ứng sáng nhẹ */}
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-300/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Giá trị */}
                                <span className="lg:text-3xl text-2xl font-bold text-black drop-shadow-sm z-10">
                                    {item.value}
                                </span>

                                {/* Nhãn */}
                                <span className="font-semibold tracking-wide text-cyan-950/90 z-10">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                </section>
                <div className="grid lg:grid-cols-[1fr_300px] gap-6">
                    <section className="flex flex-col gap-6 self-start w-full">
                        {resTitleStreamingSource.length > 0 &&
                            <div className="border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">
                                        Streaming Sources
                                    </h3>
                                </div>

                                {/* List */}
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {resTitleStreamingSource.map((res) => (
                                        <button
                                            key={res.source_id}
                                            className={`
                    group relative flex flex-col items-start p-5 rounded-xl
                    border border-gray-800 bg-gray-900/80
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-[1.02]
                    hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30
                `}
                                        >
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300"></div>

                                            {/* Price / Type + Format */}
                                            <div className="flex gap-2 w-full mb-3 z-10">
                                                <span
                                                    className={`py-1 px-3 rounded-md text-sm font-semibold shadow-sm
                            ${res.type === "buy" ? "bg-red-500 text-white" :
                                                            res.type === "free" ? "bg-green-500 text-white" :
                                                                "bg-cyan-500 text-gray-900"}
                        `}
                                                >
                                                    {res.type === "buy" ? "$" + res.price : res.type.toUpperCase()}
                                                </span>
                                                {res.format && (
                                                    <span className="py-1 px-3 rounded-md text-sm border border-cyan-400 text-cyan-400">
                                                        {res.format}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Source name */}
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors z-10">
                                                {res.name}
                                            </h3>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        }
                        {resTitleEpisodes.length > 0 &&
                            <div className="border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                                <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                    <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Episodes</h3>
                                </div>
                                <div className="text-lg text-white/70 mt-5 gap-6 flex flex-col">

                                    {resTitleSeasons.length > 0 &&
                                        <div className="relative w-full">
                                            {/* Container cuộn ngang */}
                                            <div
                                                className="
      flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-3
      snap-x snap-mandatory
    "
                                            >
                                                {resTitleSeasons.map((res) => (
                                                    <button
                                                        key={res.id}
                                                        onClick={() => setSelectSeasons(res.id)}
                                                        className={`
          snap-start flex-shrink-0 px-6 py-2.5 text-base sm:text-lg font-semibold
          rounded-xl border transition-all duration-300 ease-out
          shadow-md hover:shadow-cyan-400/30
          ${selectSeasons === res.id
                                                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400 shadow-cyan-500/40 scale-[1.05]"
                                                                : "bg-gray-900/60 border-gray-700 text-white/70 hover:text-cyan-300 hover:border-cyan-400"
                                                            }
        `}
                                                    >
                                                        {res.name}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Hiệu ứng fade 2 bên */}
                                            <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-gray-950 to-transparent"></div>
                                            <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-gray-950 to-transparent"></div>
                                        </div>

                                    }
                                    {
                                        resTitleEpisodes.map((res, index) => (
                                            <>
                                                <button
                                                    key={res.id}
                                                    onClick={() => setSelectEpisodeSources(res.id)}
                                                    className={`${resTitleSeasons.length > 0 ? (selectSeasons === res.season_id ? '' : 'hidden') : ''} 
              group relative w-full rounded-2xl overflow-hidden border border-white/10
              bg-gray-900/40 backdrop-blur-md transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-[1.02]
                    hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30`}
                                                >

                                                    {/* ========== Layout MOBILE (<lg): Ảnh trên - text dưới ========== */}
                                                    <div className="lg:hidden flex flex-col">
                                                        <div className="relative h-[200px] overflow-hidden">
                                                            <img
                                                                src={res.thumbnail_url}
                                                                alt={res.name}
                                                                onError={handleImgError}
                                                                className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80"></div>
                                                            <span className="absolute backdrop-blur-[10px] top-3 right-3 text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full">
                                                                {res.runtime_minutes ?? 0} m
                                                            </span>
                                                        </div>

                                                        <div className="p-4 flex flex-col gap-2 text-left">
                                                            <h3 className="text-lg font-semibold text-white truncate">
                                                                {index + 1} - {res.name}
                                                            </h3>
                                                            <p className="text-sm text-white/70 line-clamp-2">{res.overview}</p>
                                                            <div className="flex flex-wrap gap-2 text-xs text-gray-300 mt-2">
                                                                <span><strong>{res.sources.length} </strong>sources</span>
                                                                <div className="w-[1px] h-full bg-gray-500"></div>
                                                                <span><strong>{res.season_number} </strong>seasons</span>
                                                                <div className="w-[1px] h-full bg-gray-500"></div>
                                                                <span><strong>{res.episode_number} </strong>seasons</span>
                                                                <div className="w-[1px] h-full bg-gray-500"></div>
                                                                <span>{convertDateEpisodes(res.release_date)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* ========== Layout DESKTOP (>lg): Ảnh trái - overlay text phải ========== */}
                                                    <div className="hidden lg:flex relative w-full h-[150px]">
                                                        {/* Ảnh */}
                                                        <div className="relative w-[40%] h-full overflow-hidden">
                                                            <img
                                                                src={res.thumbnail_url}
                                                                alt={res.name}
                                                                onError={handleImgError}
                                                                className=" object-cover rounded-l-2xl transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                                                            <span className="absolute backdrop-blur-[10px] bottom-3 right-3 text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full">
                                                                {res.runtime_minutes ?? 0} m
                                                            </span>
                                                        </div>

                                                        {/* Nội dung overlay */}
                                                        <div className="absolute top-0 right-0 w-[60%] h-full flex flex-col justify-center gap-3 p-3">
                                                            <h3 className="text-xl font-semibold text-white text-start">
                                                                {index + 1} - {res.name}
                                                            </h3>
                                                            <p className="text-sm text-white/70 line-clamp-2 text-start">{res.overview}</p>

                                                            <div className="flex gap-3 items-center text-sm text-gray-300">
                                                                <span><strong>{res.sources.length} </strong>sources</span>
                                                                <div className="w-[1px] h-full bg-gray-500"></div>
                                                                <span><strong>{res.season_number} </strong>seasons</span>
                                                                <div className="w-[1px] h-full bg-gray-500"></div>
                                                                <span><strong>{res.episode_number} </strong>seasons</span>
                                                                <div className="w-[1px] h-full bg-gray-500"></div>
                                                                <span>{convertDateEpisodes(res.release_date)}</span>
                                                            </div>
                                                        </div>

                                                        {/* Hover effect overlay cyan glow */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-300/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                                    </div>

                                                    {/* ========== Sources hiển thị khi click ========== */}
                                                    {selectEpisodeSources === res.id && (
                                                        <div className={`${res.sources.length === 0 ? 'hidden' : ''} absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col justify-center items-start p-6 gap-3`}>
                                                            <h4 className="text-cyan-300 font-semibold text-lg">Sources</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {/* {res.sources.map((sour) => (
                                                                    <button
                                                                        key={sour.name}
                                                                        className="px-3 py-1 text-sm rounded-lg border border-cyan-300/40 bg-cyan-400/10 hover:bg-cyan-400/20 transition-all duration-300"
                                                                        style={styleColor(res.id)}
                                                                    >
                                                                        {sour.name}
                                                                    </button>
                                                                ))} */}
                                                                {Object.values(
                                                                    res.sources.reduce((acc: Record<number, Source & { regions: string[] }>, sour) => {
                                                                        if (acc[sour.source_id]) {
                                                                            acc[sour.source_id].regions.push(sour.region);
                                                                        } else {
                                                                            acc[sour.source_id] = { ...sour, regions: [sour.region] };
                                                                        }
                                                                        return acc;
                                                                    }, {})
                                                                ).map((sour) => (
                                                                    <button
                                                                        key={sour.source_id}
                                                                        className="group relative flex gap-3 flex-col items-center justify-center px-4 py-2 rounded-xl border border-cyan-300/30 bg-gradient-to-b from-cyan-400/10 to-cyan-500/5 hover:from-cyan-400/20 hover:to-cyan-500/10 hover:border-cyan-300/60 transition-all duration-300 shadow-sm hover:shadow-cyan-400/20"
                                                                    // style={styleColor(res.id)}
                                                                    >
                                                                        <span className="text-sm font-semibold text-cyan-200 w-full text-start tracking-wide">
                                                                            {sour.name}
                                                                        </span>
                                                                        <span className="text-xs text-cyan-300/70 mt-0.5 flex flex-wrap justify-center gap-1">
                                                                            {sour.regions.map((r) => (
                                                                                <span
                                                                                    key={r}
                                                                                    className="px-1.5 py-0.5 rounded-md bg-cyan-400/10 border border-cyan-300/20 text-[11px]"
                                                                                >
                                                                                    {r}
                                                                                </span>
                                                                            ))}
                                                                        </span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectEpisodeSources(-1);
                                                                }}
                                                                className="absolute top-3 right-3 text-white/70 hover:text-white text-lg"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    )}
                                                </button>

                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {resTitleCast.length > 0 &&
                            <div className="border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                                <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                    <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Cast</h3>
                                    <button className="flex gap-1 items-center text-cyan-300 tracking-wide">View all <span className="text-cyan-300">{icons.iconNext}</span></button>
                                </div>
                                <div className="w-full grid mx-auto mt-5">
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
                                                    className="w-full aspect-[3/4] object-cover rounded-[10px] transition-all duration-300 ease group-hover:scale-105"
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
                            <div className="border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                                <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                    <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Crew</h3>
                                    <button className="flex gap-1 items-center text-cyan-300 tracking-wide">View all <span className="text-cyan-300">{icons.iconNext}</span></button>
                                </div>
                                <div className="w-full grid mx-auto mt-5">
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
                                                    className="w-full aspect-[3/4] object-cover rounded-[10px] transition-all duration-300 ease group-hover:scale-105"
                                                />
                                                <h3 className="text-lg text-white font-bold transition-all duration-300 ease group-hover:text-cyan-300">{res.full_name}</h3>
                                                <p className="text-xs text-center text-white/70 transition-all duration-300 ease group-hover:text-cyan-300/70">{res.role}</p>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        }
                    </section>
                    <aside className="flex flex-col gap-6 self-start max-lg:row-start-1">
                        <div className="relative group w-full max-lg:hidden">
                            <img src={resTitleDetail?.poster || imgs.imgDefault}
                                alt={resTitleDetail?.title || "No image available"} className="aspect-[3/4] w-full rounded-[10px] transition-all duration-300 ease shadow-2xl shadow-gray-900 group-hover:scale-103 group-hover:opacity-70 group-hover:shadow-cyan-400/30" onError={handleImgError} />
                            <button
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                                className="absolute text-white bottom-[10px] left-[10px] p-5 rounded-full bg-cyan-500 backdrop-blir-[10px] css-icon transition-all duration-300 ease opacity-0 group-hover:opacity-100">{icons.iconPlay}</button>
                        </div>
                        <div className="items-center border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                            <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Information</h3>
                            <div className="text-lg text-white/70 gap-2 flex flex-col">
                                <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                    <span>Type:</span>
                                    <span className="text-white font-bold text-xl">{resTitleDetail?.type}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                    <span>Runtime Minutes:</span>
                                    <span className="text-white font-bold text-xl">{resTitleDetail?.runtime_minutes ?? 0}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                    <span>Release Date:</span>
                                    <span className="text-white font-bold text-xl">{convertDate(resTitleDetail?.release_date)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b-[1px] border-b-gray-600">
                                    <span>Original Language:</span>
                                    <span className="text-white font-bold text-xl">{resTitleDetail?.original_language}</span>
                                </div>
                                <div className={`${resTitleDetail?.us_rating === null ? 'hidden' : ''} flex justify-between py-3 border-b-[1px] border-b-gray-600`}>
                                    <span>Us Rating:</span>
                                    <span className="text-white font-bold text-xl">{resTitleDetail?.us_rating}</span>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {resTitleDetail?.genre_names.map((res, id) => (
                                        <span key={id} className="bg-white/10 py-1 px-4 rounded-full">
                                            {res}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="items-center border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                            <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Statistical</h3>
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
                    </aside>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default UniversalDetail