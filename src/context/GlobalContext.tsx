import React, { createContext, useContext } from "react";
import type { JSX, ReactNode } from "react";
import { useMediaQuery } from "@mui/material"
import {
    FaHome,
    FaUser,
    FaMapMarkerAlt,
    FaAngleDoubleUp,
    FaChevronDown,
    FaChevronUp,
    FaEye, FaEyeSlash,
    FaDollarSign,
    FaLock,
    FaCamera,
    FaUserEdit,
    FaEdit,
    FaTag,
    FaFileExcel,
    FaUserTie,
    FaCalendarAlt,
    FaCheckCircle,
    FaRegCircle,
    FaMinusCircle,
    FaPlay,
    FaPlayCircle
} from "react-icons/fa";
import { FaCalendarDays, FaCartShopping, FaArrowDownLong, FaArrowUpLong, FaSackDollar, FaStar } from "react-icons/fa6";
import { CgMenu } from "react-icons/cg";
import { BsTrash3Fill } from "react-icons/bs";
import { BiSolidPackage } from "react-icons/bi";
import {
    IoClose, IoLogOut
} from "react-icons/io5";
import {
    MdNavigateNext,
    MdNavigateBefore,
    MdHorizontalRule,
    MdError,
    MdDashboard,
    MdPersonAddAlt1
} from "react-icons/md";
import { IoMdSearch, IoMdMail, IoMdAdd } from "react-icons/io";
import { RiAddFill, RiUserSettingsFill } from "react-icons/ri";

import logo from "../assets/logo.png"
import imgDefault from "../assets/img/no_img.png"

interface Imgs {
    imgLogo: string;
    imgDefault: string;
}

const defaultImgs: Imgs = {
    imgLogo: logo,
    imgDefault: imgDefault,
}

interface Icons {
    iconMenu: JSX.Element;
    iconClose: JSX.Element;
    iconBackToTop: JSX.Element;
    iconMap: JSX.Element;
    iconNext: JSX.Element;
    iconPrev: JSX.Element;
    iconUser: JSX.Element;
    iconCalendar: JSX.Element;
    iconUp: JSX.Element;
    iconDown: JSX.Element;
    iconEye: JSX.Element;
    iconEyeSlash: JSX.Element;
    iconHome: JSX.Element;
    iconSetting: JSX.Element;
    iconSearch: JSX.Element;
    iconCart: JSX.Element;
    iconSortUp: JSX.Element;
    iconSortDown: JSX.Element;
    iconDollar: JSX.Element;
    iconIncrease: JSX.Element;
    iconDecrease: JSX.Element;
    iconDelete: JSX.Element;
    iconLock: JSX.Element;
    iconMail: JSX.Element;
    iconError: JSX.Element;
    iconCamera: JSX.Element;
    iconLogout: JSX.Element;
    iconEditUser: JSX.Element;
    iconCartAdmin: JSX.Element;
    iconEdit: JSX.Element;
    iconAdd: JSX.Element;
    iconAddUser: JSX.Element;
    iconRevenue: JSX.Element;
    iconExcel: JSX.Element;
    iconTag: JSX.Element;
    iconRole: JSX.Element;
    iconClock: JSX.Element;
    iconDashboard: JSX.Element;
    iconPackage: JSX.Element;
    iconCheck: JSX.Element;
    iconUncheck: JSX.Element;
    iconMinus: JSX.Element;
    iconPlay: JSX.Element;
    iconPlayCircle: JSX.Element;
    iconStar: JSX.Element;
}

const defaultIcons: Icons = {
    iconMenu: <CgMenu />,
    iconClose: <IoClose className=" mx-auto" />,
    iconBackToTop: <FaAngleDoubleUp />,
    iconMap: <FaMapMarkerAlt size={30} />,
    iconNext: <MdNavigateNext size={24} />,
    iconPrev: <MdNavigateBefore size={24} />,
    iconUser: <FaUser />,
    iconCalendar: <FaCalendarDays />,
    iconUp: <FaChevronUp size={14} />,
    iconDown: <FaChevronDown size={14} />,
    iconEye: <FaEye className="mx-auto" />,
    iconEyeSlash: <FaEyeSlash className="mx-auto" />,
    iconHome: <FaHome />,
    iconSetting: <RiUserSettingsFill />,
    iconSearch: <IoMdSearch className="mx-auto" />,
    iconCart: <FaCartShopping />,
    iconCartAdmin: <FaCartShopping className="mx-auto" />,
    iconSortUp: <FaArrowUpLong />,
    iconSortDown: <FaArrowDownLong />,
    iconDollar: <FaDollarSign />,
    iconIncrease: <RiAddFill className="mx-auto" />,
    iconDecrease: <MdHorizontalRule className="mx-auto" />,
    iconDelete: <BsTrash3Fill />,
    iconLock: <FaLock />,
    iconMail: <IoMdMail />,
    iconError: <MdError />,
    iconCamera: <FaCamera />,
    iconLogout: <IoLogOut />,
    iconEditUser: <FaUserEdit className="mx-auto" />,
    iconEdit: <FaEdit className="mx-auto" />,
    iconAdd: <IoMdAdd className="mx-auto" />,
    iconAddUser: <MdPersonAddAlt1 className="mx-auto" />,
    iconRevenue: <FaSackDollar className="mx-auto" />,
    iconExcel: <FaFileExcel className="mx-auto" />,
    iconTag: <FaTag />,
    iconRole: <FaUserTie />,
    iconClock: <FaCalendarAlt />,
    iconDashboard: <MdDashboard />,
    iconPackage: <BiSolidPackage className="mx-auto" />,
    iconCheck: <FaCheckCircle />,
    iconUncheck: <FaRegCircle />,
    iconMinus: <FaMinusCircle />,
    iconPlay: <FaPlay />,
    iconPlayCircle: <FaPlayCircle />,
    iconStar: <FaStar />
}

interface Pages {
    id: number;
    title: string;
    icon: JSX.Element;
    path: string
}

const defaultPages: Pages[] = [
    {
        id: 0,
        title: 'Home',
        icon: <FaHome />,
        path: "/"
    },
    {
        id: 1,
        title: 'Universal',
        icon: <></>,
        path: "/universal"
    }
]

interface Type {
    id: number;
    title: string,
    type: string
}

const defaultContentType: Type[] = [
    {
        id: 0,
        title: "Movies",
        type: "movie"
    },
    {
        id: 1,
        title: "TV Series",
        type: 'tv_series'
    },
    {
        id: 2,
        title: "TV Special",
        type: 'tv_special'
    },
    {
        id: 3,
        title: "TV Miniseries",
        type: 'tv_miniseries'
    },
    {
        id: 4,
        title: "Short Film",
        type: 'short_film'
    }
]

const defaultServiceType: Type[] = [
    {
        id: 0,
        title: "Free",
        type: 'free'
    },
    {
        id: 1,
        title: "Sub",
        type: 'sub'
    },
    {
        id: 2,
        title: "Tve",
        type: 'tve'
    },
    {
        id: 3,
        title: 'Purchase',
        type: 'purchase'
    }
]

export interface GlobalState {
    icons: Icons;
    isMobile: boolean;
    isTable: boolean;
    imgs: Imgs;
    pages: Pages[];
    contentType: Type[];
    serviceType: Type[];
    styleColor: (source_id: number) => React.CSSProperties;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const isTable = useMediaQuery("(max-width:1024px)");
    const styleColor = (source_id: number) => {
        switch (source_id) {
            case 203:
            case 440:
            case 269: return { backgroundColor: "rgb(229, 9, 20)" }
            case 157: return { backgroundColor: "#01BE74" }
            case 387:
            case 454: return { backgroundColor: "#0137FB" }
            case 26: return { backgroundColor: "#10A3DA" }
            case 372: return { backgroundColor: "#0E1D52" }
            case 371: return { backgroundColor: "#6F7378" }
            case 444: return { backgroundColor: "#065FFB" }
            case 455: return { backgroundColor: "#0269FB" }
            case 365: return { backgroundColor: "#38135F" }
            case 108: return { backgroundColor: "#604D22" }
            case 367: return { backgroundColor: "#757575" }
            case 192: return { backgroundColor: "#E76728" }
            case 464: return { backgroundColor: "#971B84" }
            case 299:
            case 369:
            case 252:
            case 318:
            case 344:
            case 345:
            case 368: return { backgroundColor: "#D91E25" }
            case 80: return { backgroundColor: "#F78B24" }
            case 456: return { backgroundColor: "#009BF4" }
            case 457: return { backgroundColor: "#04FFA8" }
            case 140: return { backgroundColor: "#52D8CA" }
            case 24:
            case 68:
            case 81:
            case 253:
            case 234: return { backgroundColor: "#8DB449" }
            case 307: return { backgroundColor: "#3578BC" }
            case 270:
            case 271: return { backgroundColor: "#E0FF35" }
            case 18: return { backgroundColor: "#892526" }
            default: return { backgroundColor: "var(--color-cyan-600)" }
        }
    }

    const value = {
        icons: defaultIcons,
        isMobile, isTable,
        imgs: defaultImgs,
        pages: defaultPages,
        contentType: defaultContentType,
        serviceType: defaultServiceType,
        styleColor
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for convenience
export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};