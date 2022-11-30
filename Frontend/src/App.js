import "./App.css";
import { Routes, Route } from "react-router-dom";
import "./assets/css/style.min.css.map";

// Dashboard --start
import AdminDashboard from "./dashboard/AdminDashboard";
import AssistedLivingDash from "./dashboard/AssistedLivingDash";
import NursingHomeDash from "./dashboard/NursingHomeDash";
import PhysicianDash from "./dashboard/PhysicianDash";
import NurseDash from "./dashboard/NurseDash";
import ChatDash from "./dashboard/ChatDash";
// Dashboard --end

// Pages --start
import Login from "./pages/Login";
import Nurse from "./pages/Nurse";
import NursingHome from "./pages/NursingHome";
import Physician from "./pages/Physician";
import Chat from "./pages/Chat";
import AssistedLiving from "./pages/AssistedLiving";
// Pages --end

// Physician dashboard-- pages start
import Phynursinghome from "./phydashpages/Phynursinghome";
import Phynurse from "./phydashpages/Phynurse";
// Physician dashboard-- pages end

// Assist dashboard-- pages start
import Assistphy from "./assistdashpages/Assistphy";
import Assistnurse from "./assistdashpages/Assistnurse";
// Assist dashboard-- pages end

// Add-Edit --pages start
import EditAssist from "./pages/EditAssist";
import Addassist from "./pages/Addassist";
import Addnursinghome from "./pages/Addnursinghome";
import Editnursinghome from "./pages/Editnursinghome";
import Addphy from "./pages/Addphy";
import Editphy from "./pages/Editphy";
import Addnurse from "./pages/Addnurse";
import Editnurse from "./pages/Editnurse";
// Add-Edit --pages end

// import Spline from './components/Spline';
import SetupPage from "./pages/SetupPage";
import ProtectedOutlet from "./pages/Protected";

function App() {
  return (
    <div className="App">
      {/* <SetupPage/> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setup-page/:id" element={<SetupPage />} />

        {/* ADMIN RELATED DASHBOARDS ------start */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/assistedliving" element={<AssistedLivingDash />} />
        <Route path="/nursinghome" element={<NursingHomeDash />} />
        <Route path="/physician" element={<PhysicianDash />} />
        <Route path="/nurse" element={<NurseDash />} />
        <Route path="/chat" element={<ChatDash />} />
        {/* ADMIN RELATED DASHBOARDS ------end */}

        {/* Pages -----end */}
        <Route path="/nursepage" element={<Nurse />} />
        <Route path="/nursinghomepage" element={<NursingHome />} />
        <Route path="/physicianpage" element={<Physician />} />
        <Route path="/chatpage" element={<Chat />} />
        <Route path="/assistedlivingpage" element={<AssistedLiving />} />
        {/* Pages ------end */}

        {/* Physician dash pages start */}
        <Route path="/phynursinghome" element={<Phynursinghome />} />
        <Route path="/phynurse" element={<Phynurse />} />
        {/* Physician dash pages end */}

        {/* Assist dash pages start */}
        <Route path="/assistphy" element={<Assistphy />} />
        <Route path="/assistnurse" element={<Assistnurse />} />
        {/* Physician dash pages end */}

        {/* Add And Edit Pages */}
        <Route path="/addassist" element={<Addassist />} />
        <Route path="/editassist" element={<EditAssist />} />
        <Route path="/addnurse" element={<Addnurse />} />
        <Route path="/editnurse/:id" element={<Editnurse />} />
        <Route path="/addphy" element={<Addphy />} />
        <Route path="/editphy" element={<Editphy />} />
        <Route path="/addnursinghome" element={<Addnursinghome />} />
        <Route path="/editnursinghome" element={<Editnursinghome />} />
      </Routes>
    </div>
  );
}

export default App;
