
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "", qualification: "", dob: "", gender: "",
    employment: "Full Time", role: "0", email: "",
    mobile: "", address: "", fatherName: "", fatherContact: "",
    bankName: "", holderName: "", accountNo: "", ifsc: "",
    place: "", date: ""
  });

  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (image) {
        formDataToSend.append("image", image);
      }

    const res = await fetch("http://localhost:5000/api/create_user", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await res.json();

    if (data.success) {
      alert("Employee Registered Successfully ✅");
      console.log(data);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
};


  return (
    <div className="">
      {/* Form Container */}
      <div className="">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://jainspark.in/wp-content/uploads/2023/12/cropped-image__2_-removebg-preview.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold">Jain Spark Infotech</h1>
            <p className="text-gray-700 text-sm">C5-III Gurukripa Nagar Airport Road, Indore</p>
            <p className="text-gray-700 text-sm">hr@jainspark.in | +91 731-3529910</p>
          </div>

            {/* <label className="ml-125">
              {image ? <img src={image} alt="Preview" className="w-24 h-24 object-cover rounded"/> : "Upload Photo"}
              <input type="file" onChange={handleImageChange}  className="hidden"/>
            </label> */}

             <label className="ml-auto cursor-pointer ">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-24 h-30 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-24 border flex items-center justify-center">
                Upload Photo
              </div>
            )}
            <input type="file" onChange={handleImageChange} hidden />
          </label>
          </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col  justify-between space-y-2">
          
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col text-sm">
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Qualification:
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              DOB:
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <div className="flex items-center gap-2">
              Gender:
              <label><input type="radio" name="gender" value="Male" onChange={handleChange}/> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange}/> Female</label>
            </div>
            <label className="flex flex-col text-sm">
              Employment:
              <select name="employment" value={formData.employment} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Freelancing</option>
              </select>
            </label>
            <div className="flex items-center gap-2">
              Role:
              <label><input type="radio" name="role" value="Admin" checked={formData.role==="Admin"} onChange={handleChange}/> Admin</label>
              <label><input type="radio" name="role" value="User" checked={formData.role === "User"} onChange={handleChange}/> User</label>
            </div>
            <label className="flex flex-col text-sm">
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>

            <label className="flex flex-col text-sm">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Mobile:
              <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Father Name:
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Father Contact:
              <input type="number" name="fatherContact" value={formData.fatherContact} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Bank Name:
              <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Holder Name:
              <input type="text" name="holderName" value={formData.holderName} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Account No:
              <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              IFSC:
              <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label> 
            <label className="flex flex-col text-sm">
              Place:
              <input type="text" name="place" value={formData.place} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
            <label className="flex flex-col text-sm">
              Date:
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1"/>
            </label>
          </div>
          

          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" required className="w-4 h-4"/>
            <span>I hereby declare that the information furnished above is true, complete and correct.</span>
          </div>
          
          <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Submit Form
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;


//  import React, { useState } from "react";

//    const EmployeeForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     qualification: "",
//     dob: "",
//     gender: "",
//     employment: "Full Time",
//     role: "0",
//     email: "",
//     password: "",
//     mobile: "",
//     address: "",
//     fatherName: "",
//     fatherContact: "",
//     bankName: "",
//     holderName: "",
//     accountNo: "",
//     ifsc: "",
//     place: "",
//     date: "",
//   });

//   const [image, setImage] = useState(null);

//   // ================= TEXT CHANGE =================
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ================= IMAGE CHANGE =================
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]); // ✅ FILE OBJECT
//     }
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();
//       for (let key in formData) {
//         formDataToSend.append(key, formData[key]);
//       }
//       if (image) {
//         formDataToSend.append("image", image);
//       }

//       const res = await fetch("http://localhost:5000/api/create_user", {
//         method: "POST",
//         body: formDataToSend, // ✅ correct
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Employee Registered Successfully ✅");
//         console.log(data);
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div>
//       {/* Form Container */}
//       <div>
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-4">
//           <img
//             src="https://jainspark.in/wp-content/uploads/2023/12/cropped-image__2_-removebg-preview.png"
//             alt="Logo"
//             className="w-16 h-16 object-contain"
//           />
//           <div>
//             <h1 className="text-xl font-bold">Jain Spark Infotech</h1>
//             <p className="text-gray-700 text-sm">
//               C5-III Gurukripa Nagar Airport Road, Indore
//             </p>
//             <p className="text-gray-700 text-sm">
//               hr@jainspark.in | +91 731-3529910
//             </p>
//           </div>

//           {/* IMAGE UPLOAD */}
//           <label className="ml-auto cursor-pointer">
//             {image ? (
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Preview"
//                 className="w-24 h-24 object-cover rounded"
//               />
//             ) : (
//               <div className="w-24 h-24 border flex items-center justify-center">
//                 Upload Photo
//               </div>
//             )}
//             <input type="file" onChange={handleImageChange} hidden />
//           </label>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col space-y-2"
//         >
//           <div className="grid grid-cols-2 gap-2">
//             <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-1" />
//             <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} className="border p-1" />
//             <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-1" />

//             <div>
//               Gender:
//               <label><input type="radio" name="gender" value="Male" onChange={handleChange}/> Male</label>
//               <label><input type="radio" name="gender" value="Female" onChange={handleChange}/> Female</label>
//             </div>

//             <select name="employment" value={formData.employment} onChange={handleChange} className="border p-1">
//               <option>Full Time</option>
//               <option>Part Time</option>
//               <option>Internship</option>
//               <option>Freelancing</option>
//             </select>

//             <div>
//               Role:
//               <label><input type="radio" name="role" value="1" onChange={handleChange}/> Admin</label>
//               <label><input type="radio" name="role" value="0" onChange={handleChange}/> User</label>
//             </div>

//             <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-1" />
//             <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-1" />
//             <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-1" />
//             <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-1" />
//             <input name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} className="border p-1" />
//             <input name="fatherContact" placeholder="Father Contact" value={formData.fatherContact} onChange={handleChange} className="border p-1" />
//             <input name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} className="border p-1" />
//             <input name="holderName" placeholder="Holder Name" value={formData.holderName} onChange={handleChange} className="border p-1" />
//             <input name="accountNo" placeholder="Account No" value={formData.accountNo} onChange={handleChange} className="border p-1" />
//             <input name="ifsc" placeholder="IFSC" value={formData.ifsc} onChange={handleChange} className="border p-1" />
//             <input name="place" placeholder="Place" value={formData.place} onChange={handleChange} className="border p-1" />
//             <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-1" />
//           </div>

//           <div className="flex items-center gap-2">
//             <input type="checkbox" required />
//             <span>I hereby declare that the information furnished above is true.</span>
//           </div>

//           <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
//             Submit Form
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;

