import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/userService"
import { useResGenresState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { Backdrop, CircularProgress } from '@mui/material'

const Genres: React.FC = () => {
    const navigate = useNavigate()
    const { icons } = useGlobal()
    const { resGenres, setResGenres } = useResGenresState()
    const { setSelectNav } = useStateGeneral()

    const [loading, setLoading] = useState<boolean>(true);

    const getApiGenres = async () => {
        try {
            setLoading(true);
            const res = await getGenres()
            setResGenres(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getGenres", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getGenres")
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        getApiGenres()
        setSelectNav(0)
    }, [])

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
            <div className='w-full px-5 sticky z-[999] md:top-[80px] top-[73px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Genres</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 
                gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-5">
                {resGenres.map((res) => (
                    <button onClick={handleViewAll} key={res.id} className="group justify-center items-center aspect-[2/1] grid bg-gray-900 transition-all duration-300 ease rounded-[10px] hover:scale-105">
                        <h3 className="w-full px-2 py-2 opacity-100 text-white/70 font-bold transition-all duration-300 ease text-lg  text-center group-hover:text-xl group-hover:text-white">{res.name}</h3>
                    </button>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default Genres