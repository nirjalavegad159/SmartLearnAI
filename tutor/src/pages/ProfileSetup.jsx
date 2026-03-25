//  import { useState } from "react";
//   import BasicInfo from "../components/BasicInfo";
//   import ProfessionalInfo from "../components/ProfessionalInfo";
//   import TeachingInfo from "../components/TeachingInfo";
//   import LocationInfo from "../components/LocationInfo";
//   import { useNavigate } from "react-router-dom";
//   import Api from "../services/Api";

// function ProfileSetup() {

//   const [step, setStep] = useState(1);
//   // const userId = localStorage.getItem("user_id");
//   const [formData, setFormData] = useState({});

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   // collect data from each step
//   const updateData = (data) => {
//     setFormData((prev) => ({
//       ...prev,
//       ...data
//     }));
//   };

//   // final submit
//   const handleSubmit = async () => {
//     try {

//       // IMPORTANT: for file upload use FormData
//       const payload = new FormData();

//       Object.keys(formData).forEach((key) => {
//         if (Array.isArray(formData[key])) {
//           payload.append(key, JSON.stringify(formData[key]));
//         } else {
//           payload.append(key, formData[key]);
//         }
//       });

//       const res =await Api.post(`/insert_update_instructor_profile/${userId}`, payload, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       console.log(res.data);
//       alert("Profile Created Successfully");

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-5">

//       {step === 1 && (
//         <BasicInfo nextStep={nextStep} updateData={updateData} />
//       )}

//       {step === 2 && (
//         <ProfessionalInfo
//           nextStep={nextStep}
//           prevStep={prevStep}
//           updateData={updateData}
//         />
//       )}

//       {step === 3 && (
//         <TeachingInfo
//           nextStep={nextStep}
//           prevStep={prevStep}
//           updateData={updateData}
//         />
//       )}

//       {step === 4 && (
//         <LocationInfo
//           prevStep={prevStep}
//           updateData={updateData}
//           handleSubmit={handleSubmit}
//         />
//       )}

//     </div>
//   );
// }

// export default ProfileSetup;

import { useState } from "react";
import BasicInfo from "../components/BasicInfo";
import ProfessionalInfo from "../components/ProfessionalInfo";
import TeachingInfo from "../components/TeachingInfo";
import LocationInfo from "../components/LocationInfo";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

function ProfileSetup() {

  const [step, setStep] = useState(1);
  const userId = localStorage.getItem("user_id"); // FIXED
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data
    }));
  };

 const handleSubmit = async () => {
  try {
    console.log("userId:", userId);
    console.log("Original Payload:", formData);

    const payload = new FormData();

    //  append fields correctly
    payload.append("gender", formData.gender);
    payload.append("mobile", formData.mobile);
    payload.append("qualification", formData.qualification);
    payload.append("bio", formData.bio || "");

    payload.append("experience", Number(formData.experience));
    payload.append("state_id", Number(formData.state_id));
    payload.append("city_id", Number(formData.city_id));

    payload.append("language", formData.language?.join(",") || "");
    payload.append("skills", formData.skills?.join(",") || "");

    // optional fields
    if (formData.category) payload.append("category", formData.category);
    if (formData.level) payload.append("level", formData.level);

    // MOST IMPORTANT: file
   if (formData.photo) {
      payload.append("photo", formData.photo);
    }

    // debug
    for (let pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await Api.post(
      `/insert_update_instructor_profile/${userId}`,
      payload,  
    );

    console.log(res.data);
    alert("Profile Created Successfully");

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
};

  return (
    <div className="max-w-xl mx-auto p-5">

      {step === 1 && (
        <BasicInfo nextStep={nextStep} updateData={updateData} />
      )}

      {step === 2 && (
        <ProfessionalInfo
          nextStep={nextStep}
          prevStep={prevStep}
          updateData={updateData}
        />
      )}

      {step === 3 && (
        <TeachingInfo
          nextStep={nextStep}
          prevStep={prevStep}
          updateData={updateData}
        />
      )}

      {step === 4 && (
        <LocationInfo
          prevStep={prevStep}
          updateData={updateData}
          handleSubmit={handleSubmit}
        />
      )}

    </div>
  );
}

export default ProfileSetup;