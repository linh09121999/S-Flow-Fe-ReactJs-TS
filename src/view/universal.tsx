import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Checkbox,
    MenuItem, Menu,
    FormControlLabel, InputAdornment, IconButton,
    TextField
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

import { getGenres, getSources, getRegions, getStreamingReleases } from "../services/userService"
import type { ResSource, ResGenre, ResRegion } from '../state/useConfigurationState'
import { useResGenresState, useResSourceState, useResRegionState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { useResStreamingReleaseState } from "../state/useStreamingReleasesState";

const Universal: React.FC = () => {
    const navigate = useNavigate()
    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            maxWidth: 'calc(100%)',
            background: 'var(--color-gray-900)',
            zIndex: 100,
        },
    }

    const sxTextField: SxProps<Theme> = {
        width: {
            md: '100%',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "var(--color-gray-900)",
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
            fontSize: 'var(--text-sm) !important',
        },
        ":hover": {
            color: 'var(--color-cyan-300)'
        }
    }

    const sxCheckBoxMinate: SxProps<Theme> = {
        color: 'white',
        '&.Mui-checked': { color: 'var(--color-cyan-300)' },
        '&.MuiCheckbox-indeterminate': { color: 'var(--color-cyan-300)' },
    }

    const sxCheckBox: SxProps<Theme> = {
        color: 'white',
        '&.Mui-checked': { color: 'var(--color-cyan-300)' },
    }

    const { icons, imgs, contentType, serviceType, styleColor } = useGlobal()
    const { resGenres, setResGenres } = useResGenresState()
    const { resSources, setResSources } = useResSourceState()
    const { resStreamingRelease, setResStreamingRelease } = useResStreamingReleaseState()
    const { setSelectNav, checkedSources, setCheckedSources } = useStateGeneral()

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

    const getApiResStreamingRelease = async () => {
        try {
            const res = await getStreamingReleases()
            setResStreamingRelease(res.data.releases)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getStreamingReleases", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getStreamingReleases")
        }
    }

    const location = useLocation();
    const { selectSource } = location.state || {};

    useEffect(() => {
        if (selectSource) {
            setCheckedSources(selectSource);
        }
    }, [selectSource, setCheckedSources]);

    useEffect(() => {
        // getApiGenres()
        getApiSources()
        getApiResStreamingRelease()
        setSelectNav(1)
        setCheckedItemsContentType(contentType.map((type) => type.id))
    }, [])

    const [showGenres, setShowGenres] = useState<boolean>(true)
    const [showStreaming, setShowStreaming] = useState<boolean>(true)
    const [showContentType, setShowContentType] = useState<boolean>(true)
    const [showServiceType, setShowServiceType] = useState<boolean>(true)

    const [checkedItemsGenres, setCheckedItemsGenres] = useState<number[]>([])
    const [checkedItemsContentType, setCheckedItemsContentType] = useState<number[]>([])
    const [checkedItemsServiceType, setCheckedItemsServiceType] = useState<number[]>([])


    const handleClearFilter = () => {
        // if (resGenres.length > 0) {
        //     setCheckedItemsGenres(resGenres.map((res) => res.id))
        // }
        setCheckedItemsContentType(contentType.map((type) => type.id))
        // setCheckedItemsServiceType(serviceType.map((type) => type.id))
        setCheckedSources([])
    }

    const allCheckedGenres = checkedItemsGenres.length === resGenres.length
    const isIndeterminateGenres =
        checkedItemsGenres.length > 0 && checkedItemsGenres.length < resGenres.length

    // Khi click vào "All"
    const handleCheckAllGenres = () => {
        allCheckedGenres ?
            setCheckedItemsGenres([])
            :
            setCheckedItemsGenres(resGenres.map((res) => res.id))
    }

    // Khi click vào từng item
    const handleCheckItemGenres = (id: number) => {
        if (checkedItemsGenres.includes(id)) {
            setCheckedItemsGenres(checkedItemsGenres.filter((itemId) => itemId !== id))
        } else {
            setCheckedItemsGenres([...checkedItemsGenres, id])
        }
    }

    const allCheckedContentType = checkedItemsContentType.length === contentType.length
    const isIndeterminateContentType = checkedItemsContentType.length > 0 && checkedItemsContentType.length < contentType.length

    // Khi click vào "All"
    const handleCheckAllContentType = () => {
        allCheckedContentType ?
            setCheckedItemsContentType([])
            :
            setCheckedItemsContentType(contentType.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemContentType = (id: number) => {
        checkedItemsContentType.includes(id) ?
            setCheckedItemsContentType(checkedItemsContentType.filter((itemId) => itemId !== id))
            :
            (
                setCheckedItemsContentType([...checkedItemsContentType, id])

            )
    }

    const allCheckedServiceType = checkedItemsServiceType.length === serviceType.length
    const isIndeterminateServiceType = checkedItemsServiceType.length > 0 && checkedItemsServiceType.length < serviceType.length
    const handleCheckAllServiceType = () => {
        allCheckedServiceType ?
            setCheckedItemsServiceType([])
            :
            setCheckedItemsServiceType(serviceType.map((type) => type.id))
    }
    const handleCheckItemServiceType = (id: number) => {
        checkedItemsServiceType.includes(id) ?
            setCheckedItemsServiceType(checkedItemsServiceType.filter((itemId) => itemId !== id))
            :
            setCheckedItemsServiceType([...checkedItemsServiceType, id])
    }


    const [inputValueSources, setInputValueSources] = useState<string>("");

    const filteredSources = useMemo(() => {
        if (!inputValueSources.trim()) return resSources;
        return resSources.filter((r) =>
            r.name.toLowerCase().includes(inputValueSources.toLowerCase())
        );
    }, [inputValueSources, resSources]);

    const handleSelectSource = (id: number) => {
        setCheckedSources((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const [sortOption, setSortOption] = useState("relevance");

    const filteredReleases = useMemo(() => {
        let filtered = resStreamingRelease.filter((release) => {
            const matchContentType =
                checkedItemsContentType.length === 0 ||
                contentType
                    .filter((t) => checkedItemsContentType.includes(t.id))
                    .some((t) => t.type === release.type);

            const matchSource =
                checkedSources.length === 0 || checkedSources.includes(release.source_id);

            return matchContentType && matchSource;
        });

        // Sort
        const sorted = [...filtered].sort((a, b) => {
            switch (sortOption) {
                case "newest":
                    return (
                        new Date(b.source_release_date).getTime() -
                        new Date(a.source_release_date).getTime()
                    );
                case "oldest":
                    return (
                        new Date(a.source_release_date).getTime() -
                        new Date(b.source_release_date).getTime()
                    );
                case "title-az":
                    return a.title.localeCompare(b.title);
                case "title-za":
                    return b.title.localeCompare(a.title);
                default:
                    return 0; // relevance
            }
        });

        return sorted;
    }, [checkedItemsContentType, checkedSources, sortOption]);

    const [anchorElSortBy, setAnchorElSortBy] = useState<null | HTMLElement>(null);
    const openSortBy = Boolean(anchorElSortBy);
    const handleClickSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSortBy(event.currentTarget);
    };
    const handleCloseSortBy = () => {
        setAnchorElSortBy(null);
    };

    const [sortBy, setSortBy] = useState<string>("Relevance")

    const handleSortDefault = () => {
        handleCloseSortBy()
        setSortBy("Relevance")
        setSortOption("relevance");
    }

    const handleSortNewest = () => {
        handleCloseSortBy()
        setSortBy("Newest")
        setSortOption("newest");
    }

    // tang dan
    const handleSortOldest = () => {
        handleCloseSortBy()
        setSortBy("Oldest")
        setSortOption("oldest");
    }

    // Mới nhất (ngày gần nhất trước)
    const handleSortAtoZ = () => {
        handleCloseSortBy();
        setSortBy("A-Z");
        setSortOption("title-az");
    };

    const handleSortZtoA = () => {
        handleCloseSortBy();
        setSortBy("Z-A");
        setSortOption("title-za");
    };

    const getYear = (date: string) => {
        const convertDate = new Date(date)
        return convertDate.toLocaleDateString('en-US')
    }
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };

    return (
        <>
            <div className="max-w-[1535px] py-5 mx-auto grid lg:grid-cols-[1fr_4fr] gap-6">
                <aside className="grid h-fit sticky top-[105px] gap-4 overflow-y-auto scroll-y-all max-h-[88vh]">
                    <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50 m-1">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowContentType(!showContentType)
                                }}
                            >
                                <h3 className="text-xl ">Content Type</h3>
                                <span>{showContentType ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showContentType && (
                                <div className="text-lg mt-5 text-white/70 gap-4 overflow-y-auto scroll-y max-h-[21vh] flex flex-col">
                                    <FormControlLabel control={
                                        <Checkbox
                                            indeterminate={isIndeterminateContentType}
                                            checked={allCheckedContentType}
                                            onChange={handleCheckAllContentType}
                                            icon={icons.iconUncheck}
                                            indeterminateIcon={icons.iconMinus}
                                            checkedIcon={icons.iconCheck}
                                            sx={sxCheckBoxMinate}
                                        />
                                    }
                                        label="All"
                                        sx={sxControlLabel}
                                    />
                                    {contentType.map((type) => (
                                        <FormControlLabel key={type.id} control={
                                            <Checkbox
                                                checked={checkedItemsContentType.includes(type.id)}
                                                onChange={() => handleCheckItemContentType(type.id)}
                                                icon={icons.iconUncheck}
                                                checkedIcon={icons.iconCheck}
                                                sx={sxCheckBox}
                                            />
                                        }
                                            label={type.title}
                                            sx={sxControlLabel}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50 m-1">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowServiceType(!showServiceType)
                                }}
                            >
                                <h3 className="text-xl ">Service Types</h3>
                                <span>{showServiceType ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showServiceType && (
                                <div className="text-lg mt-5 text-white/70 gap-4 overflow-y-auto scroll-y max-h-[21vh] flex flex-col">
                                    <FormControlLabel control={
                                        <Checkbox
                                            indeterminate={isIndeterminateServiceType}
                                            checked={allCheckedServiceType}
                                            onChange={handleCheckAllServiceType}
                                            icon={icons.iconUncheck}
                                            indeterminateIcon={icons.iconMinus}
                                            checkedIcon={icons.iconCheck}
                                            sx={sxCheckBoxMinate}
                                        />
                                    }
                                        label="All Services"
                                        sx={sxControlLabel}
                                    />
                                    {serviceType.map((type) => (
                                        <FormControlLabel key={type.id} control={
                                            <Checkbox
                                                checked={checkedItemsServiceType.includes(type.id)}
                                                onChange={() => handleCheckItemServiceType(type.id)}
                                                icon={icons.iconUncheck}
                                                checkedIcon={icons.iconCheck}
                                                sx={sxCheckBox}
                                            />
                                        }
                                            label={type.title}
                                            sx={sxControlLabel}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div> */}
                    <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50 m-1">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowStreaming(!showStreaming)
                                }}
                            >
                                <h3 className="text-xl ">Streaming Services</h3>
                                <span>{showStreaming ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showStreaming && (
                                <div className="mt-5 flex flex-col gap-4">
                                    <TextField
                                        type="search"
                                        placeholder="Search of sources..."
                                        sx={sxTextField}
                                        onChange={(e) => setInputValueSources(e.target.value)}
                                        value={inputValueSources}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{ color: 'var(--color-cyan-300)' }}
                                                    >
                                                        {icons.iconSearch}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div className="text-lg text-white/70 gap-4 overflow-y-auto scroll-y max-h-[21vh] flex flex-col">
                                        {filteredSources.length > 0 ? (
                                            filteredSources.map((res) => (
                                                <button
                                                    key={res.id}
                                                    onClick={() => handleSelectSource(res.id)}
                                                    className={`flex items-center gap-2 px-2 py-2 rounded-lg group ${checkedSources.includes(res.id) ? "border border-cyan-300 text-cyan-300" : ""}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img src={res.logo_100px} alt={res.name} className="h-[35px]" />
                                                        <p className="text-sm group-hover:text-cyan-300 text-start">{res.name}</p>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">
                                                No source found.
                                            </p>)}
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-4">
                        <div className="items-center border-[1px] border-gray-800 p-5 rounded-[10px] bg-gray-900 shadow-lg transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50 m-1">
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
                                    <FormControlLabel control={
                                        <Checkbox
                                            indeterminate={isIndeterminateGenres}
                                            checked={allCheckedGenres}
                                            onChange={handleCheckAllGenres}
                                            icon={icons.iconUncheck}
                                            indeterminateIcon={icons.iconMinus}
                                            checkedIcon={icons.iconCheck}
                                            sx={sxCheckBoxMinate}
                                        />
                                    }
                                        label="All"
                                        sx={sxControlLabel}
                                    />
                                    {resGenres.map((res) => (
                                        <FormControlLabel key={res.id} control={
                                            <Checkbox
                                                checked={checkedItemsGenres.includes(res.id)}
                                                onChange={() => handleCheckItemGenres(res.id)}
                                                icon={icons.iconUncheck}
                                                checkedIcon={icons.iconCheck}
                                                sx={sxCheckBox}
                                            />
                                        }
                                            label={res.name}
                                            sx={sxControlLabel}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div> */}

                    <button className="text-white/70 border-[1px] border-gray-800 h-[40px] rounded-[10px] transition-all duration-300 ease hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-300/50 m-1"
                        onClick={handleClearFilter}
                    >
                        Clear All Filters
                    </button>
                </aside >
                <section className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <p className="text-white text-xl">{filteredReleases.length} Results</p>
                        <div>
                            <button className={`${openSortBy ? "shadow-xl border-cyan-300" : ""} flex gap-4 justify-bettwen p-2 rounded-[10px] items-center bg-gray-900 border-[1px] transition-all duration-300 ease border-gray-800 h-[40px] shadow-lg hover:shadow-lg hover:shadow-cyan-300/50`}
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
                                >Relevance</MenuItem>
                                <MenuItem
                                    onClick={handleSortNewest}
                                    sx={sxMenuItem}
                                >Release Date (Newest)</MenuItem>
                                <MenuItem
                                    onClick={handleSortOldest}
                                    sx={sxMenuItem}
                                >Release Date (Oldest)</MenuItem>
                                <MenuItem
                                    onClick={handleSortAtoZ}
                                    sx={sxMenuItem}
                                >Title (A-Z)</MenuItem>
                                <MenuItem
                                    onClick={handleSortZtoA}
                                    sx={sxMenuItem}
                                >Title (Z-A)</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    {filteredReleases.length === 0 ?
                        <p className="text-center text-cyan-300">! No data</p>
                        :
                        <div className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6`}>
                            {filteredReleases.map((res) => (
                                <div key={res.id} className="group grid gap-2 ">
                                    <button className="flex flex-col gap-2"
                                        onClick={() => {
                                            navigate(`/universal-detail/${res.id}`, { state: { idDetail: res.id } })
                                        }}
                                    >
                                        <div className="relative">
                                            <img src={res.poster_url} alt={res.source_name}
                                                onError={handleImgError}
                                                className="w-full aspect-[3/4] rounded-[10px] transition-all duration-300 ease group-hover:scale-105 group-hover:opacity-70" />
                                            <span className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease text-cyan-300 opacity-0 group-hover:opacity-100">{icons.iconPlayCircle}</span>
                                            {res.is_original === 1 && (
                                                <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-300 backdrop-blur-[10px] text-cyan-950 font-bold transition-all duration-300 ease rounded-[5px_10px_5px_5px] group-hover:opacity-70">Original</span>
                                            )}
                                        </div>
                                        <h3 className="text-white/80 text-lg font-bold text-start transition-all duration-300 ease group-hover:opacity-70">{res.title}</h3>
                                        <div className="flex gap-1 text-white/70 text-sm transition-all duration-300 ease group-hover:opacity-70">{res.type}<span>•</span> {getYear(res.source_release_date)}</div>
                                    </button>
                                    <button className={`flex gap-2 self-end text-sm text-white text-start items-center px-2 h-[30px] w-fit rounded-[10px] transition-all duration-300 ease`} style={styleColor(res.source_id)}>
                                        {icons.iconPlay}{res.source_name}
                                    </button>
                                </div>
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