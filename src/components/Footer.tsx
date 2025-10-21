import React from 'react';

const Footer: React.FC = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='p-5 border-t-[1px] border-t-gray-800'>
            <div className="max-w-[1535px] mx-auto flex flex-col gap-4 text-white/80">
                <p className='text-center'>Data provided by <a className='text-cyan-300' href="https://api.watchmode.com/">Watch Mode Api</a></p>
                <p className='text-center'>&copy; {year} Streaming Services. All the rights are reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;