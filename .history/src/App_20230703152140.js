/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import EAdminOrders from "./E-CommerceAdmin/pages/EAdminOrders";
import ESubCategory from "./E-CommerceAdmin/pages/ESubCategory";
import PushNotification from "./E-CommerceAdmin/pages/PushNotification";
import Coupon from "./E-CommerceAdmin/pages/Coupon";
import GetMeThis from "./E-CommerceAdmin/pages/GetMeThis";
import JobsDetails from "./E-CommerceAdmin/pages/Jobs/JobsDetails";
import DriverDetails from "./E-CommerceAdmin/pages/Drivers/DriverDetails";
import Post from "./E-CommerceAdmin/pages/Post";
import Notification from "./E-CommerceAdmin/pages/Notification";
import Help from "./E-CommerceAdmin/pages/Help";
import Location from "./E-CommerceAdmin/pages/Location/Location";
import Language from "./E-CommerceAdmin/pages/Language/Language";
import VehicleTypes from "./E-CommerceAdmin/pages/VehicleType/VehicleTypes";
import Drivers from "./E-CommerceAdmin/pages/Drivers/Drivers";
import Petrol from "./E-CommerceAdmin/pages/Petrol Rate/Petrol";
import Community from "./E-CommerceAdmin/pages/Community/Community";
import Plan from "./E-CommerceAdmin/pages/Plans/Plan";
import JobType from "./E-CommerceAdmin/pages/Job Type/JobType";
import Employer from "./E-CommerceAdmin/pages/Employer/Employer";
import Jobs from "./E-CommerceAdmin/pages/Jobs/Jobs";
import Category from "./E-CommerceAdmin/pages/Category/Category";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pushNotification" element={<PushNotification />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/getMeThis" element={<GetMeThis />} />
        <Route path="/Orders" element={<EAdminOrders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/SubCategory" element={<ESubCategory />} />
        <Route path="/post" element={<Post />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/help_support" element={<Help />} />
        <Route path="/location" element={<Location />} />
        <Route path="/language" element={<Language />} />
        <Route path="/Vehicle_Types" element={<VehicleTypes />} />
        <Route path="/Drivers" element={<Drivers />} />
        <Route path="/driver/:id" element={<DriverDetails />} />
        <Route path="/petrol" element={<Petrol />} />
        <Route path="/community" element={<Community />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/job-type" element={<JobType />} />
        <Route path="/Employer" element={<Employer />} />
        <Route path="/job" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobsDetails />} />



        
        <Route path="/Category" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
