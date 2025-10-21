import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import Nav from './Nav';
import {
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

const Header: React.FC = () => {
    const [clickSearch, setClickSearch] = useState<boolean>(false)

    const sxTextField: SxProps<Theme> = {
        width: {
            md: '100%',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "var(--color-gray-900)",
            padding: '3px 8px',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: 'none',
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

    const { imgs, icons } = useGlobal()
    return (
        <header className='top-0 sticky z-100 px-5 py-4 bg-black/10 backdrop-blur-[10px] border-b-[1px] border-b-gray-700'>
            <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                <div className='flex gap-6 items-center'>
                    <div className='flex gap-2 items-center'>
                        <img src={imgs.imgLogo} alt="logo" className='h-[47px]' />
                        <p className='text-cyan-300 text-4xl'>S-Flow</p>
                    </div>
                    <Nav />
                </div>
                <div className='flex gap-2 items-center'>
                    {clickSearch ? <TextField
                        placeholder="Search for titles/and or people by name or a partial name"
                        slotProps={{
                            input: {
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
                            },
                        }}
                        sx={sxTextField}
                    /> :
                        <IconButton
                            sx={sxButton}
                            onClick={() => {
                                setClickSearch(true)
                            }}>
                            {icons.iconSearch}
                        </IconButton>}

                </div>

            </div>
        </header>
    )
}

export default Header