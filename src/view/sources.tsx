import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getSources, } from "../services/userService"
import { useResSourceState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { Backdrop, CircularProgress } from '@mui/material'

const Sources: React.FC = () => {
    const navigate = useNavigate()
    const { icons, imgs } = useGlobal()
    const { resSources, setResSources, resSourcesFree, resSourcesPurchase, resSourcesSub, resSourcesTv2 } = useResSourceState()
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };
    const { setSelectNav, checkedSources } = useStateGeneral()
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        getApiSources()
        setSelectNav(0)
    }, [])

    const [value, setValue] = useState<number>(0);

    const handleSelectSource = (id: number) => {
        const newSources = checkedSources.includes(id)
            ? checkedSources.filter((v) => v !== id)
            : [...checkedSources, id];

        navigate('/universal', { state: { selectSource: newSources } })
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
            <div className='w-full px-5 sticky z-[999] top-[80px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <div
                        onClick={() => navigate("/")}
                        className='transition duration-300 ease css-icon'>{icons.iconHome}</div>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Sources</div>
                </div>
            </div>
            <div className="max-w-[1535px] text-lg text-white/70 mx-auto gap-6 flex flex-col mt-5">
                <div className="flex gap-4">
                    {[
                        { label: 'All' },
                        { label: 'Sub' },
                        { label: 'Free' },
                        { label: 'Tve' },
                        { label: 'Purchase' },
                    ].map((tab, index) => (
                        <button key={index}
                            onClick={() => setValue(index)}
                            className={`border-[1px] css-icon ${value === index ? "text-cyan-300 border-cyan-300" : "border-gray-500"} w-fit h-[40px] text-lg px-4 rounded-[10px] hover:text-cyan-300 hover:border-cyan-300`}>{tab.label}</button>
                    ))}
                </div>
                {[
                    { data: resSources },
                    { data: resSourcesSub },
                    { data: resSourcesFree },
                    { data: resSourcesTv2 },
                    { data: resSourcesPurchase },
                ].map((tabData, index) => (
                    <div key={index} className={`${value === index ? '' : 'hidden'} grid grid-cols-5 gap-8`}>
                        {tabData.data?.map((res) => (

                            <button key={res.id} className="group flex flex-col gap-2 text-white/70 relative"
                                onClick={() => handleSelectSource(res.id)}
                            >
                                <img src={res.logo_100px} alt={res.name} onError={handleImgError}
                                    /* grayscale group-hover:grayscale-0 */
                                    className="aspect-[1/1] rounded-[10px] transition-all duration-300 ease group-hover:scale-105" />

                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default Sources