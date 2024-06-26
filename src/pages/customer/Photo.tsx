import { useEffect } from "react";
import SidebarGroup from "../../components/SidebarGroup";
// import { useAuth } from "../../hooks/useAuth";

const Photo = () => {
  const esp_url = "http://192.168.18.130";
  // const { url } = useAuth();
  // const token = localStorage.getItem("token");

  

  useEffect(() => {
    const sendTokenToESP32CAM = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${esp_url}/api/token`, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: token,
        });
        const response = await res.json();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    sendTokenToESP32CAM();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarGroup />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-200 rounded-lg">←</button>
            <button className="p-2 bg-gray-200 rounded-lg">→</button>
            <button className="p-2 bg-gray-200 rounded-lg">⟳</button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border rounded-lg"
            />
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Photo;
