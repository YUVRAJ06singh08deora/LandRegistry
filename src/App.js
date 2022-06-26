import "./App.css";
import * as config from "./library/config.json";
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
      {!loader && <div className="value">{value}</div>}
      {loader && <Loader />}
      <p>Current Value in Storage</p>
      
      <form
        onSubmit={async (e) => {
          await handleEvent(e, update,
        {
            address:e.target.address.value,
            annualIncome : e.target.annualIncome.value,
            dob: e.target.dob.value,
            empStatus:e.target.empStatus.value,
            gender: e.target.gender.value,
            insurancePlan:e.target.insurancePlan.value,
            name:e.target.name.value,
            nationality: e.target.nationality.value,
            phone: e.target.phone.value,
            aadhar: e.target.aadhar.value,
        }
            );
        }}
      >
        <label>Name : </label>
        <input type="text" name="name" step="1" /><br></br>
        <label>Date Of Birth : </label>
        <input type="text" name="dob" step="1" /><br></br>
        <label>Gender : </label>
        <input type="text" name="gender" step="1" /><br></br>
        <label>Aadhar Number : </label>
        <input type="number" name="aadhar" step="1" /><br></br>
        <label> Employement Status : </label>
        <input type="text" name="empStatus" step="1" /><br></br>
        <label> Annual Income Status : </label>
        <input type="text" name="annualIncome" step="1" /><br></br>
        <label>Insurance Plan : </label>
        <input type="text" name="insurancePlan" step="1" /><br></br>
        <label>Nationality : </label>
        <input type="text" name="nationality" step="1" /><br></br>
        <label>Address : </label>
        <input type="text" name="address" step="1" /><br></br>
        <label>Phone : </label>
        <input type="text" name="phone" step="1" /><br></br>
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
