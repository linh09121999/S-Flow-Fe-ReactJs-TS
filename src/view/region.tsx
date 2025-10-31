import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getRegions } from "../services/userService"
import { useResRegionState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { Backdrop, CircularProgress } from '@mui/material'

const Region: React.FC = () => {
    const navigate = useNavigate()
    const { icons, imgs } = useGlobal()
    const { resRegions, setResRegions } = useResRegionState()
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };
    const { setSelectNav } = useStateGeneral()
    const [loading, setLoading] = useState<boolean>(true);

    const getApiRegion = async () => {
        try {
            setLoading(true);
            const res = await getRegions()
            setResRegions(res.data)
        } catch (error: any) {
            toast.error(`Regions: `+ error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        getApiRegion()
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
            <div className='w-full px-5 sticky z-[999]  md:top-[80px] top-[73px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Region</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 
                gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-5">
                {resRegions.map((res, id) => (
                    <button key={id} className="group grid gap-2 relative bg-black"
                        onClick={handleViewAll}>
                        <img src={res.flag} alt={res.name} onError={handleImgError}
                            className="w-full aspect-[2/1] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 opacity-40" />
                        <h3 className="absolute w-full opacity-100 text-white/70 font-bold transition-all duration-300 ease text-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center group-hover:text-xl group-hover:text-white">{res.name}</h3>
                    </button>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default Region