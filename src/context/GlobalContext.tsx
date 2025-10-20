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
    FaCalendarAlt
} from "react-icons/fa";
import { FaCalendarDays, FaCartShopping, FaArrowDownLong, FaArrowUpLong, FaSackDollar } from "react-icons/fa6";
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

interface Imgs {
    imgLogo: string;
}

const defaultImgs: Imgs = {
    imgLogo: logo
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
    iconPackage: <BiSolidPackage className="mx-auto" />
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

export interface GlobalState {
    icons: Icons;
    isMobile: boolean;
    isTable: boolean;
    imgs: Imgs;
    pages: Pages[]
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const isTable = useMediaQuery("(max-width:1024px)")

    const value = {
        icons: defaultIcons,
        isMobile, isTable,
        imgs: defaultImgs,
        pages: defaultPages
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