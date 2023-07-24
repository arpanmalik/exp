/** @format */

import React ,{useEffect, useState} from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { MdCategory } from 'react-icons/md';
import axios from "axios";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const [perm, setPerm] = useState({});

  const token = localStorage.getItem("Token");
  const id = localStorage.getItem("id");

  const getPerm = async()=>{
    const url = `https://gadi-driver-u8ym.vercel.app/api/v1/admin/${id}`;
    try{
      const {data} = await axios.get(url,{
        headers:{Authorization : `Bearer ${token}`}
      })
      console.log(data?.data?.permissions);
      setPerm(data?.data?.permissions);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getPerm();
  },[])

  const admin = localStorage.getItem("role");

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/dashboard ",
      name: "Dashboard",
    },
    admin==="ADMIN" ? 
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/sub-admin ",
      name: "Sub Admin",
    } : "",
    {
      icon: <i className="fa-solid fa-user text-xl mr-3 rounded-full"></i>,
      link: "/Employer",
      name: "Employer",
    },
    {
      icon: (
        <i className="fa-solid fa-paperclip text-xl mr-3 rounded-full"></i>
      ),
      link: "/job",
      name: "Jobs",
    },
    perm?.viewCategory ? 
    {
      icon: <MdCategory className="text-xl mr-3 rounded-full " />,
      link: "/Category",
      name: "Category",
    } : "",
    {
      icon: <i className="fa-solid fa-id-card  text-xl mr-3 rounded-full"></i>,
      link: "/Drivers",
      name: "Drivers",
    },
    perm?.viewvehicletype ?
    {
      icon: (
        <i className="fa-solid fa-car text-xl mr-3 rounded-full"></i>
      ),
      link: "/Vehicle_Types",
      name: "Vehicle Types",
    } : "",

    {
      icon: <i className="fa-solid fa-calendar-days text-xl mr-3 rounded-full" />,
      link: "/pushNotification",
      name: "Subscription",
    },

    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/coupon",
      name: "FAQ'S",
    },
    perm?.viewCategoryInterest ? 
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/getMeThis",
      name: "Category Interest",
    } : "",

    {
      icon: (
        <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full"></i>
      ),
      link: "/Orders",
      name: "Video",
    },

    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/petrol",
      name: "Petrol Rate",
    },
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/SubCategory",
      name: "Forget Password",
    },
    perm?.notificationManagement ? 
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/notification",
      name: "Push Notification",
    } : "",
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/help_support",
      name: "Help and Support",
    },
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/location",
      name: "Location",
    },
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/language",
      name: "Language",
    },
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/community",
      name: "Community",
    },
    perm?.viewJobType ?
    {
      icon: <i className="fa-solid fa-user-tie text-xl mr-3 rounded-full"></i>,
      link: "/job-type",
      name: "Job Type ",
    } : "",
  ];

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#19376d", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[#fff]"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {" "}
            ADMIN PANEL
          </span>
        </figure>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link
                to={nav.link}
                key={nav.name}
                className=""
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
                  style={{ color: "#FFF" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
            style={{ color: "#FFF", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
