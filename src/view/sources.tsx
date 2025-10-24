import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getSources, } from "../services/userService"
import { useResSourceState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'

const Sources: React.FC = () => {
    const navigate = useNavigate()
    const { icons, imgs, contentType, serviceType, styleColor } = useGlobal()
    const { resSources, setResSources } = useResSourceState()
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };
    const { setSelectNav } = useStateGeneral()

    const getApiSources = async () => {
        try {
            const res = await getSources()
            setResSources(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getApiSources", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getApiSources")
        }
    }

    useEffect(() => {
        // getApiSources()
        setSelectNav(0)
    }, [])

    return (
        <>
            <div className='w-full px-5 sticky z-[999] top-[80px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <div
                        onClick={() => navigate("/")}
                        className='transition duration-300 ease css-icon'>{icons.iconHome}</div>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Sources</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto grid grid-cols-7 py-5 gap-8">
                {resSources.map((res) => (
                    <div key={res.id} className="group grid gap-2">
                        <button className="flex flex-col gap-2"
                        >
                            <img src={res.logo_100px} alt={res.name} onError={handleImgError}
                                /* grayscale group-hover:grayscale-0 */
                                className="aspect-[1/1] rounded-[10px] transition-all duration-300 ease group-hover:scale-105" />
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default Sources