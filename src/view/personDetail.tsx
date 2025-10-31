import React, { useEffect, useState } from "react";
import { useStateGeneral } from "../state/useStateGeneral";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useResPersonState, type ResPerson } from "../state/usePersonState";
import { getPerson } from "../services/userService";
import { useGlobal } from "../context/GlobalContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PersonDetail: React.FC = () => {
    const { setSelectNav, setIsCastCrew, isCastCrew } = useStateGeneral()
    const navigate = useNavigate()
    const { icons } = useGlobal()
    
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

    const { resPerson, setResPerson, resPersonKnowFor, setResPersonKnowFor } = useResPersonState()
    const [listPersonId, setListPersonId] = useState<number[]>([])

    const getApiPerson = async (personId: number) => {
        try {
            const res = await getPerson(personId)
            setResPerson(res.data)
            setListPersonId(res.data.known_for)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getTitleCast_Crew", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getTitleCast_Crew")
        }
    }

    const getApiPersonKnowFor = async (personIds: number[]): Promise<void> => {
        try {
            const results: ResPerson[] = await Promise.all(
                personIds.map(async (id): Promise<ResPerson> => {
                    const res = await getPerson(id)
                    return res.data
                })
            )

            setResPersonKnowFor(results)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getPerson:", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getPerson")
        }
    }

    const location = useLocation();
    const { idPersonDetail, idDetail } = location.state || {};
    useEffect(() => {
        setSelectNav(1)
        // getApiPerson(idPersonDetail)
        // getApiPersonKnowFor(listPersonId)
        // console.log(listPersonId)
    }, [])

    return (
        <>
            <div className='w-full sticky z-[999]  md:top-[80px] top-[73px] backdrop-blur-[10px] bg-black/50'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl md:text-lg sm:text-base'>
                    <span>{icons.iconNext}</span>
                    <button
                        onClick={() => navigate(`/universal-detail/${idDetail}`)}
                        className='transition duration-300 ease hover:scale-110 cursor-pointer'
                    >
                        Detail
                    </button>
                    <span className='text-sm'>{icons.iconNext}</span>
                    <button
                        onClick={() => navigate(`/cast-crew/${idDetail}`)}
                        className='transition duration-300 ease hover:scale-110 cursor-pointer'
                    >Cast Crew</button>
                    <span className='text-sm'>{icons.iconNext}</span>
                    <div className='transition duration-300 ease'>Detail</div>
                </div>
            </div>
            <div className="max-w-[1535px] text-lg text-white/70 mx-auto gap-4 md:gap-6 flex flex-col py-4 md:py-5">
                <section className="relative flex flex-col md:flex-row items-center gap-8">

                    <div className="relative z-10 w-[260px] h-[340px] md:w-[320px] md:h-[440px] rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-900/40 
               hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30">
                        <img src={resPerson?.headshot_url}
                            alt={resPerson?.full_name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>


                    <div className="relative md:self-start z-10 max-w-2xl text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">
                            {resPerson?.first_name} <span className="text-cyan-400">{resPerson?.last_name}</span>
                        </h1>
                        <div className="text-gray-300 mb-6 text-lg flex gap-2 items-center max-md:justify-center">
                            {resPerson?.main_profession &&
                                <span>{resPerson?.main_profession}</span>
                            }
                            {resPerson?.secondary_profession &&
                                <>
                                    <div className="w-[2px] h-[15px] bg-gray-500"></div>
                                    <span>{resPerson?.secondary_profession} </span>
                                </>
                            }
                            {resPerson?.tertiary_profession &&
                                <>
                                    <div className="w-[2px] h-[15px] bg-gray-500"></div>
                                    <span>{resPerson?.tertiary_profession}</span>
                                </>
                            }

                        </div>

                        <div className="grid grid-cols-1 gap-4 text-sm text-gray-300">
                            {resPerson?.date_of_birth &&
                                <p><span className="font-semibold text-cyan-400">Born: </span> {resPerson?.date_of_birth}</p>
                            }
                            {resPerson?.gender &&
                                <p><span className="font-semibold text-cyan-400">Gender: </span> {resPerson?.gender}</p>
                            }
                            {resPerson?.place_of_birth &&
                                <p><span className="font-semibold text-cyan-400">Place of Birth: </span>
                                    {resPerson?.place_of_birth}
                                </p>
                            }
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href="https://www.imdb.com/name/nm0000093"
                                className="px-6 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/30 transition-all duration-300">
                                View on IMDb
                            </a>
                            <span className="px-6 py-2 rounded-full border border-gray-600 bg-gray-800/50 text-gray-300">
                                Relevance: {resPerson?.relevance_percentile}
                            </span>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="flex justify-between text-white css-next items-center w-full transition-all duration-300 ease">
                        <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Known For</h3>
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
                            {resPersonKnowFor.map((res) => (
                                <button
                                    key={res.id}
                                    onClick={() => {
                                        navigate(`/person-detail/${res.id}`, {
                                            state: { idPersonDetail: res.id },
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
                    from-black/90 via-black/60 to-black/20
                    opacity-80 group-hover:opacity-100 
                    transition-opacity duration-300 ease-in-out">
                                    </div>

                                    {/* Thông tin */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                        <h3 className="text-white font-semibold text-lg leading-tight 
                       drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] 
                       group-hover:text-cyan-300 transition-colors duration-300">
                                            {res.full_name}
                                        </h3>
                                        
                                    </div>

                                    {/* Badge thứ tự */}
                                    <span className="absolute top-2 left-2 bg-cyan-500/90 text-white text-xs font-bold 
                     px-2 py-[1px] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                        #{res.relevance_percentile}
                                    </span>
                                </button>
                            ))}
                        </Carousel>
                    </div>

                </section>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default PersonDetail