import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";//, useLocation
import {
    Checkbox,
    MenuItem, Menu,
    FormControlLabel, InputAdornment, IconButton,
    TextField,
    Backdrop, CircularProgress,
    Drawer, Box, Divider, List,
    ListItem
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

import { getSources, getStreamingReleases } from "../services/userService"//getGenres, getRegions,
// import type { ResSource, ResGenre, ResRegion } from '../state/useConfigurationState'
import { useResSourceState } from '../state/useConfigurationState' //useResGenresState, , useResRegionState 
import { useStateGeneral } from '../state/useStateGeneral'
import { useResStreamingReleaseState } from "../state/useStreamingReleasesState";

const Universal: React.FC = () => {
    const navigate = useNavigate()
    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            maxWidth: 'calc(100%)',
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
        },
    }

    const sxTextField: SxProps<Theme> = {
        width: {
            md: '100%',
        },
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
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
            backdropFilter: 'blur(10px)',
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

    const sxPaperPropsDrawer: SxProps<Theme> = {
        sx: {
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
            color: 'var(--color-gray-200)',
            backdropFilter: 'blur(10px)'
        }
    }

    const sxBox1Drawer: SxProps<Theme> = {
        width: 250,
    }

    const sxBox2Drawer: SxProps<Theme> = {
        display: 'flex',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '12px 16px',
        cursor: 'pointer'
    }

    const sxIconButton: SxProps<Theme> = {
        color: 'white',
        fontSize: '2rem'
    }

    const sxDivider: SxProps<Theme> = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }

    const sxListItemDrawer: SxProps<Theme> = {
        padding: '12px 24px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: "var(--color-cyan-300)"
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '40px'
        }
    }

    const { icons, imgs, contentType, styleColor } = useGlobal()
    // const { resGenres, setResGenres } = useResGenresState()
    const { resSources, setResSources } = useResSourceState()
    const { resStreamingRelease, setResStreamingRelease } = useResStreamingReleaseState()
    const { setSelectNav, checkedSources, setCheckedSources } = useStateGeneral()
    const [loading, setLoading] = useState<boolean>(true);

    // const getApiGenres = async () => {
    //     try {
    // setLoading(true);
    //         const res = await getGenres()
    //         setResGenres(res.data)
    //     } catch (error: any) {
    //         console.error("Lỗi khi gọi API getGenres", error)
    //         toast.error(error.response?.statusMessage || "Lỗi khi gọi API getGenres")
    //     }finally {
    //     setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    // }
    // }

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

    const getApiResStreamingRelease = async () => {
        try {
            setLoading(true);
            const res = await getStreamingReleases()
            setResStreamingRelease(res.data.releases)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getStreamingReleases", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getStreamingReleases")
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    // const location = useLocation();
    // const { selectSource } = location.state || {};

    useEffect(() => {
        // if (selectSource) {
        //     setCheckedSources(selectSource);
        //     console.log(selectSource)
        // } else {
        //     setCheckedSources([])
        // }
        // getApiGenres()

        // getApiSources()
        // getApiResStreamingRelease()
        setSelectNav(1)
        setCheckedItemsContentType(contentType.map((type) => type.id))
    }, [])

    // const [showGenres, setShowGenres] = useState<boolean>(true)
    const [showStreaming, setShowStreaming] = useState<boolean>(true)
    const [showContentType, setShowContentType] = useState<boolean>(true)
    // const [showServiceType, setShowServiceType] = useState<boolean>(true)

    // const [checkedItemsGenres, setCheckedItemsGenres] = useState<number[]>([])
    const [checkedItemsContentType, setCheckedItemsContentType] = useState<number[]>([])
    // const [checkedItemsServiceType, setCheckedItemsServiceType] = useState<number[]>([])


    const handleClearFilter = () => {
        // if (resGenres.length > 0) {
        //     setCheckedItemsGenres(resGenres.map((res) => res.id))
        // }
        setCheckedItemsContentType(contentType.map((type) => type.id))
        // setCheckedItemsServiceType(serviceType.map((type) => type.id))
        setCheckedSources([])
    }

    // const allCheckedGenres = checkedItemsGenres.length === resGenres.length
    // const isIndeterminateGenres =
    //     checkedItemsGenres.length > 0 && checkedItemsGenres.length < resGenres.length

    // // Khi click vào "All"
    // const handleCheckAllGenres = () => {
    //     allCheckedGenres ?
    //         setCheckedItemsGenres([])
    //         :
    //         setCheckedItemsGenres(resGenres.map((res) => res.id))
    // }

    // Khi click vào từng item
    // const handleCheckItemGenres = (id: number) => {
    //     if (checkedItemsGenres.includes(id)) {
    //         setCheckedItemsGenres(checkedItemsGenres.filter((itemId) => itemId !== id))
    //     } else {
    //         setCheckedItemsGenres([...checkedItemsGenres, id])
    //     }
    // }

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

    // const allCheckedServiceType = checkedItemsServiceType.length === serviceType.length
    // const isIndeterminateServiceType = checkedItemsServiceType.length > 0 && checkedItemsServiceType.length < serviceType.length
    // const handleCheckAllServiceType = () => {
    //     allCheckedServiceType ?
    //         setCheckedItemsServiceType([])
    //         :
    //         setCheckedItemsServiceType(serviceType.map((type) => type.id))
    // }
    // const handleCheckItemServiceType = (id: number) => {
    //     checkedItemsServiceType.includes(id) ?
    //         setCheckedItemsServiceType(checkedItemsServiceType.filter((itemId) => itemId !== id))
    //         :
    //         setCheckedItemsServiceType([...checkedItemsServiceType, id])
    // }


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

    const [isFiltering, setIsFiltering] = useState<boolean>(false)

    useEffect(() => {
        const isCheck =
            checkedItemsContentType.length < contentType.length ||
            checkedSources.length > 0 ||
            sortOption !== "relevance";
        setIsFiltering(isCheck)
    }, [checkedItemsContentType, checkedSources, sortOption])

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

    const [openDrawerSort, setOpenDrawerSort] = useState<boolean>(false);

    const toggleDrawerSort = (newOpen: boolean) => () => {
        setOpenDrawerSort(newOpen);
    };

    const [openDrawerFilter, setOpenDrawerFilter] = useState<boolean>(false);

    const toggleDrawerFilter = (newOpen: boolean) => () => {
        setOpenDrawerFilter(newOpen);
    };

    const getYear = (date: string) => {
        const convertDate = new Date(date)
        return convertDate.toLocaleDateString('en-US')
    }
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
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
            <div className="max-w-[1535px] py-5 mx-auto grid lg:grid-cols-[300px_1fr] gap-6">
                <aside className="grid h-fit max-lg:hidden lg:sticky lg:top-[105px] gap-4 ">
                    <div className="flex flex-col gap-4">
                        <div className="items-center border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowContentType(!showContentType)
                                }}
                            >
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Content Type</h3>
                                <span className="text-cyan-300">{showContentType ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showContentType && (
                                <div className="text-lg mt-5 text-white/70 gap-4 flex flex-col transition-all duration-300 ease">
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
                        <div className="items-center border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowServiceType(!showServiceType)
                                }}
                            >
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Service Types</h3>
                                <span className="text-cyan-300">{showServiceType ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showServiceType && (
                                <div className="text-lg mt-5 text-white/70 gap-4 overflow-y-auto scroll-y max-h-[21vh] flex flex-col transition-all duration-300 ease">
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
                        <div className="items-center border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowStreaming(!showStreaming)
                                }}
                            >
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Streaming Services</h3>
                                <span className="text-cyan-300">{showStreaming ? icons.iconUp : icons.iconDown}</span>
                            </button>
                            {showStreaming && (
                                <div className="mt-5 flex flex-col gap-4 transition-all duration-300 ease">
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
                                    <div className="text-lg text-white/70 gap-4 overflow-y-auto scroll-y max-h-[20vh] flex flex-col">
                                        {filteredSources.length > 0 ? (
                                            filteredSources.map((res) => (
                                                <button
                                                    key={res.id}
                                                    onClick={() => handleSelectSource(res.id)}
                                                    className={`flex items-center gap-2 px-2 py-2 rounded-lg group ${checkedSources.includes(res.id) ? "border border-cyan-300 text-cyan-300" : ""}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img src={res.logo_100px} alt={res.name} className="h-[35px] aspect-[1/1]" />
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
                        <div className="items-center border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30">
                            <button className="flex justify-between text-white items-center w-full transition-all duration-300 ease"
                                onClick={() => {
                                    setShowGenres(!showGenres)
                                }}
                            >
                                <h3 className="text-xl font-semibold text-cyan-300 bg-clip-text tracking-wide">Genres</h3>
                                <span className="text-cyan-300">{showGenres ? icons.iconUp : icons.iconDown}</span>
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

                    <button className="text-white/70 border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl p-2 shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30 hover:text-white"
                        onClick={handleClearFilter}
                    >
                        Clear All Filters
                    </button>
                </aside >
                <section className="flex flex-col gap-4 md:gap-6">
                    <div className="lg:hidden grid grid-cols-2 gap-2">
                        <button className={`
                    flex justify-between items-center w-full sm:w-auto 
                    px-3 py-2 md:px-4 md:py-2 h-[40px] 
                    border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30
                `}
                            onClick={toggleDrawerFilter(true)}>
                            <p className="text-white/70 text-lg w-full">Filter</p>
                            <span className="transtion-all duration-300 ease text-white ml-2">
                                {openDrawerFilter ? icons.iconUp : icons.iconDown}
                            </span>
                        </button>
                        <button className={`
                    flex justify-between items-center w-full sm:w-auto 
                    px-3 py-2 md:px-4 md:py-2 h-[40px] 
                    border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30
                `}
                            onClick={toggleDrawerSort(true)}>
                            <p className="text-white/70 text-lg w-full">Sort</p>
                            <span className="transtion-all duration-300 ease text-white ml-2">
                                {openDrawerSort ? icons.iconUp : icons.iconDown}
                            </span>
                        </button>
                    </div>

                    <Drawer
                        anchor="right"
                        open={openDrawerFilter}
                        onClose={toggleDrawerFilter(false)}
                        PaperProps={sxPaperPropsDrawer}
                    >
                        <Box sx={sxBox1Drawer}>
                            <Box sx={sxBox2Drawer}>
                                <h3 className="w-full text-2xl">Filter</h3>
                                <IconButton onClick={toggleDrawerFilter(false)} sx={sxIconButton}>
                                    {icons.iconClose}
                                </IconButton>
                            </Box>

                            <Divider sx={sxDivider} />

                            <List>
                                <div className="p-4 flex flex-col gap-4">
                                    <h3 className="text-xl ">Content Type</h3>
                                    <div className="flex flex-col">
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
                                </div>
                            </List>
                            <Divider sx={sxDivider} />
                            <List>
                                <div className="px-4 flex flex-col gap-4">
                                    <h3 className="text-xl ">Streaming Services</h3>
                                    <div className="flex flex-col gap-4">
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
                                        <div className="text-lg text-white/70 gap-4 overflow-y-auto scroll-y max-h-[35vh] flex flex-col">
                                            {filteredSources.length > 0 ? (
                                                filteredSources.map((res) => (
                                                    <button
                                                        key={res.id}
                                                        onClick={() => handleSelectSource(res.id)}
                                                        className={`flex items-center gap-2 px-2 py-2 rounded-lg group ${checkedSources.includes(res.id) ? "border border-cyan-300 text-cyan-300" : ""}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <img src={res.logo_100px} alt={res.name} className="h-[35px] aspect-[1/1]" />
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
                                </div>
                            </List>
                            <Divider sx={sxDivider} />
                            <List>
                                <div className="w-full grid grid-cols-2">
                                    <button className="text-gray-950 font-bold bg-cyan-300 h-[40px] rounded-[10px] transition-all duration-300 ease hover:shadow-lg hover:shadow-cyan-300/50 m-1"
                                        onClick={toggleDrawerFilter(false)}>
                                        Filter
                                    </button>
                                    <button className="text-white/70 border-[1px] border-gray-500 h-[40px] rounded-[10px] transition-all duration-300 ease hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-300/50 m-1"
                                        onClick={() => {
                                            handleClearFilter()
                                            setOpenDrawerFilter(false)
                                        }}
                                    >
                                        Clear All
                                    </button>
                                </div>

                            </List>
                        </Box>
                    </Drawer>
                    <Drawer
                        anchor="right"
                        open={openDrawerSort}
                        onClose={toggleDrawerSort(false)}
                        PaperProps={sxPaperPropsDrawer}
                    >
                        <Box sx={sxBox1Drawer}>
                            <Box sx={sxBox2Drawer}>
                                <h3 className="w-full text-2xl">Sort</h3>
                                <IconButton onClick={toggleDrawerSort(false)} sx={sxIconButton}>
                                    {icons.iconClose}
                                </IconButton>
                            </Box>
                            <Divider sx={sxDivider} />
                            <List>
                                <ListItem onClick={() => {
                                    handleSortDefault()
                                    setOpenDrawerSort(false)
                                }}
                                    sx={sxListItemDrawer}>
                                    Relevance
                                </ListItem>
                                <ListItem onClick={() => {
                                    handleSortNewest()
                                    setOpenDrawerSort(false)
                                }}
                                    sx={sxListItemDrawer}>
                                    Release Date (Newest)
                                </ListItem>
                                <ListItem onClick={() => {
                                    handleSortOldest()
                                    setOpenDrawerSort(false)
                                }}
                                    sx={sxListItemDrawer}>
                                    Release Date (Oldest)
                                </ListItem>
                                <ListItem onClick={() => {
                                    handleSortAtoZ()
                                    setOpenDrawerSort(false)
                                }}
                                    sx={sxListItemDrawer}>
                                    Title (A-Z)
                                </ListItem>
                                <ListItem onClick={() => {
                                    handleSortZtoA()
                                    setOpenDrawerSort(false)
                                }}
                                    sx={sxListItemDrawer}>
                                    Title (Z-A)
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    {/* Header with Results Count and Sort Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
                        <p className="text-white text-lg md:text-xl font-medium">
                            {(isFiltering ? filteredReleases : resStreamingRelease).length} Results
                        </p>

                        {/* Sort Button */}
                        <div className="w-full sm:w-auto max-lg:hidden">
                            <button
                                className={`
                    ${openSortBy ? "shadow-xl border-cyan-300" : ""} 
                    flex justify-between items-center w-full sm:w-auto 
                    px-3 py-2 md:px-4 md:py-2  md:rounded-[10px] 
                     transition-all duration-300 ease 
                    h-[40px] border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-cyan-400/30
                `}
                                onClick={handleClickSortBy}
                            >
                                <div className="flex items-center gap-2 md:gap-4">
                                    <p className="text-white/70 text-sm">Sort by:</p>
                                    <p className="text-white text-lg w-[80px] md:w-[120px] text-start truncate">
                                        {sortBy}
                                    </p>
                                </div>
                                <span className="transtion-all duration-300 ease text-white ml-2">
                                    {openSortBy ? icons.iconUp : icons.iconDown}
                                </span>
                            </button>

                            {/* Sort Menu */}
                            <Menu
                                anchorEl={anchorElSortBy}
                                open={openSortBy}
                                onClose={handleCloseSortBy}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                            >
                                <MenuItem onClick={handleSortDefault} sx={sxMenuItem}>
                                    Relevance
                                </MenuItem>
                                <MenuItem onClick={handleSortNewest} sx={sxMenuItem}>
                                    Release Date (Newest)
                                </MenuItem>
                                <MenuItem onClick={handleSortOldest} sx={sxMenuItem}>
                                    Release Date (Oldest)
                                </MenuItem>
                                <MenuItem onClick={handleSortAtoZ} sx={sxMenuItem}>
                                    Title (A-Z)
                                </MenuItem>
                                <MenuItem onClick={handleSortZtoA} sx={sxMenuItem}>
                                    Title (Z-A)
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>

                    {/* Results Grid */}
                    {(isFiltering ? filteredReleases : resStreamingRelease).length === 0 ? (
                        <p className="text-center text-cyan-300 py-8 text-lg md:text-xl">
                            ! No data found
                        </p>
                    ) : (
                        <div className={`
            grid 
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-3
            lg:grid-cols-2 
            xl:grid-cols-4 
            gap-4 md:gap-6
        `}>
                            {(isFiltering ? filteredReleases : resStreamingRelease).map((res) => (
                                <button
                                    key={res.id}
                                    onClick={() =>
                                        navigate(`/universal-detail/${res.id}`, {
                                            state: { idDetail: res.id },
                                        })
                                    }
                                    className="relative group w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-lg border border-gray-700/50 hover:border-cyan-400/40 transition-all duration-300 ease-in-out"
                                >
                                    {/* Poster background */}
                                    <img
                                        src={res.poster_url}
                                        alt={res.source_name}
                                        onError={handleImgError}
                                        className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-60"
                                    />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Badge Original */}
                                    {res.is_original === 1 && (
                                        <span className="absolute top-3 right-3 px-3 py-1 bg-cyan-400 text-gray-900 font-bold text-sm rounded-md shadow-md backdrop-blur-sm">
                                            Original
                                        </span>
                                    )}

                                    {/* Play Icon Center */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                                        <span className="text-cyan-300 text-7xl drop-shadow-[0_0_10px_#22d3ee] animate-pulse">
                                            {icons.iconPlayCircle}
                                        </span>
                                    </div>

                                    {/* Info Section (bottom) */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-2 z-10">
                                        <h3 className="text-white text-start font-bold text-lg leading-tight line-clamp-2 hover:text-cyan-300 transition-colors duration-300">
                                            {res.title}
                                        </h3>
                                        <div className="flex gap-1 items-center text-sm text-gray-300">
                                            <span className="opacity-80 text-white/80 text-start"><strong>{res.season_number ?? 0}</strong> sources</span>
                                            <div className="w-[2px] h-[12px] bg-gray-500"></div>
                                            <span className="opacity-80 text-white/80 text-start">{getYear(res.source_release_date)}</span>
                                        </div>
                                        <button
                                            className="flex w-fit items-center gap-2 px-3 py-1.5 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                                            style={styleColor(res.source_id)}
                                        >
                                            <span className=" text-base">{icons.iconPlay}</span>
                                            <span className="truncate  " title={res.source_name}>
                                                {res.source_name}
                                            </span>
                                        </button>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Universal;