import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getSources, } from "../services/userService"
import { useResSourceState } from '../state/useConfigurationState'
import { useStateGeneral } from '../state/useStateGeneral'
import { Tabs, Tab, Box } from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Sources: React.FC = () => {
    const sxTabs: SxProps<Theme> = {
        borderBottom: 1,
        borderColor: 'divider',
        '& .MuiTab-root': {
            textTransform: 'none', // bỏ viết hoa
            fontWeight: 500,
            fontSize: 16,
            minHeight: 48,
            color: 'text.secondary',
            '&.Mui-selected': {
                color: 'var(--color-cyan-300)',
            },
        },
        '& .MuiTabs-indicator': {
            backgroundColor: 'var(--color-cyan-300)',
            height: 3,
            borderRadius: '3px 3px 0 0',
        },
    }

    const sxTab: SxProps<Theme> = {
        textTransform: 'none',   // bỏ viết hoa mặc định
        fontSize: 'var(--text-xl)',
        minHeight: 48,
        fontWeight: "bold",
        color: "#faefefff",
        "&.MuiButtonBase-root": {
            color: 'rgb(255,255,255,0.7) !important'
        },
        "&.Mui-selected": {
            color: "var(--color-cyan-300) !important", // màu khi được chọn
        },
        "&:hover": {
            color: "var(--color-cyan-300) !important",
        },
    }

    const navigate = useNavigate()
    const { icons, imgs } = useGlobal()
    const { resSources, setResSources, resSourcesFree, resSourcesPurchase, resSourcesSub, resSourcesTv2 } = useResSourceState()
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // tránh vòng lặp vô hạn
        e.currentTarget.src = imgs.imgDefault;//"https://placehold.co/600x400" // // ảnh mặc định (nên để trong public/images)
    };
    const { setSelectNav } = useStateGeneral()

    const getApiSources = async () => {
        try {
            const res = await getSources()
            setResSources(res.data)
        } catch (error: any) {
            console.error("Lỗi khi gọi API getApiSources", error)
            toast.error(error.response?.statusMessage || "Lỗi khi gọi API getApiSources")
        }
    }

    useEffect(() => {
        getApiSources()
        setSelectNav(0)
    }, [])

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleViewAll = () => {
        navigate(`/universal`)
    }

    return (
        <>
            <div className='w-full px-5 sticky z-[999] top-[80px] backdrop-blur-[10px]'>
                <div className='flex gap-2 max-w-[1500px] mx-auto items-center text-cyan-300 py-[10px] text-xl max-md:text-lg '>
                    <div
                        onClick={() => navigate("/")}
                        className='transition duration-300 ease css-icon'>{icons.iconHome}</div>
                    <span>{icons.iconNext}</span>
                    <div className='transition duration-300 ease css-icon'>Sources</div>
                </div>
            </div>
            <div className="max-w-[1535px] mx-auto flex flex-col mt-5">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        sx={sxTabs} value={value} onChange={handleChange} aria-label="basic tabs example">
                        {[
                            { label: 'All' },
                            { label: 'Sub' },
                            { label: 'Free' },
                            { label: 'Tve' },
                            { label: 'Purchase' },
                        ].map((tab, index) => (
                            <Tab key={tab.label} sx={sxTab} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                {[
                    { data: resSources },
                    { data: resSourcesSub },
                    { data: resSourcesFree },
                    { data: resSourcesTv2 },
                    { data: resSourcesPurchase },
                ].map((tabData, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                        <div className=" grid grid-cols-5 gap-8">
                            {tabData.data?.map((res) => (

                                <button key={res.id} className="group flex flex-col gap-2 text-white/70 relative"
                                    onClick={handleViewAll}
                                >
                                    <img src={res.logo_100px} alt={res.name} onError={handleImgError}
                                        /* grayscale group-hover:grayscale-0 */
                                        className="aspect-[1/1] rounded-[10px] transition-all duration-300 ease group-hover:scale-105" />

                                </button>
                            ))}
                        </div>
                    </CustomTabPanel>
                ))}
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default Sources