import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface ImageData {
  image_url: string;
  prediction: string;
  price: number;
}

const ImageComponent = () => {
  const { url } = useAuth();
  const [images, setImages] = useState<ImageData[]>([]);
  const [finished, setFinished] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const [transactionID, setTransactionID] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!transactionID) return;

    const eventSource = new EventSource(`${url}/events/${transactionID}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "END") {
        eventSource.close();
        setFinished(true);
        console.log(totalPrice);

        // fungsi jalanin update transaksi
        ///////////////////
        //fungsi jalanin update transaksi
      } else {
        setImages((prevImages) => [...prevImages, data]);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [transactionID, url]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = document.querySelector<HTMLInputElement>(".file");
    if (!fileInput || !fileInput.files) return;
    const files = fileInput.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    fetch(url + "/uploads", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactionID(data.transaction_id);
        setFinished(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitUpdatePrice = (e) => {
    e.preventDefault();

    if (totalPrice == 0) return 0;
    const requestUrl = `${url}/transaction/${transactionID}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({"price": totalPrice}),
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

  return (
    <div className="flex flex-col justify-center content-center items-center gap-y-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" multiple className="file" />
        <button type="submit">Submit</button>
      </form>
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
  );
};

export default ImageComponent;
