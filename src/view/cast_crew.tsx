import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateGeneral } from "../state/useStateGeneral";
import { useResTitleCast_CrewState } from "../state/useTitleState";
import { getTitleCast_Crew } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { useGlobal } from "../context/GlobalContext";
import {
    TextField, InputAdornment, IconButton,
    Backdrop, CircularProgress
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

const CastCrew: React.FC = () => {
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
    const [loading, setLoading] = useState<boolean>(true);

    const { setSelectNav, setIsCastCrew, isCastCrew } = useStateGeneral()
    const { resTitleCast, resTitleCrew, setResTitleCastCrew } = useResTitleCast_CrewState()

    const getApiTitleCast_Crew = async (titleId: number) => {
        try {
            setLoading(true);
            const res = await getTitleCast_Crew(titleId)
            setResTitleCastCrew(res.data)
        } catch (error: any) {
            toast.error(`Title Cast/Crew ${titleId}: ` + error.response?.data?.statusMessage)
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const { icons } = useGlobal()

    const location = useLocation();
    const { idDetail } = location.state || {};
    useEffect(() => {
        setSelectNav(1)
        if (idDetail) {
            getApiTitleCast_Crew(idDetail)
        } else {
            navigate(`/universal-detail/${idDetail}`)
        }
    }, [])

    const [inputValueCast, setInputValueCast] = useState<string>("");
    const [inputValueCrew, setInputValueCrew] = useState<string>("");

    const filteredCast = useMemo(() => {
        if (!inputValueCast.trim()) return resTitleCast;
        return resTitleCast.filter((r) =>
            r.full_name.toLowerCase().includes(inputValueCast.toLowerCase())
        );
    }, [inputValueCast, resTitleCast]);

    const filteredCrew = useMemo(() => {
        if (!inputValueCrew.trim()) return resTitleCrew;
        return resTitleCrew.filter((r) =>
            r.full_name.toLowerCase().includes(inputValueCrew.toLowerCase())
        );
    }, [inputValueCrew, resTitleCrew]);

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
                    <span>{icons.iconNext}</span>
                    <button
                        onClick={() => navigate(`/universal-detail/${idDetail}`)}
                        className='transition duration-300 ease hover:scale-110 cursor-pointer'
                    >
                        Detail
                    </button>
                    <span className='text-sm'>{icons.iconNext}</span>
                    <div className='transition duration-300 ease'>Cast Crew</div>
                </div>
            </div>
            <div className="max-w-[1535px] text-lg text-white/70 mx-auto gap-4 md:gap-6 flex flex-col py-4 md:py-5">
                <div className="flex flex-col md:flex-row justify-between gap-3 sm:gap-4">
                    <div className="flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto scroll-x pb-2 sm:pb-0 scrollbar-hide">
                        {[
                            { label: 'Cast' },
                            { label: 'Crew' },
                        ].map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setIsCastCrew(index)}
                                className={`
                        border flex-shrink-0 transition-all duration-300 ease-in-out hover:text-cyan-300
                        ${isCastCrew === index
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
                    <div className="w-full sm:w-auto min-w-[200px]">
                        <TextField
                            type="search"
                            placeholder={isCastCrew === 0 ? "Search cast..." : "Search crew..."}
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
                            onChange={(e) => { isCastCrew === 0 ? setInputValueCast(e.target.value) : setInputValueCrew(e.target.value) }}
                            value={isCastCrew === 0 ? inputValueCast : inputValueCrew}
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
                {[
                    { data: filteredCast },
                    { data: filteredCrew },
                ].map((tabData, index) => (
                    <div
                        key={index}
                        className={`
                ${isCastCrew === index ? 'animate-fadeIn' : 'hidden'}
                grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 
                gap-3 sm:gap-4 md:gap-6 lg:gap-8
            `}
                    >
                        {tabData.data?.map((res) => (
                            <button
                                key={res.person_id}
                                onClick={() => {
                                    navigate(`/person-detail/${res.person_id}`, {
                                        state: { idPersonDetail: res.person_id },
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
                    from-black/90 via-black/60 to-black/30
                    opacity-90 group-hover:opacity-100 
                    transition-opacity duration-300 ease-in-out">
                                </div>

                                {/* Thông tin */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                    <h3 className="text-white font-semibold text-lg leading-tight 
                       drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] 
                       group-hover:text-cyan-300 transition-colors duration-300">
                                        {res.full_name}
                                    </h3>
                                    <p className="text-sm text-gray-300 group-hover:text-cyan-200/80 
                      drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                                        {res.role}
                                    </p>
                                    {res.episode_count && (
                                        <span className="mt-1 inline-block text-xs text-white/80 
                             bg-cyan-500/30 px-2 py-[2px] rounded-full 
                             backdrop-blur-sm border border-cyan-400/30">
                                            {res.episode_count} Episodes
                                        </span>
                                    )}
                                </div>

                                {/* Badge thứ tự */}
                                <span className="absolute top-2 left-2 bg-cyan-500/90 text-white text-xs font-bold 
                     px-2 py-[1px] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                    #{res.order}
                                </span>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default CastCrew