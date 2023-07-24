/** @format */
import axios from "axios";
const BaseUrl = "https://gadi-driver-u8ym.vercel.app/";


const Auth = 

// Employers
export const GetAllEmployer = async () => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/admin/Users`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const AddEmployer = async (employer) => {
  try {
    const response = await axios.post(`${BaseUrl}api/v1/employ`, {
      employer,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteEmployer = async (payload) => {
  try {
    const response = await axios.delete(`${BaseUrl}api/v1/employ/${payload}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Jobs
export const AllJobs = async () => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/jobServices`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteJobs = async (payload) => {
  try {
    const response = await axios.delete(
      `${BaseUrl}api/v1/jobServices/${payload}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const AddJob = async (
  employer,
  jobtitle,
  jobtype,
  vehicletype,
  gender,
  description,
  contactNumber,
  location,
  address,
  postalCode,
  image,
  salaryOffer,
  totalExperience,
  qualification,
  closeDate,
  autoClose,
  fullName,
  email,
  applicantChatYouDirectly,
  startChat,
  uploadImage,
  detailsOfCompany,
  website
) => {
  try {
    const response = await axios.post(`${BaseUrl}api/v1/jobServices`, {
      employer,
      jobtitle,
      jobtype,
      vehicletype,
      gender,
      description,
      contactNumber,
      location,
      address,
      postalCode,
      image,
      salaryOffer,
      totalExperience,
      qualification,
      closeDate,
      autoClose,
      fullName,
      email,
      applicantChatYouDirectly,
      startChat,
      uploadImage,
      detailsOfCompany,
      website,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const GetJobById = async (payload) => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/jobServices/${payload}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Category
export const AllCategory = async () => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/categoryy`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const AddCategory = async (category) => {
  try {
    const response = await axios.post(`${BaseUrl}api/v1/categoryy`, {
      category,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteCategory = async (payload) => {
  try {
    const response = await axios.delete(
      `${BaseUrl}api/v1/categoryy/${payload}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Drivers
export const AllDrivers = async () => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/driverr`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteDrivers = async (payload) => {
  try {
    const response = await axios.delete(
      `${BaseUrl}api/v1/driverr/deleteDriverById/${payload}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DriversDetails = async (payload) => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/driverr/${payload}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Vehicle Type
export const AllVehicleType = async () => {
  try {
    const response = await axios.get(`${BaseUrl}api/v1/vehicletype`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const AddVehicleType = async (vehicletype) => {
  try {
    const response = await axios.post(`${BaseUrl}api/v1/vehicletype`, {
      vehicletype,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteVehicleType = async (payload) => {
  try {
    const response = await axios.delete(
      `${BaseUrl}api/v1/vehicletype/${payload}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
