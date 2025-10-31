import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { debounce } from "@mui/material/utils";
import Nav from './Nav';

import {
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    Autocomplete, Box,
    Backdrop, CircularProgress,
    ListItem, List, Divider, Drawer, ListItemText
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

import { useResAutocomplateState } from '../state/useAutocomplateState';
import { getAutocomplete } from '../services/userService';
import { useStateGeneral } from '../state/useStateGeneral';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [clickSearch, setClickSearch] = useState<boolean>(false)
    const { imgs, icons, pages, isMobile } = useGlobal()

    const sxTextField: SxProps<Theme> = {
        width: '100%',
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

    const sxButton: SxProps<Theme> = {
        color: 'var(--color-cyan-300)',
        padding: '8px',
        marginX: '8px',
        transition: 'all 0.3s ease'
    }

    const sxFormControl = {
        minWidth: `${isMobile ? '50vw' : '400px'}`,
        margin: 0
    }

    const sxPrimaryTypographyProps = {
        fontSize: '1rem',
        fontWeight: 'medium',
        transition: 'all 0.3s ease',
    }

    const componentsProps: SxProps<Theme> = {
        paper: {
            sx: {
                background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
                backdropFilter: 'blur(10px)',
                zIndex: 100,
                minHeight: '70px',
                '& .MuiAutocomplete-noOptions': {
                    minHeight: '30px !important',
                    color: 'rgb(255,255,255,0.7) !important',
                },
                '& .MuiAutocomplete-option': {
                    minHeight: '30px !important',
                    color: 'rgb(255,255,255,0.7) !important',
                },
                '& .MuiAutocomplete-option:hover': {
                    background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--color-cyan-300) !important',
                    fontWeight: 600
                },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--color-cyan-300) !important',
                    fontWeight: 600
                }
            }
        }
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

    const [selectAutocomplateID, setSelectAutocomplateID] = useState<number>(0)

    const { setSelectNav } = useStateGeneral()


    const { resAutocomplate, setResAutocomplate } = useResAutocomplateState()
    const [loading, setLoading] = useState(false);

    const getApiAutocomplate = async (searchValue: string, searchType: number) => {
        setResAutocomplate([]);
        try {
            setLoading(true);
            const res = await getAutocomplete(searchValue, searchType)
            setResAutocomplate(res.data.results)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getAutocomplete", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getAutocomplete")
        } finally {
            setLoading(false);        // 👉 tắt trạng thái loading
        }
    }

    const lastQueryRef = useRef("");

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    // Debounce tránh spam API
    const debouncedFetch = useMemo(
        () =>
            debounce(async (value: string) => {
                const trimmed = value.trim();
                // Nếu từ khóa giống lần trước thì bỏ qua (chặn call liên tục)
                if (trimmed === lastQueryRef.current) return;

                lastQueryRef.current = trimmed;

                if (trimmed.length > 0) {
                    getApiAutocomplate(trimmed, 1)
                } else {
                    setResAutocomplate([]);
                }
            }, 400),
        []
    );

    // Khi người dùng gõ
    const handleInputChange = (_: any, value: string, reason: string) => {
        // MUI gọi event "reset" khi chọn option → bỏ qua tránh gọi lại API
        if (reason === "reset") return;

        // Nếu input rỗng, clear kết quả ngay lập tức
        if (value.trim().length === 0) {
            setResAutocomplate([]);
            lastQueryRef.current = "";
        } else {
            debouncedFetch(value);
        }
    };

    // Cleanup debounce khi component unmount
    useEffect(() => {
        return () => {
            debouncedFetch.clear();
        };
    }, [debouncedFetch]);

    // --- Khi chọn item ---
    const handleChangeSearch = (_: any, newValue: { id: number; name: string } | null) => {
        if (!newValue) return;
        setSelectAutocomplateID(newValue.id);
        // Clear kết quả tìm kiếm sau khi chọn
        setResAutocomplate([]);
        lastQueryRef.current = "";
        navigate(`/universal-detail/${newValue.id}`, { state: { idDetail: newValue.id } });
    };

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };

    useEffect(() => {
        if (isMobile) {
            setClickSearch(true);
        }
    }, [isMobile]);

    return (
        <>
            <header className='top-0 sticky z-100 px-5 py-4 bg-black/50 backdrop-blur-[10px] border-b-[1px] border-b-gray-700'>
                <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                    <div className='flex gap-6 items-center'>
                        <div className='flex gap-2 items-center'>
                            <img src={imgs.imgLogo} alt="logo" className='md:h-[47px]  h-[35px]' onError={handleImgError} />
                            <p className='text-cyan-300 text-4xl max-md:hidden'>S-Flow</p>
                        </div>
                        <div className='max-lg:hidden'>
                            <Nav />
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        {clickSearch ?
                            <FormControl className="w-full" sx={sxFormControl}>
                                <Autocomplete
                                    // disableClearable
                                    noOptionsText={loading ?
                                        <Backdrop
                                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                                            open={loading}
                                        >
                                            <CircularProgress color="inherit" />
                                        </Backdrop> : <p className='text-center h-full items-center'>There is no data</p>}
                                    options={resAutocomplate}
                                    componentsProps={componentsProps}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <Box
                                                key={key}
                                                component="li"
                                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                {...optionProps}
                                            >
                                                <img src={option.image_url} alt={option.name} className='w-[50px]' onError={handleImgError} />
                                                <div>
                                                    <h3 className='text-lg font-bold'>{option.name}</h3>
                                                    <p className='text-sm '>{option.year}</p>
                                                    <p>{option.type}</p>
                                                </div>
                                            </Box>
                                        );
                                    }}
                                    filterOptions={(x) => x}
                                    value={
                                        selectAutocomplateID >= 0
                                            ? resAutocomplate.find((c) => c.id === selectAutocomplateID) ?? undefined
                                            : undefined
                                    }
                                    onChange={handleChangeSearch}
                                    onInputChange={handleInputChange}
                                    renderInput={(params) => (
                                        <TextField  {...params}
                                            type="search"
                                            placeholder="Search of titles and/or people..."
                                            sx={sxTextField}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            sx={{ color: 'var(--color-cyan-300)' }}
                                                            onClick={() => {
                                                                { isMobile ? setClickSearch(true) : setClickSearch(false) }
                                                            }}>
                                                            {icons.iconSearch}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}

                                        />
                                    )}
                                />
                            </FormControl>
                            :
                            <>
                                {isMobile === false &&
                                    < IconButton
                                        sx={sxButton}
                                        onClick={() => {
                                            setClickSearch(true)
                                        }}>
                                        {icons.iconSearch}
                                    </IconButton>
                                }
                            </>
                        }
                        <button
                            onClick={toggleDrawer(true)}
                            className='lg:hidden text-cyan-300 p-2.5 border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-[10px]'>
                            {icons.iconMenu}
                        </button>
                        <Drawer
                            anchor="right"
                            open={openDrawer}
                            onClose={toggleDrawer(false)}
                            PaperProps={sxPaperPropsDrawer}
                        >

                            <Box sx={sxBox1Drawer}>
                                <Box sx={sxBox2Drawer}>
                                    <IconButton onClick={toggleDrawer(false)} sx={sxIconButton}>
                                        {icons.iconClose}
                                    </IconButton>
                                </Box>

                                <Divider sx={sxDivider} />
                                <List>
                                    {pages.map((page, index) => (
                                        <ListItem
                                            component="button"
                                            key={index}
                                            onClick={() => {
                                                setSelectNav(index)
                                                setOpenDrawer(false)
                                                navigate(page.path)
                                            }}
                                            sx={sxListItemDrawer}
                                        >
                                            <ListItemText
                                                primary={page.title}
                                                primaryTypographyProps={sxPrimaryTypographyProps}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </div>
                </div>
            </header >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Header