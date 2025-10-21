import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import {
    Checkbox,
    MenuItem, Menu,
    FormControlLabel
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

import { getGenres, getSources, getRegions, getStreamingReleases } from "../services/userService"
import { useResGenresState, useResSourceState, useResRegionState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { useResStreamingReleaseState } from "../state/useStreamingReleasesState";

const Universal: React.FC = () => {
    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            maxWidth: 'calc(100%)',
            background: 'var(--color-gray-900)',
            zIndex: 100,
        },
    }

    const MenuListProps: SxProps<Theme> = {
        sx: {
            paddingY: 0.5,
        },
    }

    const sxMenuItem: SxProps<Theme> = {
        justifyContent: 'start',
        paddingY: '10px',
        paddingLeft: '20px',
        color: 'rgb(255,255,255,0.7)',
        zIndex: 100,
        '&:hover': {
            backgroundColor: 'var(--color-gray-800) !important',
            color: 'var(--color-cyan-300) !important',
            fontWeight: 600
        },
    }

    const sxControlLabel: SxProps<Theme> = {
        margin: 0,
        "& .MuiFormControlLabel-label": {
            fontSize: 'var(--text-lg) !important',
        },
        ":hover": {
            color: 'var(--color-cyan-300)'
        }
    }

    const { icons, imgs } = useGlobal()
    const { resGenres, setResGenres } = useResGenresState()
    const { resSources, setResSources } = useResSourceState()
    const { resRegions, setResRegions } = useResRegionState()
    const { resStreamingRelease, setResStreamingRelease } = useResStreamingReleaseState()
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

    const getApiSources = async () => {
        try {
            const res = await getSources()
            setResSources(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getApiSources", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getApiSources")
        }
    }

    const getApiRegion = async () => {
        try {
            const res = await getRegions()
            setResRegions(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getRegions", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getRegions")
        }
    }

    const getApiResStreamingRelease = async () => {
        try {
            const res = await getStreamingReleases()
            setResStreamingRelease(res.data.releases)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getStreamingReleases", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getStreamingReleases")
        }
    }

    useEffect(() => {
        getApiGenres()
        getApiSources()
        getApiRegion()
        getApiResStreamingRelease()
        setSelectNav(1)
    }, [])

    const [showGenres, setShowGenres] = useState<boolean>(true)
    const [showStreaming, setShowStreaming] = useState<boolean>(true)
    const [showRegions, setShowRegions] = useState<boolean>(true)

    const [checkedItemsGenres, setCheckedItemsGenres] = useState<number[]>([])

    useEffect(() => {
        if (resGenres.length > 0) {
            setCheckedItemsGenres(resGenres.map((res) => res.id))
        }
    }, [resGenres])

    const allCheckedGenres = checkedItemsGenres.length === resGenres.length
    const isIndeterminateGenres =
        checkedItemsGenres.length > 0 && checkedItemsGenres.length < resGenres.length

    // Khi click vào "All"
    const handleCheckAllGenres = () => {
        if (allCheckedGenres) {
            setCheckedItemsGenres([])
        } else {
            setCheckedItemsGenres(resGenres.map((res) => res.id))
        }
    }

    // Khi click vào từng item
    const handleCheckItemGenres = (id: number) => {
        if (checkedItemsGenres.includes(id)) {
            setCheckedItemsGenres(checkedItemsGenres.filter((itemId) => itemId !== id))
        } else {
            setCheckedItemsGenres([...checkedItemsGenres, id])
        }
    }

    const handleClearFilter = () => {
        if (resGenres.length > 0) {
            setCheckedItemsGenres(resGenres.map((res) => res.id))
        }
    }

    const [anchorElSortBy, setAnchorElSortBy] = useState<null | HTMLElement>(null);
    const openSortBy = Boolean(anchorElSortBy);
    const handleClickSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSortBy(event.currentTarget);
    };
    const handleCloseSortBy = () => {
        setAnchorElSortBy(null);
    };

    const [sortBy, setSortBy] = useState<string>("Default")

    const handleSortDefault = () => {
        handleCloseSortBy()
        setSortBy("Default")
    }

    const handleSortHigh = () => {
        handleCloseSortBy()
        setSortBy("Highest")
    }

    // tang dan
    const handleSordLow = () => {
        handleCloseSortBy()
        setSortBy("Lowest")
    }

    // Mới nhất (ngày gần nhất trước)
    const handleSortNewest = () => {
        handleCloseSortBy();
        setSortBy("Newest");
    };

    const getYear = (date: string) => {
        const convertDate = new Date(date)
        return convertDate.getFullYear()
    }

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };

    return (
        <>
            <div className="max-w-[1535px] mx-auto grid lg:grid-cols-[1fr_4fr] gap-6">
                <aside className="grid h-fit sticky top-[105px] gap-6 ">
                    <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:border-cyan-300">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowRegions(!showRegions)
                                }}
                            >
                                <h3 className="text-xl ">Regions</h3>
                                <span>{showRegions ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showRegions && (
                                <div className="text-lg mt-5 text-white/70 gap-4 overflow-y-auto scroll-y max-h-[21vh] flex flex-col">
                                    {resRegions.map((res) => (
                                        <button className="flex items-center gap-4 group">
                                            <img src={res.flag} alt={res.name} className="h-[35px] w-[50px]" />
                                            <p className="text-lg group-hover:text-cyan-300">{res.name}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:border-cyan-300">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowStreaming(!showStreaming)
                                }}
                            >
                                <h3 className="text-xl ">Streaming Services</h3>
                                <span>{showStreaming ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showStreaming && (
                                <div className="text-lg mt-5 text-white/70 gap-4 overflow-y-auto scroll-y max-h-[21vh] flex flex-col">
                                    {resSources.map((res) => (
                                        <button className="flex items-center justify-between gap-4 group">
                                            <div className="flex items-center gap-4">
                                                <img src={res.logo_100px} alt={res.name} className="h-[35px]" />
                                                <p className="text-lg group-hover:text-cyan-300">{res.name}</p>
                                            </div>
                                            <span className="text-sm px-2 py-1 rounded-full bg-cyan-300/10 border-[1px] border-cyan-300/10 mr-2 group-hover:text-cyan-300">{res.type}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:border-cyan-300">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowGenres(!showGenres)
                                }}
                            >
                                <h3 className="text-xl ">Genres</h3>
                                <span>{showGenres ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showGenres && (
                                <div className="text-lg mt-5 text-white/70 overflow-y-auto scroll-y max-h-[21vh] flex flex-col">
                                    {/* Checkbox "All" */}
                                    <FormControlLabel control={
                                        <Checkbox
                                            indeterminate={isIndeterminateGenres}
                                            checked={allCheckedGenres}
                                            onChange={handleCheckAllGenres}
                                            icon={icons.iconUncheck}
                                            indeterminateIcon={icons.iconMinus}
                                            checkedIcon={icons.iconCheck}
                                            sx={{
                                                color: 'white',
                                                '&.Mui-checked': { color: 'var(--color-cyan-300)' },
                                                '&.MuiCheckbox-indeterminate': { color: 'var(--color-cyan-300)' },
                                            }}
                                        />
                                    }
                                        label="All"
                                        sx={sxControlLabel}
                                    />
                                    {resGenres.map((res) => (
                                        <FormControlLabel control={
                                            <Checkbox
                                                checked={checkedItemsGenres.includes(res.id)}
                                                onChange={() => handleCheckItemGenres(res.id)}
                                                icon={icons.iconUncheck}
                                                checkedIcon={icons.iconCheck}
                                                sx={{
                                                    color: 'white',
                                                    '&.Mui-checked': { color: 'var(--color-cyan-300)' },
                                                }}
                                            />
                                        }
                                            label={res.name}
                                            sx={sxControlLabel}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button className="text-white/70 border-[1px] border-gray-800 h-[40px] rounded-[10px] transition-all duration-300 ease hover:text-cyan-300 hover:border-cyan-300"
                        onClick={handleClearFilter}
                    >
                        Clear All Filters
                    </button>
                </aside >
                <section className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <p className="text-white text-xl">Results</p>
                        <div>
                            <button className={`${openSortBy ? "border-gray-700 shadow-xl" : ""} flex gap-4 justify-bettwen p-2 rounded-[10px] items-center bg-gray-900 border-[1px]  border-gray-800 h-[40px] shadow-lg hover:border-gray-700`}
                                onClick={handleClickSortBy}
                            >
                                <p className="text-white/70 text-sm">Sort by:</p>
                                <p className="md:w-[120px] text-start text-white">{sortBy}</p>
                                <span className="transtion-all duration-300 ease text-white">{openSortBy ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            <Menu
                                anchorEl={anchorElSortBy}
                                open={openSortBy}
                                onClose={handleCloseSortBy}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                            >
                                <MenuItem
                                    onClick={handleSortDefault}
                                    sx={sxMenuItem}
                                >Default</MenuItem>
                                <MenuItem
                                    onClick={handleSortHigh}
                                    sx={sxMenuItem}
                                >Highest</MenuItem>
                                <MenuItem
                                    onClick={handleSordLow}
                                    sx={sxMenuItem}
                                >Lowest</MenuItem>
                                <MenuItem
                                    onClick={handleSortNewest}
                                    sx={sxMenuItem}
                                >Newest</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    {resStreamingRelease.length === 0 ?
                        <p className="text-center text-cyan-300">! No data</p>
                        :
                        <div className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6`}>
                            {resStreamingRelease.map((res) => (
                                <button key={res.id} className="group flex flex-col gap-2 ">
                                    <div className="relative">
                                        <img src={res.poster_url} alt={res.source_name}
                                            onError={handleImgError}
                                            className="w-full h-[300px] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                        <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-300">{icons.iconPlayCircle}</span>
                                    </div>
                                    <h3 className="text-white/80 text-lg font-bold text-start">{res.title}</h3>
                                    <div className="flex gap-1 text-white/70 text-sm">{res.type} {getYear(res.source_release_date)}</div>
                                    <span className="flex gap-2 text-sm text-white text-start items-center">{icons.iconPlay}{res.source_name}</span>
                                </button>
                            ))}
                        </div>
                    }
                </section>
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Universal;