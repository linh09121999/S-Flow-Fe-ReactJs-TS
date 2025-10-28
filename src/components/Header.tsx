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
    Autocomplete, Box
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

import { useResAutocomplateState } from '../state/useAutocomplateState';
import { getAutocomplete } from '../services/userService';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [clickSearch, setClickSearch] = useState<boolean>(false)

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

    const sxButton: SxProps<Theme> = {
        color: 'var(--color-cyan-300)',
        padding: '8px',
        marginX: '8px',
        transition: 'all 0.3s ease'
    }

    const sxFormControl = {
        minWidth: 500,
        margin: 0
    }

    const componentsProps: SxProps<Theme> = {
        paper: {
            sx: {
                background: 'var(--color-gray-900)',
                zIndex: 100,

                '& .MuiAutocomplete-noOptions': {
                    minHeight: '30px !important',
                    color: 'rgb(255,255,255,0.7) !important',
                },
                '& .MuiAutocomplete-option': {
                    minHeight: '30px !important',
                    color: 'rgb(255,255,255,0.7) !important',
                },
                '& .MuiAutocomplete-option:hover': {
                    backgroundColor: 'var(--color-gray-800) !important',
                    color: 'var(--color-cyan-300) !important',
                    fontWeight: 600
                },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    backgroundColor: 'var(--color-gray-800) !important',
                    color: 'var(--color-cyan-300) !important',
                    fontWeight: 600
                }
            }
        }
    }

    const [selectAutocomplateID, setSelectAutocomplateID] = useState<number>(0)

    const { imgs, icons } = useGlobal()

    const { resAutocomplate, setResAutocomplate } = useResAutocomplateState()
    const [loading, setLoading] = useState(false);

    const getApiAutocomplate = async (searchValue: string, searchType: number) => {
        setLoading(true);
        setResAutocomplate([]);
        try {
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

    return (
        <>
            <header className='top-0 sticky z-100 px-5 py-4 bg-black/10 backdrop-blur-[10px] border-b-[1px] border-b-gray-700'>
                <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                    <div className='flex gap-6 items-center'>
                        <div className='flex gap-2 items-center'>
                            <img src={imgs.imgLogo} alt="logo" className='h-[47px]' onError={handleImgError} />
                            <p className='text-cyan-300 text-4xl'>S-Flow</p>
                        </div>
                        <Nav />
                    </div>
                    <div className='flex gap-2 items-center'>
                        {clickSearch ?
                            <FormControl className="w-full" sx={sxFormControl}>
                                <Autocomplete
                                    // disableClearable
                                    noOptionsText={loading ? "loading..." : "There is no data"}
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
                                                                setClickSearch(false)
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
                            <IconButton
                                sx={sxButton}
                                onClick={() => {
                                    setClickSearch(true)
                                }}>
                                {icons.iconSearch}
                            </IconButton>
                        }
                    </div>
                </div>
            </header>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Header