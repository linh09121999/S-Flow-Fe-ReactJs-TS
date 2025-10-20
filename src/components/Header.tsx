import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import Nav from './Nav';

const Header: React.FC = () => {
    const { imgs } = useGlobal()
    return (
        <header className='top-0 sticky z-100 px-5 py-4 bg-black/10 backdrop-blur-[10px] border-b-[1px] border-b-gray-700'>
            <div className='max-w-[1500px] mx-auto flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={imgs.imgLogo} alt="logo" className='h-[47px]' />
                    <p className='text-cyan-300 text-4xl'>StreamX</p>
                </div>
                <Nav />
                <div></div>
            </div>
        </header>
    )
}

export default Header