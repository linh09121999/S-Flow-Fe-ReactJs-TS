import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getSources, } from "../services/userService"
import { useResSourceState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import {
    Backdrop, CircularProgress,
    TextField, InputAdornment, IconButton
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

const Sources: React.FC = () => {
    const sxTextField: SxProps<Theme> = {
        width: '450px',
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
            backdropFilter: 'blur(10px)',
            padding: '3px 8px !important',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-800)',
            height: '40px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            border: 'none'
        },

        '& .MuiOutlinedInput-input': {
            padding: 0
        },

        '& .MuiInputBase-input': {
            color: 'var(--color-cyan-300)',
            paddingLeft: '14px',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }

    const navigate = useNavigate()
    const { icons, imgs } = useGlobal()
    const { resSources, setResSources, resSourcesFree, resSourcesPurchase, resSourcesSub, resSourcesTv2 } = useResSourceState()
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };
    const { setSelectNav, checkedSources, setCheckedSources } = useStateGeneral()
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
        setCheckedSources(newSources)
        // navigate('/universal', { state: { selectSource: newSources } })
        navigate('/universal')
    };

    const [inputValueSources, setInputValueSources] = useState<string>("");
    const filteredSources = useMemo(() => {
        if (!inputValueSources.trim()) return resSources;
        return resSources.filter((r) =>
            r.name.toLowerCase().includes(inputValueSources.toLowerCase())
        );
    }, [inputValueSources, resSources]);

    const filteredSourcesSub = useMemo(() => {
        if (!inputValueSources.trim()) return resSourcesSub;
        return resSourcesSub.filter((r) =>
            r.name.toLowerCase().includes(inputValueSources.toLowerCase())
        );
    }, [inputValueSources, resSourcesSub]);

    const filteredSourcesFree = useMemo(() => {
        if (!inputValueSources.trim()) return resSourcesFree;
        return resSourcesFree.filter((r) =>
            r.name.toLowerCase().includes(inputValueSources.toLowerCase())
        );
    }, [inputValueSources, resSourcesFree]);

    const filteredSourcesTv2 = useMemo(() => {
        if (!inputValueSources.trim()) return resSourcesTv2;
        return resSourcesTv2.filter((r) =>
            r.name.toLowerCase().includes(inputValueSources.toLowerCase())
        );
    }, [inputValueSources, resSourcesTv2]);

    const filteredSourcesPurchase = useMemo(() => {
        if (!inputValueSources.trim()) return resSourcesPurchase;
        return resSourcesPurchase.filter((r) =>
            r.name.toLowerCase().includes(inputValueSources.toLowerCase())
        );
    }, [inputValueSources, resSourcesPurchase]);

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
            <div className='w-full sticky z-[999] top-[80px] backdrop-blur-[10px] bg-black/50'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl md:text-lg sm:text-base'>
                    <button
                        onClick={() => navigate("/")}
                        className='transition duration-300 ease hover:scale-110 cursor-pointer'
                    >
                        {icons.iconHome}
                    </button>
                    <span className='text-sm'>{icons.iconNext}</span>
                    <div className='transition duration-300 ease'>Sources</div>
                </div>
            </div>

            <div className="max-w-[1535px] text-lg text-white/70 mx-auto gap-4 md:gap-6 flex flex-col py-4 md:py-5">
                {/* Filter và Search Section */}
                <div className="flex flex-col md:flex-row justify-between gap-3 sm:gap-4">
                    {/* Filter Tabs */}
                    <div className="flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto scroll-x pb-2 sm:pb-0 scrollbar-hide">
                        {[
                            { label: 'All' },
                            { label: 'Sub' },
                            { label: 'Free' },
                            { label: 'Tve' },
                            { label: 'Purchase' },
                        ].map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setValue(index)}
                                className={`
                        border flex-shrink-0 transition-all duration-300 ease-in-out hover:text-cyan-300
                        ${value === index
                                        ? " text-cyan-300 border-cyan-500"
                                        : "  border-cyan-500/20"
                                    }
                        h-[40px] px-3 rounded-lg text-lg shadow-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black
                    `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="w-full sm:w-auto min-w-[200px]">
                        <TextField
                            type="search"
                            placeholder="Search sources..."
                            sx={{
                                ...sxTextField,
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    height: '40px',
                                    fontSize: '14px',
                                    '@media (min-width: 640px)': {
                                        fontSize: '16px',
                                        height: '44px'
                                    }
                                }
                            }}
                            onChange={(e) => setInputValueSources(e.target.value)}
                            value={inputValueSources}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{
                                                color: 'var(--color-cyan-300)',
                                                padding: '8px'
                                            }}
                                        >
                                            {icons.iconSearch}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>

                {/* Content Grid */}
                {[
                    { data: filteredSources },
                    { data: filteredSourcesSub },
                    { data: filteredSourcesFree },
                    { data: filteredSourcesTv2 },
                    { data: filteredSourcesPurchase },
                ].map((tabData, index) => (
                    <div
                        key={index}
                        className={`
                ${value === index ? 'animate-fadeIn' : 'hidden'}
                grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 
                gap-3 sm:gap-4 md:gap-6 lg:gap-8
            `}
                    >
                        {tabData.data?.map((res) => (
                            <button
                                key={res.id}
                                className="group flex flex-col gap-2 text-white/70 relative"
                                onClick={() => handleSelectSource(res.id)}
                            >
                                <img
                                    src={res.logo_100px}
                                    alt={res.name}
                                    onError={handleImgError}
                                    className="
                            aspect-square rounded-lg transition-all duration-300 ease-in-out
                            object-cover bg-gray-700 group-hover:scale-105 group-hover:shadow-lg
                            group-hover:shadow-cyan-300/20 border border-gray-600
                        "
                                />
                                {/* <div className="text-xs sm:text-sm text-center truncate px-1 group-hover:text-cyan-300 transition-colors">
                                    {res.name}
                                </div> */}
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