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
import { Dialog, DialogContent, Backdrop, CircularProgress } from "@mui/material";

const UniversalDetail: React.FC = () => {
    const { setSelectNav, setIsCastCrew } = useStateGeneral()
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

    const [loading, setLoading] = useState<boolean>(true);


    const getApiTitleDetails = async (titleId: number) => {
        try {
            setLoading(true);
            const res = await getTitleDetails(titleId)
            setResTitleDetail(res.data)
        } catch (error: any) {
            toast.error(`Title Details ${titleId}: ` + error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiTitleStreamingSources = async (titleId: number) => {
        try {
            setLoading(true);
            const res = await getTitleStreamingSources(titleId)
            setResTitleStreamingSource(res.data)
        } catch (error: any) {
            toast.error(`Title Streaming Sources ${titleId}: ` + error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiTitleSeasons = async (titleId: number) => {
        try {
            setLoading(true);
            const res = await getTitleSeasons(titleId)
            setResTitleSeasons(res.data)

            if (res.data.length > 0) {
                setSelectSeasons(res.data[0].id)
            }
        } catch (error: any) {
            toast.error(`Title Seasons ${titleId}: ` + error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiTitleEpisodes = async (titleId: number) => {
        try {
            setLoading(true);
            const res = await getTitleEpisodes(titleId)
            setResTitleEpisode(res.data)
        } catch (error: any) {
            toast.error(`Title Episodes ${titleId}: ` + error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiTitleCast_Crew = async (titleId: number) => {
        try {
            setLoading(true);
            const res = await getTitleCast_Crew(titleId)
            setResTitleCastCrew(res.data)
        } catch (error: any) {
            toast.error(`Title Cast/Crew ${titleId}: ` + error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const location = useLocation();
    const { idDetail } = location.state || {};
    useEffect(() => {
        setSelectNav(1)
        if (idDetail) {
            getApiTitleDetails(idDetail)
            getApiTitleStreamingSources(idDetail)
            getApiTitleSeasons(idDetail)
            getApiTitleEpisodes(idDetail)
            getApiTitleCast_Crew(idDetail)
        } else {
            navigate('/universal')
        }

    }, [])

    const { icons, imgs, styleContent } = useGlobal()

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

    if (loading) return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )

    return (
        <>
            <div className='w-full sticky z-[999] md:top-[80px] top-[73px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Detail</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto flex flex-col lg:gap-20 gap-6 py-5">
                <section className="relative max-lg:flex max-lg:flex-col max-lg:gap-6">
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
                                    <p className="uppercase">{styleContent(resTitleDetail?.type!)}</p>
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
                                        className="flex items-center backdrop-blur-[10px] gap-3 px-6 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/30 transition-all duration-300"
                                    >
                                        <span className="text-2xl">{icons.iconPlay}</span> Trailer
                                    </button>

                                    {/* Add to List Button */}
                                    <a href={`https://www.imdb.com/title/${resTitleDetail?.imdb_id}`} className="flex backdrop-blur-[10px] items-center gap-2 px-6 py-2 rounded-xl border border-gray-600 bg-gray-800/50 text-gray-300">
                                        <p className="max-sm:hidden">View on</p>
                                        <p >IMDb</p>
                                    </a>
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
        bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/30
        backdrop-blur-[10px] 
        shadow-lg 
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-cyan-300/50 hover:scale-[1.03]
      "
                            >
                                {/* Giá trị */}
                                <span className="lg:text-3xl text-2xl font-bold drop-shadow-sm z-10">
                                    {item.value}
                                </span>

                                {/* Nhãn */}
                                <span className="font-semibold tracking-wide text-cyan-300/50 z-10">
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
                                        <div className=" w-full">
                                            {/* Container cuộn ngang */}
                                            <div
                                                className="flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto scroll-x pb-2 sm:pb-0 scrollbar-hide"
                                            >
                                                {resTitleSeasons.map((res) => (
                                                    <button
                                                        key={res.id}
                                                        onClick={() => setSelectSeasons(res.id)}
                                                        className={`
          border flex-shrink-0 transition-all duration-300 ease-in-out hover:text-cyan-300
                        h-[40px] px-3 rounded-lg text-lg shadow-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black
          ${selectSeasons === res.id
                                                                ? "text-cyan-300 border-cyan-500"
                                                                : "border-cyan-500/20"
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
                                                                <div className="w-[1px] h-[15px] bg-gray-500"></div>
                                                                <span><strong>{res.season_number} </strong>seasons</span>
                                                                <div className="w-[1px] h-[15px] bg-gray-500"></div>
                                                                <span><strong>{res.episode_number} </strong>seasons</span>
                                                                <div className="w-[1px] h-[15px] bg-gray-500"></div>
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
                                                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/45 to-gray-950/90"></div>
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
                                                        <div className={`${res.sources.length === 0 ? 'hidden' : ''} absolute inset-0 bg-black/85 backdrop-blur-md overflow-y-auto scroll-y flex flex-col justify-center items-start p-6 gap-3`}>
                                                            <h4 className="text-cyan-300 font-semibold text-lg">Sources</h4>
                                                            <div className="flex flex-wrap gap-2">
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

                        {[
                            { data: resTitleCast, title: 'Cast', select: 0 },
                            { data: resTitleCrew, title: 'Crew', select: 1 },
                        ].map(({ data, title, select }) => (
                            data.length > 0 && (
                                <div className="border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                        <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">{title}</h3>
                                        <button className="flex gap-1 items-center text-cyan-300 tracking-wide"
                                            onClick={() => {
                                                navigate(`/cast-crew/${idDetail}`, { state: { idDetail: idDetail } })
                                                setIsCastCrew(select)
                                            }}
                                        >View all <span className="text-cyan-300">{icons.iconNext}</span></button>
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
                                            {data.map((res) => (
                                                <button
                                                    key={res.person_id}
                                                    onClick={() => {
                                                        navigate(`/person-detail/${res.person_id}`, {
                                                            state: {
                                                                idPersonDetail: res.person_id,
                                                                idDetail: idDetail
                                                            },
                                                        });
                                                    }}
                                                    className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl 
               border border-gray-700/50 bg-gray-900/40 
               hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30
               transition-all duration-300 ease-in-out"
                                                >
                                                    {/* Ảnh */}
                                                    <img
                                                        src={res.headshot_url}
                                                        alt={res.full_name}
                                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out 
                   group-hover:scale-110"
                                                    />

                                                    {/* Overlay đậm hơn giúp text rõ */}
                                                    <div className="absolute inset-0 bg-gradient-to-t 
                    from-black/90 via-black/60 to-black/30
                    opacity-90 group-hover:opacity-100 
                    transition-opacity duration-300 ease-in-out">
                                                    </div>

                                                    {/* Thông tin */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                                        <h3 className="text-white font-semibold text-lg leading-tight 
                       drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] 
                       group-hover:text-cyan-300 transition-colors duration-300">
                                                            {res.full_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-300 group-hover:text-cyan-200/80 
                      drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                                                            {res.role}
                                                        </p>
                                                        {res.episode_count && (
                                                            <span className="mt-1 inline-block text-xs text-white/80 
                             bg-cyan-500/30 px-2 py-[2px] rounded-full 
                             backdrop-blur-sm border border-cyan-400/30">
                                                                {res.episode_count} Episodes
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Badge thứ tự */}
                                                    <span className="absolute top-2 left-2 bg-cyan-500/90 text-white text-xs font-bold 
                     px-2 py-[2px] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                                        #{res.order}
                                                    </span>
                                                </button>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            )
                        ))}

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
                                <div className="flex justify-between py-3 ">
                                    <span>Popularity Percentile:</span>
                                    <span className="text-white font-bold text-xl">{resTitleDetail?.popularity_percentile ?? 0}%</span>
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