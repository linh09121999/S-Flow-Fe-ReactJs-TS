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
            items: 6, //so slider hien thi
            slidesToSlide: 6
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
        getApiSources()
        // getApiRegion()
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
                    {resStreamingReleaseMovie.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl text-white font-bold">Trending Movie</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={handleViewAll}
                                >View all <span>{icons.iconNext}</span></button>
                            </div>

                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                    {resStreamingReleaseMovie.map((res) => (
                                        <div key={res.id} className="group grid gap-2 ">
                                            <button className="flex flex-col gap-2"
                                                onClick={() => {
                                                    navigate(`/universal-detail/${res.id}`, { state: { idDetail: res.id } })
                                                }}
                                            >
                                                <div className="relative">
                                                    <img src={res.poster_url} alt={res.source_name}
                                                        onError={handleImgError}
                                                        className="w-full aspect-[3/4] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                                    <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease text-cyan-300 opacity-0 group-hover:opacity-100">{icons.iconPlayCircle}</span>
                                                    {res.is_original === 1 && (
                                                        <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-300 backdrop-blur-[10px] text-cyan-950 font-bold transition-all duration-300 ease rounded-[5px_10px_5px_5px] group-hover:opacity-70">Original</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white/80 text-lg font-bold text-start transition-all duration-300 ease group-hover:opacity-70">{res.title}</h3>
                                                <div className="flex gap-1 text-white/70 text-sm transition-all duration-300 ease group-hover:opacity-70">{getYear(res.source_release_date)}</div>
                                            </button>
                                            <button className={`flex gap-2 self-end text-sm text-white text-start items-center px-2 h-[30px] w-fit rounded-[10px] transition-all duration-300 ease`} style={styleColor(res.source_id)}>
                                                {icons.iconPlay}{res.source_name}
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resStreamingReleaseTVSeries.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl text-white font-bold">Trending TV Series</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={handleViewAll}
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                    {resStreamingReleaseTVSeries.map((res) => (
                                        <div key={res.id} className="group grid gap-2 ">
                                            <button className="flex flex-col gap-2"
                                                onClick={() => {
                                                    navigate(`/universal-detail/${res.id}`, { state: { idDetail: res.id } })
                                                }}
                                            >
                                                <div className="relative">
                                                    <img src={res.poster_url} alt={res.source_name}
                                                        onError={handleImgError}
                                                        className="w-full aspect-[3/4] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                                    <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease text-cyan-300 opacity-0 group-hover:opacity-100">{icons.iconPlayCircle}</span>
                                                    {res.is_original === 1 && (
                                                        <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-300 backdrop-blur-[10px] text-cyan-950 font-bold transition-all duration-300 ease rounded-[5px_10px_5px_5px] group-hover:opacity-70">Original</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white/80 text-lg font-bold text-start transition-all duration-300 ease group-hover:opacity-70">{res.title}</h3>
                                                <div className="flex gap-1 text-white/70 text-sm transition-all duration-300 ease group-hover:opacity-70">{getYear(res.source_release_date)}</div>
                                            </button>
                                            <button className={`flex gap-2 self-end text-sm text-white text-start items-center px-2 h-[30px] w-fit rounded-[10px] transition-all duration-300 ease`} style={styleColor(res.source_id)}>
                                                {icons.iconPlay}{res.source_name}
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resStreamingReleaseTVSpecial.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl text-white font-bold">Trending TV Special</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={handleViewAll}
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                    {resStreamingReleaseTVSpecial.map((res) => (
                                        <div key={res.id} className="group grid gap-2 ">
                                            <button className="flex flex-col gap-2"
                                                onClick={() => {
                                                    navigate(`/universal-detail/${res.id}`, { state: { idDetail: res.id } })
                                                }}
                                            >
                                                <div className="relative">
                                                    <img src={res.poster_url} alt={res.source_name}
                                                        onError={handleImgError}
                                                        className="w-full aspect-[3/4] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                                    <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease text-cyan-300 opacity-0 group-hover:opacity-100">{icons.iconPlayCircle}</span>
                                                    {res.is_original === 1 && (
                                                        <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-300 backdrop-blur-[10px] text-cyan-950 font-bold transition-all duration-300 ease rounded-[5px_10px_5px_5px] group-hover:opacity-70">Original</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white/80 text-lg font-bold text-start transition-all duration-300 ease group-hover:opacity-70">{res.title}</h3>
                                                <div className="flex gap-1 text-white/70 text-sm transition-all duration-300 ease group-hover:opacity-70">{getYear(res.source_release_date)}</div>
                                            </button>
                                            <button className={`flex gap-2 self-end text-sm text-white text-start items-center px-2 h-[30px] w-fit rounded-[10px] transition-all duration-300 ease`} style={styleColor(res.source_id)}>
                                                {icons.iconPlay}{res.source_name}
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resStreamingReleaseTVMiniseries.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl text-white font-bold">Trending TV Miniseries</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={handleViewAll}
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                    {resStreamingReleaseTVMiniseries.map((res) => (
                                        <div key={res.id} className="group grid gap-2 ">
                                            <button className="flex flex-col gap-2"
                                                onClick={() => {
                                                    navigate(`/universal-detail/${res.id}`, { state: { idDetail: res.id } })
                                                }}
                                            >
                                                <div className="relative">
                                                    <img src={res.poster_url} alt={res.source_name}
                                                        onError={handleImgError}
                                                        className="w-full aspect-[3/4] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                                    <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease text-cyan-300 opacity-0 group-hover:opacity-100">{icons.iconPlayCircle}</span>
                                                    {res.is_original === 1 && (
                                                        <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-300 backdrop-blur-[10px] text-cyan-950 font-bold transition-all duration-300 ease rounded-[5px_10px_5px_5px] group-hover:opacity-70">Original</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white/80 text-lg font-bold text-start transition-all duration-300 ease group-hover:opacity-70">{res.title}</h3>
                                                <div className="flex gap-1 text-white/70 text-sm transition-all duration-300 ease group-hover:opacity-70">{getYear(res.source_release_date)}</div>
                                            </button>
                                            <button className={`flex gap-2 self-end text-sm text-white text-start items-center px-2 h-[30px] w-fit rounded-[10px] transition-all duration-300 ease`} style={styleColor(res.source_id)}>
                                                {icons.iconPlay}{res.source_name}
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resStreamingReleaseShortFilm.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl text-white font-bold">Trending Short Film</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={handleViewAll}
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                    {resStreamingReleaseShortFilm.map((res) => (
                                        <div key={res.id} className="group grid gap-2 ">
                                            <button className="flex flex-col gap-2"
                                                onClick={() => {
                                                    navigate(`/universal-detail/${res.id}`, { state: { idDetail: res.id } })
                                                }}
                                            >
                                                <div className="relative">
                                                    <img src={res.poster_url} alt={res.source_name}
                                                        onError={handleImgError}
                                                        className="w-full aspect-[3/4] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                                    <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease text-cyan-300 opacity-0 group-hover:opacity-100">{icons.iconPlayCircle}</span>
                                                    {res.is_original === 1 && (
                                                        <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-300 backdrop-blur-[10px] text-cyan-950 font-bold transition-all duration-300 ease rounded-[5px_10px_5px_5px] group-hover:opacity-70">Original</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white/80 text-lg font-bold text-start transition-all duration-300 ease group-hover:opacity-70">{res.title}</h3>
                                                <div className="flex gap-1 text-white/70 text-sm transition-all duration-300 ease group-hover:opacity-70">{getYear(res.source_release_date)}</div>
                                            </button>
                                            <button className={`flex gap-2 self-end text-sm text-white text-start items-center px-2 h-[30px] w-fit rounded-[10px] transition-all duration-300 ease`} style={styleColor(res.source_id)}>
                                                {icons.iconPlay}{res.source_name}
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    }
                    {resSources.length > 0 &&
                        <div className="items-center transition-all duration-300 ease">
                            <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                                <h3 className="text-xl text-white font-bold">Browse By Sources</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={() =>
                                        navigate('/sources')
                                    }
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                            <button className="flex flex-col gap-2"
                                                onClick={() => handleSelectSource(res.id)}
                                            >
                                                <img src={res.logo_100px} alt={res.name} onError={handleImgError}
                                                    /* grayscale group-hover:grayscale-0 */
                                                    className="w-[150px] aspect-[1/1] rounded-[10px] transition-all duration-300 ease group-hover:scale-105" />
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
                                <h3 className="text-xl text-white font-bold">Browse By Region</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={() =>
                                        navigate('/region')
                                    }
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                        <div key={id} className="group grid gap-2 relative bg-black">
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
                                <h3 className="text-xl text-white font-bold">Browse By Genres</h3>
                                <button className="flex gap-1 items-center text-cyan-300"
                                    onClick={() =>
                                        navigate('/genres')
                                    }
                                >View all <span>{icons.iconNext}</span></button>
                            </div>
                            <div className="w-full mx-auto mt-5 xl:max-w-9xl">
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
                                        <div key={res.id} className="group justify-center items-center aspect-[2/1] grid bg-gray-900 transition-all duration-300 ease rounded-[10px] hover:scale-105">
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