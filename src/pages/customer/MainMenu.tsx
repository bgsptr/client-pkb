import { useEffect } from "react";

const MainMenu = () => {
    useEffect(() => {
        const sendTokenToESP32CAM = async () => {            
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://192.168.18.130/api/set-token', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ token })
                });
                const response = res.json();
                console.log(response);
            } catch(err) {
                console.log(err);
            }
          };
          sendTokenToESP32CAM();
    }, [])

    return (
        <div>MainMenu</div>
    )
};

export default MainMenu;