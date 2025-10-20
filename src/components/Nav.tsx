import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Nav: React.FC = () => {
    const navigate = useNavigate()
    const { pages } = useGlobal()
    const [selectNav, setSelectNav] = useState<number>(0)

    return (
        <ul className='flex list-none'>
            {pages.map((page) => (
                <li key={page.id} className='mx-[20px]'>
                    <button onClick={() => {
                        setSelectNav(page.id)
                        navigate(page.path)
                    }}
                        className={`${selectNav === page.id ? "text-cyan-300 after:scale-x-100" : "text-white/80 hover:text-cyan-300"} transiton-all duration-300 text-xl relative cursor-pointer no-underline after:absolute after:transistion-all after:duration-300 after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-cyan-300 after:w-full after:visible after:scale-x-0 hover:after:scale-x-100`}
                    >
                        {page.title}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Nav