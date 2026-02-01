import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};


const UpdateEmployeeForm = () => {
  const { id } = useParams(); // URL se dynamic userId
  const userId = id;
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    dob: "",
    gender: "",
    employment: "Full Time",
    role: "User",
    email: "",
    password: "",
    mobile: "",
    address: "",
    fatherName: "",
    fatherContact: "",
    bankName: "",
    holderName: "",
    accountNo: "",
    ifsc: "",
    place: "",
    date: ""
  });

  // Image state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Load existing employee data
  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/get_user/${userId}`)
  //     .then((res) => res.json())
  //     .then((resData) => {
  //       if (resData.success) {
  //         setFormData({
  //           ...resData.data,
  //           password: "" // Password empty for update
  //         });
  //         setPreview(resData.data.image ?`http://localhost:5000/${resData.data.image}` : ``); // Existing image from backend
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, [userId]);
  useEffect(() => {
  fetch(`http://localhost:5000/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      setFormData({
        name: data.name || "",
        qualification: data.qualification || "",
        dob: formatDate(data.dob),    
        date: formatDate(data.date),  
        gender: data.gender || "",
        employment: data.employment || "Full Time",
        role: data.role || "User",
        email: data.email || "",
        password: "",
        mobile: data.mobile || "",
        address: data.address || "",
        fatherName: data.fatherName || "",
        fatherContact: data.fatherContact || "",
        bankName: data.bankName || "",
        holderName: data.holderName || "",
        accountNo: data.accountNo || "",
        ifsc: data.ifsc || "",
        place: data.place || ""
      });

      // ✅ IMAGE preview auto-fill
      if (data.image) {
        setPreview(`http://localhost:5000/${data.image}`);
      }
    })
    .catch(err => console.log(err));
}, [userId]);


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Add all fields except empty password
      Object.keys(formData).forEach((key) => {
        if (key === "password" && !formData.password) return;
        formDataToSend.append(key, formData[key]);
      });

      // Add image if selected
      if (image) formDataToSend.append("image", image);

      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        body: formDataToSend
      });

      const data = await res.json();
      if (data.success) {
        alert("Employee Updated Successfully ✅");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="ml-2 mr-2 mt-0">
      {/* Header & Image */}
      <div className="flex items-center gap-4">
      
        <label className="ml-auto cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="Employee"
              className="w-24 h-24 object-cover rounded"
            />
          ) : (
            <div className="w-24 h-24 border flex items-center justify-center">
              Upload Photo
            </div>
          )}
          <input type="file" hidden onChange={handleImageChange} />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>
          <label className="flex flex-col">
            Qualification:
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>
          <label className="flex flex-col">
            DOB:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          {/* Gender */}
          <div className="flex items-center gap-2">
            Gender:
            <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange}/> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange}/> Female</label>
          </div>

          <label className="flex flex-col">
            Employment:
            <select name="employment" value={formData.employment} onChange={handleChange} className="border px-2 py-1 rounded">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Freelancing</option>
            </select>
          </label>

          {/* Role */}
          <div className="flex items-center gap-2">
            Role:
            <label><input type="radio" name="role" value="Admin" checked={formData.role==="Admin"} onChange={handleChange}/> Admin</label>
            <label><input type="radio" name="role" value="User" checked={formData.role==="User"} onChange={handleChange}/> User</label>
          </div>

          <label className="flex flex-col">
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="border px-2 py-1 rounded" placeholder="Leave blank to keep unchanged"/>
          </label>

          <label className="flex flex-col">
            Mobile:
            <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>
          <label className="flex flex-col">
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Father Name:
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Father Contact:
            <input type="number" name="fatherContact" value={formData.fatherContact} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Bank Name:
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Holder Name:
            <input type="text" name="holderName" value={formData.holderName} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Account No:
            <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            IFSC:
            <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Place:
            <input type="text" name="place" value={formData.place} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>

          <label className="flex flex-col">
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="border px-2 py-1 rounded"/>
          </label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
           type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg"
        >Back
        </button>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 self-center">
          Update Employee
        </button>
        </div>
      </form>
     
    </div>

  );
};

export default UpdateEmployeeForm;
