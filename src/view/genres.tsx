import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/userService"
import { useResGenresState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
const Genres: React.FC = () => {
    const navigate = useNavigate()
    const { icons, imgs, contentType, serviceType, styleColor } = useGlobal()
    const { resGenres, setResGenres } = useResGenresState()
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };
    const { setSelectNav } = useStateGeneral()

    const getApiGenres = async () => {
        try {
            const res = await getGenres()
            setResGenres(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getGenres", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getGenres")
        }
    }

    useEffect(() => {
        // getApiGenres()
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
                    <div className='transition duration-300 ease css-icon'>Genres</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto grid grid-cols-5 py-5 gap-8">
                {resGenres.map((res) => (
                    <div key={res.id} className="group justify-center items-center aspect-[2/1] grid bg-gray-900 transition-all duration-300 ease rounded-[10px] hover:scale-105">
                        <h3 className="w-full px-2 py-2 opacity-100 text-white/70 font-bold transition-all duration-300 ease text-lg  text-center group-hover:text-xl group-hover:text-white">{res.name}</h3>
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default Genres