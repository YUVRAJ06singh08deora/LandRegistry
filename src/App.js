import "./App.css";
import * as config from "./library/config.json";
import React, { useEffect, useState } from "react";
import { add, getValue, multiply, update } from "./library/interact";
import { connectWalletBeacon, setup } from "./library/connect";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
// const encryptWithAES = (text, passphrase) => {
//   return AES.encrypt(text, passphrase).toString();
// };

// const decryptWithAES = (ciphertext, passphrase) => {
//   const bytes = AES.decrypt(ciphertext, passphrase);
//   const originalText = bytes.toString(Utf8);
//   return originalText;
// };
 
const Styles = styled.div`
 background: lavender;
 padding: 20px;

 h1 {
   border-bottom: 1px solid white;
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: white;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 30px 50px;
 }

 input {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
 }

 label {
   color: #3d3d3d;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }

 .submitButton {
   background-color: #6976d9;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
`;
 const App = () => {
  const [Tezos, setTezos] = useState(undefined);
  const [status, setStatus] = useState("No Operations Performed");
  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(true);
  const { register, handleSubmit } = useForm();
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
     <h1>Land Registry Using Blockchain</h1>
      <Styles>
      <form
        onSubmit={async (e) => {
          await handleEvent(e, update,
        {
          link: e.target.link.value,
          lno:e.target.lno.value,
          gender: e.target.gender.value,
          name: e.target.name.value,
          rate: e.target.rate.value,
          time:e.target.time.value,
          uid:e.target.uid.value,
          PhoneNumber: e.target.PhoneNumber.value,
          address: e.target.address.value,
          Date1:e.target.Date1.value,
          comments: e.target.comments.value,
          fathersName: e.target.fathersName.value,
          age: e.target.age.value,
          area: e.target.area.value,
        }
            );
        }}
      >
        <label>Name : </label>
        <input type="text" name="name" step="1" /><br></br>
        <label>Fathers Name : </label>
        <input type="text" name="fathersName" step="1" /><br></br>
        <label>Gender : </label>
        <input type="text" name="gender" step="1" /><br></br>
        <label>Aadhar Number : </label>
        <input type="number" name="uid" step="1" /><br></br>
        <label> Age : </label>
        <input type="number" name="age" step="1" /><br></br>
        <label>Phone : </label>
        <input type="number" name="PhoneNumber" step="1" /><br></br>
        <b>Enter the land Property Details</b>
        <label> Land no./ Khasra No. :</label>
        <input type="text" name="lno" step="1" /><br></br>
        <label>Area in sqms : </label>
        <input type="text" name="area" step="1" /><br></br>
        <label>Address : </label>
        <input type="text" name="address" step="1" /><br></br>
        <label>Date of Registry : </label>
        <input type="text" name="Date1" step="1" /><br></br>
        <label>Time of Registry : </label>
        <input type="text" name="time" step="1" /><br></br>
        <label>Rate per sqm of Land : </label>
        <input type="text" name="rate" step="1" /><br></br>
        <label>Link to document containing Satellite Map image of land : </label>
        <input type="text" name="link" step="1" /><br></br>
        <label>Comments : </label>
        <input type="text" name="comments" step="1" /><br></br>
        <input type="submit" value="submit" />
      </form>
      </Styles>
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