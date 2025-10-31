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
            toast.error(`Sources: `+ error.response?.data?.statusMessage)
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
            <div className='w-full sticky z-[999]  md:top-[80px] top-[73px] backdrop-blur-[10px] bg-black/50'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl md:text-lg sm:text-base'>
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
                grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 
                gap-3 sm:gap-4 md:gap-6 lg:gap-8
            `}
                    >
                        {tabData.data?.map((res) => (
                            <button
                                key={res.id}
                                onClick={() => handleSelectSource(res.id)}
                                className="
        group relative w-full aspect-[1/1] overflow-hidden rounded-2xl 
        border border-gray-700/60 
        bg-gray-900/80 backdrop-blur-[10px]
        hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30
        hover:scale-[1.04] active:scale-[0.97]
        transition-all duration-500 ease-in-out
    "
                            >
                                {/* Ảnh nền với filter để dễ đọc chữ */}
                                <img
                                    src={res.logo_100px}
                                    alt={res.name}
                                    onError={handleImgError}
                                    className="
            absolute inset-0 w-full h-full object-cover 
            rounded-2xl opacity-80 group-hover:opacity-50
            transition-all duration-500 ease-in-out
        "
                                />

                                {/* Overlay gradient tối để tăng độ tương phản */}
                                <div
                                    className="
            absolute inset-0 
            bg-gradient-to-b from-black/40 via-black/20 to-black/60
            opacity-100 group-hover:opacity-70
            transition-opacity duration-500 pointer-events-none
        "
                                />

                                {/* Overlay cyan sáng khi hover */}
                                <div
                                    className="
            absolute inset-0 
            bg-gradient-to-t from-cyan-400/15 via-transparent to-transparent 
            opacity-0 group-hover:opacity-100 
            blur-xl transition-opacity duration-500 pointer-events-none
        "
                                />

                                {/* ✅ Type nổi bật hơn */}
                                <div
                                    className="
            absolute top-3 left-3 px-3 py-1.5 rounded-lg 
            bg-black/70 backdrop-blur-md border border-cyan-400/40
            text-cyan-300 text-xs uppercase font-bold tracking-wider 
            shadow-[0_0_15px_rgba(34,211,238,0.5)]
            group-hover:bg-cyan-400/20 group-hover:text-cyan-100 group-hover:border-cyan-400/60
            transition-all duration-300
        "
                                >
                                    {res.type}
                                </div>

                                {/* Layer thông tin - ẩn khi không hover */}
                                <div
                                    className="
            absolute inset-0 flex flex-col items-center justify-end p-4
            opacity-0 group-hover:opacity-100
            bg-gradient-to-t from-black/90 via-black/50 to-transparent
            transition-all duration-500 ease-in-out
        "
                                >
                                    {/* Regions với chữ lớn hơn */}
                                    <p className="
            text-sm text-white/90 font-medium text-center leading-tight
            mb-3 px-2
        ">
                                        {res.regions.slice(0, 6).join(", ")}
                                        {res.regions.length > 6 && " ..."}
                                    </p>

                                    {/* AppStore / Android icons */}
                                    <div className="flex items-center justify-center gap-3">
                                        {res.ios_appstore_url && (
                                            <a
                                                href={res.ios_appstore_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="
                        p-2 rounded-lg bg-white/15 border border-white/30
                        hover:border-cyan-400/80 hover:bg-cyan-400/20
                        hover:scale-110 active:scale-95
                        transition-all duration-300
                        backdrop-blur-md
                    "
                                                title="Open in App Store"
                                            >
                                                <span className="w-4 h-4 text-white/90">{icons.iconAppStore}</span>
                                            </a>
                                        )}
                                        {res.android_playstore_url && (
                                            <a
                                                href={res.android_playstore_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="
                        p-2 rounded-lg bg-white/15 border border-white/30
                        hover:border-cyan-400/80 hover:bg-cyan-400/20
                        hover:scale-110 active:scale-95
                        transition-all duration-300
                        backdrop-blur-md
                    "
                                                title="Open in Google Play"
                                            >
                                                <span className="w-4 h-4 text-white/90">{icons.iconAndroid}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Viền ánh sáng hover */}
                                <div
                                    className="
            absolute inset-0 rounded-2xl border-1 border-transparent 
            group-hover:border-cyan-400/30 
            transition-all duration-500 pointer-events-none
        "
                                />
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