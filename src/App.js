import "./App.css";

import React, { useEffect, useState } from "react";
import { add, getValue, multiply, update } from "./library/interact";
import { connectWalletBeacon, setup } from "./library/connect";

const App = () => {
  const [Tezos, setTezos] = useState(undefined);
  const [status, setStatus] = useState("No Operations Performed");
  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    console.log("run");
    setup().then(setTezos).catch(console.error);
  }, []);

  useEffect(() => {
    if (Tezos === undefined) return;
    getValue(Tezos)
      .then(setValue)
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      getValue(Tezos).then(setValue).catch(console.error);
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  const handleEvent = async (e, func, params) => {
    e.preventDefault();
    try {
      const wal = await connectWalletBeacon();
      Tezos.setWalletProvider(wal);
      setLoader(true);
      await func(Tezos, params, setStatus);
      await getValue(Tezos)
        .then(setValue)
        .then(() => setLoader(false));
    } catch (err) {
      console.error(err);
      alert("Couldn't connect wallet");
    }
  };

  return (
    <div className="App">
      <h1>Get Insured with Chain</h1>
      {/* {!loader && <div className="value">{value}</div>}
      {loader && <Loader />} */}
      <p>Current Value in Storage</p>
      <form
        onSubmit={async (e) => {
          await handleEvent(e, update,
        {
            time:e.target.time.value,
            aid : e.target.aid.value,
            date: e.target.date.value,
            Name_date:e.target.Name_date.value,
            loo: e.target.loo.value,
            qts:e.target.qts.value,
            Aname:e.target.Aname.value,
            APhoneNumber: e.target.APhoneNumber.value,
            Mname: e.target.Mname.value,
            qty:e.target.qty.value,
            Quality:e.target.Quality.value,
            comment:e.target.comment.value,
        }
            );
        }}
      >
        <label>Phonenumber : </label>
        <input type="number" name="APhoneNumber" step="1" /><br></br>
        <label>Name : </label>
        <input type="text" name="Aname" step="1" /><br></br>
        <label>Mineral Name : </label>
        <input type="text" name="Mname" step="1" /><br></br>
        <label>Name Date : </label>
        <input type="text" name="Name_date" step="1" /><br></br>
        <label>Quality : </label>
        <input type="text" name="Quality" step="1" /><br></br>
        <label>Aadhar : </label>
        <input type="number" name="aid" step="1" /><br></br>
        <label>Comment : </label>
        <input type="text" name="comment" step="1" /><br></br>
        <label>Date : </label>
        <input type="text" name="date" step="1" /><br></br>
        <label>Location : </label>
        <input type="text" name="loo" step="1" /><br></br>
        <label>Result : </label>
        <input type="text" name="qts" step="1" /><br></br>
        <label>Quantity : </label>
        <input type="text" name="qty" step="1" /><br></br>
        <label>Time : </label>
        <input type="text" name="time" step="1" /><br></br>
        <input type="submit" value="addResourcedata" />
      </form>
      {/* <form
        onSubmit={async (e) => {
          await handleEvent(e, multiply, e.target.mul.value);
        }}
      >
        <label>Multiply : </label>
        <input type="number" name="mul" step="1" />
        <input type="submit" value="Multiply" />
      </form>
      <form
        onSubmit={async (e) => {
          await handleEvent(e, add, {
            a: e.target.a.value,
            b: e.target.b.value,
          });
        }}
      >
        <label>Add : </label>
        <input type="number" name="a" step="1" />
        <input type="number" name="b" step="1" />
        <input type="submit" value="Add" />
      </form>
      <p dangerouslySetInnerHTML={{ __html: "Tx Status : " + status }}></p> */}
    </div>
  );
};

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        display: "block",
        marginTop: "3vw",
        marginBottom: "-1vw",
      }}
      width="3vw"
      height="3vw"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default App;
