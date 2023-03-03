import { ConnectWallet } from "@thirdweb-dev/react";
// import "./styles/Home.css";
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from "./components";
import "./index.css";

import { Profile, StartupDetails, CreateStartup , Ghar} from "./pages";
const showGhar = () => {
  if (window.location.pathname === "/") {
    return <Ghar />
  }
}

const showProfile = () => {
  if (window.location.pathname === "/Profile") {
    return <Ghar />
  }
}

const showCreateStartup = () => {
  if (window.location.pathname === "/CreateStartup") {
    return <CreateStartup />
  }
}

const showStartupDetails = () => {
  if (window.location.pathname === "/StartupDetails") {
    return <StartupDetails />
  }
}

export default function Home() {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
       
      {showGhar()}
      {showProfile()}
      {showCreateStartup()}
      {showStartupDetails()}
    
        {/* <Routes>
          <Route path="/" component={Ghar} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createStartup" element={<CreateStartup />} />
          <Route path="/StartupDetails" element={<StartupDetails />} />
        </Routes> */}
      </div>
    </div>
  );
};
