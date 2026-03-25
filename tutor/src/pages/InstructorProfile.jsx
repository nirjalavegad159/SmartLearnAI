// import { useEffect, useState } from "react";
// import SideBar from "../components/SideBar";
// import Api from "../services/Api";
// import { useParams } from "react-router-dom";

// function InstructorProfile() {

//   const { instructor_id } = useParams();

//   const [isEditing, setIsEditing] = useState(false);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [user, setUser] = useState(null);

  
//   const [formData, setFormData] = useState({
//     fullname:"",
//     // photo: "",
//     gender: "",
//     mobile: "",
//     qualification: "",
//     experience: "",
//     skills: [],
//     bio:"",
//     language: [],
//     state_id: "",
//     city_id: ""
//   });

//   // LOAD PROFILE
//   useEffect(() => {
//     if (!instructor_id) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await Api.get(`/single_instructor_profile/${instructor_id}`);
//         const data = res.data;

//         setFormData({
//           fullname: data.user?.fullname || "",
//           // photo: data.photo || "",
//           gender: data.gender || "",
//           mobile: data.mobile || "",
//           qualification: data.qualification || "",
//           experience: data.experience || "",
//           skills: data.skills ? data.skills.split(",") : [],
//           bio: data.bio|| "",
//           language: data.language ? data.language.split(",") : [],
//           state_id: data.state_id || "",
//           city_id: data.city_id || ""
//         });

//         if (data.state_id) {
//           fetchCities(data.state_id);
//         }

//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, [instructor_id]);

//   // // LOAD LOGGED USER (for name/email)
//   // useEffect(() => {
//   //   Api.get("/me")
//   //     .then((res) => setUser(res.data))
//   //     .catch((err) => console.log(err));
//   // }, []);

//   // LOAD STATES
//   useEffect(() => {
//     Api.get("/states")
//       .then((res) => setStates(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   // LOAD CITIES
//   const fetchCities = async (state_id) => {
//     try {
//       const res = await Api.get(`/cities/${state_id}`);
//       setCities(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // INPUT HANDLER
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleStateChange = (e) => {
//     const stateId = e.target.value;

//     setFormData((prev) => ({
//       ...prev,
//       state_id: state_id,
//       city_id: "",
//     }));

//     if (stateId) {
//       fetchCities(state_id);
//     } else {
//       setCities([]);
//     }
//   };

//   const handleMultiSelect = (e, field) => {
//     const selected = Array.from(e.target.selectedOptions, (o) => o.value);

//     setFormData((prev) => ({
//       ...prev,
//       [field]: selected,
//     }));
//   };

//   // SAVE / UPDATE
//   const handleSave = async () => {
//     if (!instructor_id) {
//       alert("Instructor ID missing!");
//       return;
//     }

//     try {
//       await Api.post(`/insert_update_instructor_profile/${instructor_id}`, {
//         // photo: formData.photo || null,
//         gender: formData.gender || null,
//         mobile: formData.mobile || null,
//         qualification: formData.qualification || null,
//         experience: formData.experience || null,
//         bio: formData.bio || null,
//         state_id: formData.state_id ? Number(formData.state_id) : null,
//         city_id: formData.city_id ? Number(formData.city_id) : null,
//         skills: formData.skills.length ? formData.skills.join(",") : null,
//         language: formData.language.length ? formData.language.join(",") : null,
//       });

//       alert("Profile Updated Successfully!");
//       setIsEditing(false);

//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Update Failed");
//     }
//   };
// const educationOptions = [
//     "BCA",
//     "BSc - Computer Science",
//     "BSc - IT",
//     "B.Tech - Computer Science",
//     "B.Tech - IT",
//     "B.Tech - AI & ML",
//     "B.E - Computer Engineering",
//     "BCom",
//     "BBA",
//     "BA",
//     "MCA",
//     "MSc - Computer Science",
//     "MSc - Data Science",
//     "M.Tech - Computer Science",
//     "MBA - IT",
//     "MBA - Business Analytics",
//     "Diploma - Computer Engineering",
//     "Diploma - IT",
//     "Self-Taught",
//     "Working Professional - IT",
//     "Working Professional - Non-IT",
//     "Computer Science",
//     "Information Technology",
//     "Artificial Intelligence",
//     "Data Science",
//     "Cyber Security",
//     "Business Administration",
//     "Commerce",
//     "Arts",
//   ];


//   const skillOptions = [
//   "C/C++",
//   "Java",
//   "Python",
//   "JavaScript",
//   "Full Stack Development",
//   "Frontend Development",
//   "Backend Development",
//   "React",
//   "Angular",
//   "Node.js",
//   "Machine Learning",
//   "Deep Learning",
//   "Artificial Intelligence",
//   "Data Science",
//   "Data Analytics",
//   "Generative AI",
//   "Natural Language Processing (NLP)",
//   "Computer Vision",
//   "DevOps",
//   "Cloud Computing",
//   "AWS",
//   "Azure",
//   "Docker",
//   "Kubernetes",
//   "Cyber Security",
//   "Ethical Hacking",
//   "Blockchain",
//   "Web3",
//   "Digital Marketing",
//   "Social Media Marketing",
//   "SEO (Search Engine Optimization)",
//   "Google Ads",
//   "Meta Ads",
//   "Content Marketing",
//   "Email Marketing",
//   "Affiliate Marketing",
//   "Influencer Marketing",
//   "Performance Marketing",
//   "Business Development",
//   "Product Management",
//   "Project Management",
//   "Entrepreneurship",
//   "Startup Strategy",
//   "Business Analytics",
//    "UI/UX",
//   "Graphic Design",
//   "Video Editing",
//   "Motion Graphics",
//   "Content Creation",
//   "Personal Branding",
//   "No-Code / Low-Code Development",
//   "Automation",
//   "Prompt Engineering",
//   "AR/VR",
//   "IoT",
//   ];

//   const languageOptions = [
//     "English",
//     "Hindi",
//     "Gujarati",
//     "Spanish",
//     "French",
//     "German",
//     "Other"
//   ];

// //   return (
// //     <div className="flex min-h-screen bg-gray-100">
// //       <div className="w-64">
// //         <SideBar />
// //       </div>

// //       <div className="flex-1 p-10 flex justify-center items-center">
// //         <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

// //           {/* Header */}
// //           <div className="flex justify-between mb-8">
// //             <h2 className="text-2xl font-bold">Instructor Profile</h2>

// //             {!isEditing ? (
// //               <button
// //                 onClick={() => setIsEditing(true)}
// //                 className="bg-indigo-500 text-white px-6 py-2 rounded-full"
// //               >
// //                 Edit
// //               </button>
// //             ) : (
// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => setIsEditing(false)}
// //                   className="bg-gray-300 px-5 py-2 rounded-full"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleSave}
// //                   className="bg-indigo-500 text-white px-5 py-2 rounded-full"
// //                 >
// //                   Save
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           {/* Grid */}
// //           <div className="grid grid-cols-2 gap-6">

// //             <div>
// //               <label className="block text-gray-600 mb-2">Full Name</label>
// //               <input
// //                 value={user?.fullname || ""}
// //                 disabled
// //                 className="w-full p-3 rounded-xl bg-gray-100 border"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-600 mb-2">Email</label>
// //               <input
// //                 value={user?.email || ""}
// //                 disabled
// //                 className="w-full p-3 rounded-xl bg-gray-100 border"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-600 mb-2">Phone</label>
// //               <input
// //                 name="phone"
// //                 value={formData.phone}
// //                 disabled={!isEditing}
// //                 onChange={handleChange}
// //                 className="w-full p-3 rounded-xl border"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-600 mb-2">Experience</label>
// //               <input
// //                 name="experience"
// //                 value={formData.experience}
// //                 disabled={!isEditing}
// //                 onChange={handleChange}
// //                 className="w-full p-3 rounded-xl border"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-600 mb-2">Qualification</label>
// //               <input
// //                 name="qualification"
// //                 value={formData.qualification}
// //                 disabled={!isEditing}
// //                 onChange={handleChange}
// //                 className="w-full p-3 rounded-xl border"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-600 mb-2">State</label>
// //               <select
// //                 name="state_id"
// //                 value={formData.state_id}
// //                 disabled={!isEditing}
// //                 onChange={handleStateChange}
// //                 className="w-full p-3 rounded-xl border"
// //               >
// //                 <option value="">Select State</option>
// //                 {states.map((state) => (
// //                   <option key={state.state_id} value={state.state_id}>
// //                     {state.state_name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-gray-600 mb-2">City</label>
// //               <select
// //                 name="city_id"
// //                 value={formData.city_id}
// //                 disabled={!isEditing}
// //                 onChange={handleChange}
// //                 className="w-full p-3 rounded-xl border"
// //               >
// //                 <option value="">Select City</option>
// //                 {cities.map((city) => (
// //                   <option key={city.city_id} value={city.city_id}>
// //                     {city.city_name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {/* Bio */}
// //           <div className="mt-6">
// //             <label className="block text-gray-600 mb-2">Bio</label>
// //             <textarea
// //               name="bio"
// //               value={formData.bio}
// //               disabled={!isEditing}
// //               onChange={handleChange}
// //               className="w-full p-3 rounded-xl border"
// //             />
// //           </div>

// //           {/* Skills */}
// //           <div className="mt-6">
// //             <label className="block text-gray-600 mb-2">Skills</label>
// //             <select
// //               multiple
// //               value={formData.skills}
// //               disabled={!isEditing}
// //               onChange={(e) => handleMultiSelect(e, "skills")}
// //               className="w-full p-3 rounded-xl border"
// //             >
// //               {skillOptions.map((skill, i) => (
// //                 <option key={i} value={skill}>
// //                   {skill}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Languages */}
// //           <div className="mt-6">
// //             <label className="block text-gray-600 mb-2">Languages</label>
// //             <select
// //               multiple
// //               value={formData.language}
// //               disabled={!isEditing}
// //               onChange={(e) => handleMultiSelect(e, "language")}
// //               className="w-full p-3 rounded-xl border"
// //             >
// //               {languageOptions.map((lang, i) => (
// //                 <option key={i} value={lang}>
// //                   {lang}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default InstructorProfile;

// // return (

// //     <div className="min-h-screen bg-gray-100">

// //       {/* TOP BANNER */}
// //       <SideBar/>
// //       <div className="bg-indigo-600 h-48 flex items-end justify-center pb-6">

// //         <div className="text-center text-white">

// //           <img
// //             src="https://via.placeholder.com/120"
// //             className="w-28 h-28 rounded-full border-4 border-white mx-auto mb-2"
// //           />

// //           <input
// //             name="fullname"
// //             value={profile.fullname}
// //             disabled={!editMode}
// //             onChange={handleChange}
// //             className="text-2xl font-bold text-center bg-transparent outline-none"
// //           />

// //           <p className="text-sm opacity-90">{profile.title}</p>

// //         </div>

// //       </div>

// //       {/* CONTENT */}

// //       <div className="max-w-4xl mx-auto p-6 space-y-6">

// //         {/* ABOUT */}

// //         <div className="bg-white p-6 rounded-xl shadow">

// //           <div className="flex justify-between mb-3">

// //             <h3 className="text-lg font-semibold">
// //               About Instructor
// //             </h3>

// //             <button
// //               onClick={() => setEditMode(!editMode)}
// //               className="text-indigo-600 font-medium"
// //             >
// //               {editMode ? "Save" : "Edit"}
// //             </button>

// //           </div>

// //           <textarea
// //             name="bio"
// //             value={profile.bio}
// //             disabled={!editMode}
// //             onChange={handleChange}
// //             className="w-full border rounded-md p-3"
// //           />

// //         </div>

// //         {/* PROFESSIONAL INFO */}

// //         <div className="bg-white p-6 rounded-xl shadow">

// //           <h3 className="text-lg font-semibold mb-4">
// //             Professional Information
// //           </h3>

// //           <div className="grid grid-cols-2 gap-4">

// //             <input
// //               name="qualification"
// //               value={profile.qualification}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded"
// //             />

// //             <input
// //               name="experience"
// //               value={profile.experience}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded"
// //             />

// //             <input
// //               name="skills"
// //               value={profile.skills}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded col-span-2"
// //             />

// //             <input
// //               name="language"
// //               value={profile.language}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded"
// //             />

// //           </div>

// //         </div>

// //         {/* CONTACT */}

// //         <div className="bg-white p-6 rounded-xl shadow">

// //           <h3 className="text-lg font-semibold mb-4">
// //             Contact Information
// //           </h3>

// //           <div className="grid grid-cols-2 gap-4">

// //             <input
// //               name="email"
// //               value={profile.email}
// //               disabled
// //               className="border p-2 rounded"
// //             />

// //             <input
// //               name="phone"
// //               value={profile.phone}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded"
// //             />

// //             <input
// //               name="state"
// //               value={profile.state}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded"
// //             />

// //             <input
// //               name="city"
// //               value={profile.city}
// //               disabled={!editMode}
// //               onChange={handleChange}
// //               className="border p-2 rounded"
// //             />

// //           </div>

// //         </div>

// //       </div>

// //     </div>

// //   );

// return (
//   <div className="min-h-screen bg-gray-100 p-6">
//     <SideBar />

//     <div className="max-w-4xl mx-auto space-y-6">

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Instructor Profile</h2>

//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-indigo-500 text-white px-5 py-2 rounded"
//           >
//             Edit
//           </button>
//         ) : (
//           <div className="flex gap-3">
//             <button
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-300 px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="bg-indigo-500 text-white px-4 py-2 rounded"
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Profile Image */}
//       <div className="bg-white p-6 rounded shadow text-center">
//        <input
//           name="name"
//           value={formData.fullname}
//           disabled={!isEditing}
//           onChange={handleChange}
//           placeholder="Name"
//           className="border p-2 rounded"
//         />
//         {/* <img
//           src={formData.photo || "https://via.placeholder.com/120"}
//           className="w-28 h-28 rounded-full mx-auto mb-3"
//         /> */}
//       </div>

//       {/* Basic Info */}
//       <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">

//         <select
//           name="gender"
//           value={formData.gender}
//           disabled={!isEditing}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>

//         <input
//           name="mobile"
//           value={formData.mobile}
//           disabled={!isEditing}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="border p-2 rounded"
//         />

//       </div>

//       {/* Professional Info */}
//       <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">

//         <input
//           name="qualification"
//           value={formData.qualification}
//           disabled={!isEditing}
//           onChange={handleChange}
//           placeholder="Qualification"
//           className="border p-2 rounded"
//         />

//         <input
//           name="experience"
//           value={formData.experience}
//           disabled={!isEditing}
//           onChange={handleChange}
//           placeholder="Experience"
//           className="border p-2 rounded"
//         />

//         <textarea
//           name="bio"
//           value={formData.bio}
//           disabled={!isEditing}
//           onChange={handleChange}
//           placeholder="Bio"
//           className="border p-2 rounded"
//         />

//       </div>

//       {/* Skills */}
//       <div className="bg-white p-6 rounded shadow">
//         <label className="block mb-2">Skills</label>
//         <select
//           multiple
//           value={formData.skills}
//           disabled={!isEditing}
//           onChange={(e) => handleMultiSelect(e, "skills")}
//           className="w-full border p-2 rounded"
//         >
//           {skillOptions.map((s, i) => (
//             <option key={i} value={s}>{s}</option>
//           ))}
//         </select>
//       </div>

//       {/* Languages */}
//       <div className="bg-white p-6 rounded shadow">
//         <label className="block mb-2">Languages</label>
//         <select
//           multiple
//           value={formData.language}
//           disabled={!isEditing}
//           onChange={(e) => handleMultiSelect(e, "language")}
//           className="w-full border p-2 rounded"
//         >
//           {languageOptions.map((l, i) => (
//             <option key={i} value={l}>{l}</option>
//           ))}
//         </select>
//       </div>

//       {/* Location */}
//       <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">

//         <select
//           name="state_id"
//           value={formData.state_id}
//           disabled={!isEditing}
//           onChange={handleStateChange}
//           className="border p-2 rounded"
//         >
//           <option value="">Select State</option>
//           {states.map((s) => (
//             <option key={s.state_id} value={s.state_id}>
//               {s.state_name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="city_id"
//           value={formData.city_id}
//           disabled={!isEditing}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         >
//           <option value="">Select City</option>
//           {cities.map((c) => (
//             <option key={c.city_id} value={c.city_id}>
//               {c.city_name}
//             </option>
//           ))}
//         </select>

//       </div>

//     </div>
//   </div>
// );
// }

// export default InstructorProfile;
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Api from "../services/Api";

function InstructorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    mobile: "",
    qualification: "",
    experience: "",
    skills: [],
    bio: "",
    language: [],
    state_id: "",
    city_id: "",
  });

  // ✅ Load Logged-in User (name/email)
  useEffect(() => {
    Api.get("/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Load Instructor Profile (based on token)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await Api.get("/my_instructor_profile");
        const data = res.data;

        setFormData({
          fullname: data.user?.fullname || "",
          gender: data.gender || "",
          mobile: data.mobile || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          skills: data.skills ? data.skills.split(",") : [],
          bio: data.bio || "",
          language: data.language ? data.language.split(",") : [],
          state_id: data.state_id || "",
          city_id: data.city_id || "",
        });

        if (data.state_id) {
          fetchCities(data.state_id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Load States
  useEffect(() => {
    Api.get("/states")
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Load Cities
  const fetchCities = async (stateId) => {
    try {
      const res = await Api.get(`/cities/${stateId}`);
      setCities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ State Change
  const handleStateChange = (e) => {
    const stateId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state_id: stateId,
      city_id: "",
    }));

    if (stateId) {
      fetchCities(stateId);
    } else {
      setCities([]);
    }
  };

  // ✅ Multi Select
  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);

    setFormData((prev) => ({
      ...prev,
      [field]: selected,
    }));
  };

  // ✅ Save Profile
  const handleSave = async () => {
    try {
      await Api.post(`/insert_update_instructor_profile`, {
        gender: formData.gender || null,
        mobile: formData.mobile || null,
        qualification: formData.qualification || null,
        experience: formData.experience || null,
        bio: formData.bio || null,
        state_id: formData.state_id ? Number(formData.state_id) : null,
        city_id: formData.city_id ? Number(formData.city_id) : null,
        skills: formData.skills.length ? formData.skills.join(",") : null,
        language: formData.language.length ? formData.language.join(",") : null,
      });

      alert("Profile Updated Successfully!");
      setIsEditing(false);
    } catch (err) {
      console.log(err.response?.data);
      alert("Update Failed");
    }
  };

  const skillOptions = ["Java", "Python", "React", "Node.js", "AI"];
  const languageOptions = ["English", "Hindi", "Gujarati"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SideBar />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Instructor Profile</h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-500 text-white px-5 py-2 rounded"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
          <input
            value={user?.fullname || ""}
            disabled
            className="border p-2 rounded"
          />

          <input
            value={user?.email || ""}
            disabled
            className="border p-2 rounded"
          />
        </div>

        {/* Basic Info */}
        <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
          <select
            name="gender"
            value={formData.gender}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="mobile"
            value={formData.mobile}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-2 rounded"
          />
        </div>

        {/* Professional Info */}
        <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
          <input
            name="qualification"
            value={formData.qualification}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="Qualification"
            className="border p-2 rounded"
          />

          <input
            name="experience"
            value={formData.experience}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="Experience"
            className="border p-2 rounded"
          />

          <textarea
            name="bio"
            value={formData.bio}
            disabled={!isEditing}
            onChange={handleChange}
            placeholder="Bio"
            className="border p-2 rounded col-span-2"
          />
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded shadow">
          <label className="block mb-2">Skills</label>
          <select
            multiple
            value={formData.skills}
            disabled={!isEditing}
            onChange={(e) => handleMultiSelect(e, "skills")}
            className="w-full border p-2 rounded"
          >
            {skillOptions.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Languages */}
        <div className="bg-white p-6 rounded shadow">
          <label className="block mb-2">Languages</label>
          <select
            multiple
            value={formData.language}
            disabled={!isEditing}
            onChange={(e) => handleMultiSelect(e, "language")}
            className="w-full border p-2 rounded"
          >
            {languageOptions.map((l, i) => (
              <option key={i} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
          <select
            name="state_id"
            value={formData.state_id}
            disabled={!isEditing}
            onChange={handleStateChange}
            className="border p-2 rounded"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.state_id} value={s.state_id}>
                {s.state_name}
              </option>
            ))}
          </select>

          <select
            name="city_id"
            value={formData.city_id}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.city_id} value={c.city_id}>
                {c.city_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default InstructorProfile;
