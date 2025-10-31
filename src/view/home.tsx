import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

import { getSources, getStreamingReleases } from "../services/userService" //getGenres,  getRegions,
import { useResGenresState, useResSourceState, useResRegionState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { useResStreamingReleaseState } from "../state/useStreamingReleasesState";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Backdrop, CircularProgress } from '@mui/material'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true);

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
            items: 1,
            slidesToSlide: 1
        }
    };

    const responsive1 = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 8, //so slider hien thi
            slidesToSlide: 8
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 5,
            slidesToSlide: 5
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
    }

    const { icons, imgs, styleColor } = useGlobal()
    const { resGenres } = useResGenresState()//, setResGenres
    const { resSources, setResSources } = useResSourceState()
    const { resRegions } = useResRegionState()//, setResRegions
    const {
        // resStreamingRelease,
        setResStreamingRelease,
        resStreamingReleaseMovie,
        resStreamingReleaseShortFilm,
        resStreamingReleaseTVMiniseries,
        resStreamingReleaseTVSeries,
        resStreamingReleaseTVSpecial
    } = useResStreamingReleaseState()
    const { setSelectNav, checkedSources, setCheckedSources } = useStateGeneral()

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };

    const handleSelectSource = (id: number) => {
        const newSources = checkedSources.includes(id)
            ? checkedSources.filter((v) => v !== id)
            : [...checkedSources, id];

        setCheckedSources(newSources)
        // navigate('/universal', { state: { selectSource: newSources } })
        navigate('/universal')
    };

    // const getApiGenres = async () => {
    //     try {
    //         const res = await getGenres()
    //         setResGenres(res.data)
    //     } catch (error: any) {
    //         console.error("Lỗi khi gọi API getGenres", error)
    //         toast.error(error.response?.statusMessage || "Lỗi khi gọi API getGenres")
    //     }
    // }

    const getApiSources = async () => {
        try {
            setLoading(true);
            const res = await getSources()
            setResSources(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getApiSources", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getApiSources")
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    // const getApiRegion = async () => {
    //     try {
    // setLoading(true);
    //         const res = await getRegions()
    //         setResRegions(res.data)
    //     } catch (error: any) {
    //         console.error("Lỗi khi gọi API getRegions", error)
    //         toast.error(error.response?.statusMessage || "Lỗi khi gọi API getRegions")
    //     }
    // finally {
    //         setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    //     }
    // }

    const getApiResStreamingRelease = async () => {
        try {
            setLoading(true);
            const res = await getStreamingReleases()
            setResStreamingRelease(res.data.releases)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getStreamingReleases", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getStreamingReleases")
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        // getApiGenres()
        // getApiRegion()

        getApiSources()
        getApiResStreamingRelease()
        setSelectNav(0)
    }, [])

    const getYear = (date: string) => {
        const convertDate = new Date(date)
        return convertDate.toLocaleDateString('en-US')
    }

    const handleViewAll = () => {
        navigate(`/universal`)
    }

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
            <div className="py-5">
                <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
                    {[
                        { data: resStreamingReleaseMovie, title: "Trending Movies" },
                        { data: resStreamingReleaseTVSeries, title: "Trending TV Series" },
                        { data: resStreamingReleaseTVSpecial, title: "Trending TV Specials" },
                        { data: resStreamingReleaseTVMiniseries, title: "Trending Miniseries" },
                        { data: resStreamingReleaseShortFilm, title: "Trending Short Films" },
                    ].map(({ data, title }) => (
                        data.length > 0 && (
                            <div className="items-center transition-all duration-300 ease">
                                <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                    <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">{title}</h3>
                                    <button className="flex gap-1 items-center text-cyan-300 tracking-wide"
                                        onClick={handleViewAll}
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
                                                key={res.id}
                                                onClick={() =>
                                                    navigate(`/universal-detail/${res.id}`, {
                                                        state: { idDetail: res.id },
                                                    })
                                                }
                                                className="relative group w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-lg border border-gray-700/50 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out"
                                            >
                                                {/* Poster background */}
                                                <img
                                                    src={res.poster_url}
                                                    alt={res.source_name}
                                                    onError={handleImgError}
                                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-60"
                                                />

                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Badge Original */}
                                                {res.is_original === 1 && (
                                                    <span className="absolute top-3 right-3 px-3 py-1 bg-cyan-400 text-gray-900 font-bold text-sm rounded-md shadow-md backdrop-blur-sm">
                                                        Original
                                                    </span>
                                                )}

                                                {/* Play Icon Center */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                                                    <span className="text-cyan-300 text-7xl drop-shadow-[0_0_10px_#22d3ee] animate-pulse">
                                                        {icons.iconPlayCircle}
                                                    </span>
                                                </div>

                                                {/* Info Section (bottom) */}
                                                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-2 z-10">
                                                    <h3 className="text-white text-start font-bold text-lg leading-tight line-clamp-2 hover:text-cyan-300 transition-colors duration-300">
                                                        {res.title}
                                                    </h3>
                                                    <div className="flex gap-1 items-center text-sm text-gray-300">
                                                        <span className="opacity-80 text-white/80 text-start"><strong>{res.season_number ?? 0}</strong> sources</span>
                                                        <div className="w-[2px] h-[12px] bg-gray-500"></div>
                                                        <span className="opacity-80 text-white/80 text-start">{getYear(res.source_release_date)}</span>
                                                    </div>
                                                    <button
                                                        className="flex w-fit items-center gap-2 px-3 py-1.5 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                                                        style={styleColor(res.source_id)}
                                                    >
                                                        <span className=" text-base">{icons.iconPlay}</span>
                                                        <span className="truncate  " title={res.source_name}>
                                                            {res.source_name}
                                                        </span>
                                                    </button>
                                                </div>
                                            </button>

                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        )))}
                    {resSources.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Browse By Sources</h3>
                                <button className="flex gap-1 items-center text-cyan-300 tracking-wide"
                                    onClick={() =>
                                        navigate('/sources')
                                    }
                                >View all <span className="text-cyan-300">{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full grid mx-auto mt-5">
                                <Carousel
                                    responsive={responsive1}
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
                                    {resSources.map((res) => (
                                        <div key={res.id} className="group grid gap-2">
                                            <button className="flex flex-col gap-2 border shadow-lg hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30"
                                                onClick={() => handleSelectSource(res.id)}
                                            >
                                                <img src={res.logo_100px} alt={res.name} onError={handleImgError}
                                                    /* grayscale group-hover:grayscale-0 */
                                                    className="w-[150px] aspect-[1/1] w-full rounded-[10px] transition-all duration-300 ease group-hover:scale-105" />
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resRegions.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Browse By Region</h3>
                                <button className="flex gap-1 items-center text-cyan-300 tracking-wide"
                                    onClick={() =>
                                        navigate('/region')
                                    }
                                >View all <span className="text-cyan-300">{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full grid mx-auto mt-5">
                                <Carousel
                                    responsive={responsive1}
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
                                    {resRegions.map((res, id) => (
                                        <div key={id} className="group grid gap-2 relative bg-black border shadow-lg hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30">
                                            <img src={res.flag} alt={res.name} onError={handleImgError}
                                                className="w-full aspect-[2/1] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 opacity-40" />
                                            <h3 className="absolute w-full opacity-100 text-white/70 font-bold transition-all duration-300 ease text-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center group-hover:text-xl group-hover:text-white">{res.name}</h3>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resGenres.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Browse By Genres</h3>
                                <button className="flex gap-1 items-center text-cyan-300 tracking-wide"
                                    onClick={() =>
                                        navigate('/genres')
                                    }
                                >View all <span className="text-cyan-300">{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full grid mx-auto mt-5">
                                <Carousel
                                    responsive={responsive1}
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
                                    {resGenres.map((res) => (
                                        <div key={res.id} className="group justify-center items-center aspect-[2/1] grid bg-gray-900 transition-all border shadow-lg duration-300 ease rounded-[10px] hover:scale-105 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30">
                                            <h3 className="w-full px-2 py-2 opacity-100 text-white/70 font-bold transition-all duration-300 ease text-lg  text-center group-hover:text-xl group-hover:text-white">{res.name}</h3>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Home;