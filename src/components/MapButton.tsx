import React, { useEffect, useState } from "react";
import { useEvent } from "../hooks/useEvent";

const MapButton = () => {
  const { mark, location, detailEvent } = useEvent();

  //   CREATE TABLE IF NOT EXISTS events(
  //     id VARCHAR(255) NOT NULL,
  //     event_name VARCHAR(255) NOT NULL,
  //     from_date VARCHAR(255) NOT NULL,
  //     to_date VARCHAR(255) NOT NULL,
  //     event_location VARCHAR(255) NOT NULL,
  //     descriptions VARCHAR(255),
  //     /*lat and lng*/
  //     PRIMARY KEY (id)
  // )

  const [evt, setEvt] = useState({
    id: "",
    event_name: "",
    from_date: "",
    starter_time: "",
    end_time: "",
    event_location: "",
    descriptions: "",
    lat_dest: "",
    lng_dest: "",
    address: [],
    guests: []
  });

  // const [address, setAddress] = useState({
  //   street: "",
  //   district: "",
  //   regency: "",
  //   province: "",
  //   postal_code: "",
  //   country: "",
  // })

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEvt((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const base_url = "http://localhost:3000";

  useEffect(() => {
    if (mark != null) {
      const { srcPoint, destPoint } = mark

      if (destPoint != null) {
        const { lat, lng } = destPoint
        console.log(location)
        const { label } = location
        const data = label.split(", ")
        console.log(data)

        let address = []
        for (let i = 0; i < data.length; i++) {
          if (i == 4) {
            continue
          }
          address.push(data[i])
        }
        setEvt(data => ({
          ...data,
          lng_dest: lat,
          lat_dest: lng,
          event_location: label,
          address: address,
        }))
        console.log(evt)
      }
    }
  }, [mark, location])

  const sendEvent = () => {
    // const object = {
    //   mark: mark,
    //   location: location,
    //   detail_event: detailEvent,
    // };

    const sendEvent = async (evt) => {
      console.log(evt);
      try {
        console.log(evt);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evt),
        };
        console.log("sending event data...");
        const response = await fetch(base_url + "/event", options);
        await response.json();
        console.log("success post");
      } catch (err) {
        console.error(err);
      }
    };

    sendEvent(evt);
  };

  return (
    <div>
      <div>
        <input type="text" name="event_name" onChange={inputHandler} />
        <input type="text" name="descriptions" onChange={inputHandler} />
        <input type="date" name="from_date" onChange={inputHandler} />
        <input type="text" name="starter_time" onChange={inputHandler} />
        <input type="text" name="end_time" onChange={inputHandler} />
      </div>
      <button type="submit" onClick={sendEvent}>
        Click
      </button>
    </div>
  );
};

export default MapButton;
