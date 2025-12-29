import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon, PowerIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import ExportShare from "./ExportShare";
import { useNavigate } from "react-router-dom";

const Header = ({ title, location, aqi }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div className="flex justify-between items-center mb-6 px-4 md:px-6">

      {/* Left: Title + Location/AQI */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Location: {location} | AQI: {aqi ?? "N/A"}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 md:gap-4">

        <ExportShare dashboardId="dashboard" location={location} aqi={aqi} />

        {/* About Button */}
        <button
          onClick={goToAbout}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow transition"
          title="About App"
        >
          <InformationCircleIcon className="h-6 w-6" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700
                     hover:bg-gray-300 dark:hover:bg-gray-600
                     transition shadow"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2
                     bg-red-500 hover:bg-red-600
                     text-white rounded-md shadow transition"
          title="Logout"
        >
          <PowerIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </div>
  );
};

export default Header;
