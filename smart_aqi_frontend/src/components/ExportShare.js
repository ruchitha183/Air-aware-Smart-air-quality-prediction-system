import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Share2, Download } from 'lucide-react';
import { getHealthInfo } from "../utils/healthInfo"; // ✅ shared health logic

const ExportShare = ({ dashboardId, location, aqi }) => {
  const [loading, setLoading] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [shareRendered, setShareRendered] = useState(false);
  const shareRef = useRef(null);

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Smooth fade-in/fade-out
  useEffect(() => {
    if (shareVisible) setShareRendered(true);
    else {
      const timer = setTimeout(() => setShareRendered(false), 200);
      return () => clearTimeout(timer);
    }
  }, [shareVisible]);

  // 🔹 Export dashboard as PDF
  const handleExportPDF = async () => {
    setLoading(true);
    const element = document.getElementById(dashboardId);

    if (!element) {
      setLoading(false);
      alert("Dashboard not found!");
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${location}_AQI_Dashboard.pdf`);
    } catch (err) {
      console.error("Error exporting PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Build share message including health info
  const buildShareMessage = () => {
    const health = getHealthInfo(aqi);

    return `
🌫 Air Quality Update

📍 Location: ${location}
📊 AQI: ${aqi} (${health.category})

⚠ Health Recommendation:
${health.recommendation}

🛡 Precautions:
${health.precaution}

Stay safe 🌱
`;
  };

  // 🔹 Share handlers
  const shareWhatsApp = () => {
    const message = buildShareMessage();
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    setShareVisible(false);
  };

  const shareTwitter = () => {
    const message = buildShareMessage();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    setShareVisible(false);
  };

  const shareEmail = () => {
    const subject = `Air Quality Alert for ${location}`;
    const body = buildShareMessage();
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShareVisible(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* 🔹 Share button */}
      <div className="relative" ref={shareRef}>
        <button
          onClick={() => setShareVisible(!shareVisible)}
          className="flex items-center gap-1 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition shadow"
          title="Share Dashboard"
        >
          <Share2 className="w-5 h-5" /> Share
        </button>

        {shareRendered && (
          <div
            className={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col gap-2 p-3 z-50
              transition-opacity duration-200
              ${shareVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <button
              onClick={shareWhatsApp}
              className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              WhatsApp
            </button>

            <button
              onClick={shareTwitter}
              className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Twitter
            </button>

            <button
              onClick={shareEmail}
              className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Email
            </button>
          </div>
        )}
      </div>

      {/* 🔹 Download PDF */}
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow"
        title="Download PDF"
      >
        <Download className="w-5 h-5 text-gray-700 dark:text-white" />
        {loading ? "Exporting..." : "Download"}
      </button>
    </div>
  );
};

export default ExportShare;
