/** @format */

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import { AllCategory, AllDrivers, AllJobs, AllVehicleType, GetAllEmployer } from "../../Repository/Employer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [ productCount , setProductCount ] = useState(0)
  const [ orderCount , setOrderCount ] = useState(0)


  const fetchAdmin = async () => {
    try {
      const { data } = await GetAllEmployer()
      setUserCount(data.msg.length)
    } catch (e) {
      console.log(e);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await AllJobs()
      setAdminCount(data.msg.length)
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await AllCategory()
      setCategoryCount(data.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await AllDrivers()
      setProductCount(data.msg.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrder = async () => {
    try {
      const { data } = await AllVehicleType()
      setOrderCount(data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchJobs()
    fetchCategory();
    fetchProduct()
    fetchOrder()
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "Total Employer",
      number: userCount,
      icon: (
        <i
          className="fa-solid fa-user text-2xl"
          style={{ color: "#4099ff" }}
        ></i>
      ),
      bg: "#4099ff",
      link: "/Employer",
    },
    {
      progress: "bg-green-400",
      title: "All Jobs",
      number: adminCount,
      icon: <FiUser className="text-2xl text-[#29cccc]" />,
      bg: "#29cccc",
      link: "/Customer",
    },
    {
      progress: "bg-green-400",
      title: "All Category",
      number: categoryCount,
      icon: <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>,
      bg: "#3c335d",
      link: "/Category",
    },
    {
      progress: "bg-green-400",
      title: "All Driver",
      number: productCount,
      icon: <i className=" fa-brands fa-slack text-2xl text-[#64878e]"></i>,
      bg: "#64878e",
      link: "/Drivers",
    },
  
    {
      progress: "bg-green-400",
      title: "All Vehicle Type",
      number: orderCount,
      icon: (
        <i className=" fa-solid fa-bag-shopping text-2xl text-[#1b6975]"></i>
      ),
      bg: "#1b6975",
      link: "/Vehicle_Types",
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
