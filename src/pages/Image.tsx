import { MouseEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import NavbarGroup from "../components/NavbarGroup";
import SidebarGroup from "../components/SidebarGroup";

interface ImageData {
  image_url: string;
  prediction: string;
  price: number;
}

// support header untuk event source
// class CustomEventSource {
//   constructor(url: string, headers: HeadersInit) {
//     this.eventSource = new EventSource(url);
//     this.headers = headers;
//   }

//   eventSource: EventSource;
//   headers: HeadersInit;

//   onmessage(callback: (event: MessageEvent) => void) {
//     this.eventSource.onmessage = callback;
//   }

//   onerror(callback: (event: Event) => void) {
//     this.eventSource.onerror = callback;
//   }

//   close() {
//     this.eventSource.close();
//   }
// }

const ImageComponent = () => {
  const esp_url = "https://192.168.18.130";
  const { url } = useAuth();
  const [images, setImages] = useState<ImageData[]>([]);
  const [finished] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const [transactionID, setTransactionID] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!transactionID) return;

    // const headers = {
    //   "ngrok-skip-browser-warning": "69420",
    //   "Authorization": `Bearer ${token}`,
    // };

    const eventSource = new EventSource(`${url}/events/${transactionID}`);

    eventSource.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      setImages((prevImages) => [...prevImages, data]);
      // if (data.status === "END") {
      //   eventSource.close();
      //   setFinished(true);
      //   console.log(totalPrice);

      //   // fungsi jalanin update transaksi
      //   ///////////////////
      //   //fungsi jalanin update transaksi
      // } else {
      //   setImages((prevImages) => [...prevImages, data]);
      // }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [transactionID, url]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const fileInput = document.querySelector<HTMLInputElement>(".file");
  //   if (!fileInput || !fileInput.files) return;
  //   const files = fileInput.files;
  //   const formData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("file", files[i]);
  //   }

  //   fetch(url + "/uploads", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTransactionID(data.transaction_id);
  //       setFinished(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const submitUpdatePrice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (totalPrice == 0) return 0;
    const requestUrl = `${url}/transaction/${transactionID}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({ price: totalPrice }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(requestUrl, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages([]);
        setTotalPrice(0);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(images);
    const totalPrice = images.reduce(
      (acc, value) => acc + Number(value.price),
      0
    );
    setTotalPrice(totalPrice);
  }, [images]);

  useEffect(() => {
    const beginTransaction = async () => {
      try {
        const baseUrl = `${url}/api/transaction/init`;
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }

        const response = await fetch(baseUrl, options);
        if (!response.status) throw Error("failed begin transaction");
        const message = await response.json();
        console.log(message);

        setTransactionID(message.generateID);
      } catch(err) {
        console.error(err);
      }
    }

    beginTransaction();
  }, [])

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
    <div className="flex bg-gray-100 gap-x-6 p-4 h-screen overflow-y-auto">
      <SidebarGroup />
      <div className="flex-[80%] flex flex-col gap-y-4">
        <NavbarGroup />
        {images.length > 0 && (
        <div className="image-gallery">
          {images.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-x-4"
            >
              <img
                src={item.image_url}
                alt={`Prediction: ${item.prediction}`}
                className="w-[3rem] h-[3rem]"
              />
              <p>{item.prediction}</p>
              <p>{item.price}</p>
              {/* <p>{item.price}</p> */}
            </div>
          ))}
        </div>
      )}
      {finished && <p>{totalPrice}</p>}
      <button type="submit" onClick={submitUpdatePrice}>
        Tarik ke wallet
      </button>
      </div>
    </div>
  );
};

export default ImageComponent;
