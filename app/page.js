"use client";
import React, { useState, useEffect } from "react";

function calculateEntropy(password) {
  const charset = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    specialChar: ',./<>?;:[]{}-=_+~!@#$%^&*()'
  }

  let charlen = 0;
  for (let c in charset) {
    charlen += charset[c].length;
  }

  let passwordLength = password.length;
  let entropy = Math.log2(Math.pow(charlen, passwordLength));

  return entropy;
}

export default function Home() {
  const [strengthBoxLen, setStrengthBoxLen] = useState("");
  const [strengthBoxColor, setStrengthBoxColor] = useState("");

  const setPasswordStrength = (event) => {
    let point = 0;
    let value = event.target.value;
    let widthPower = ["1%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

    if (value.length >= 12) {
      point += 1;
    }

    let hasLowerCase = /[a-z]/.test(value);
    let hasUpperCase = /[A-Z]/.test(value);
    let hasNumber = /[0-9]/.test(value);
    let hasSpecial = /[^0-9a-zA-z]/.test(value);
    if (hasLowerCase && hasNumber && hasSpecial && hasUpperCase) {
      point += 1;
    }


    let isCommonPassword = false
    if (!isCommonPassword) {
      point += 1;
    }

    let entropy = calculateEntropy(value);
    if (entropy >= 40) {
      point += 1;
    }
    setStrengthBoxLen(widthPower[point]);
    setStrengthBoxColor(colorPower[point]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-tr from-[#55529a] to-[#cdc0e0]">
      <h1 className="text-5xl font-semibold text-purple-600">Website</h1>
      <h2 className="text-3xl font-bold text-black mt-4">Password Strength Checker</h2>
      <input
        type="text"
        placeholder="Enter password"
        className="p-4 border rounded-3xl text-2xl mt-8"
        onChange={setPasswordStrength}
      />
      <div className="mt-8 flex justify-left bg-white w-96 h-8 rounded-md">
        <div
          style={{ width: strengthBoxLen, backgroundColor: strengthBoxColor }}
          className="rounded-md flex flex-row"
        >
          <p className="text-xl mx-auto my-auto">{strengthBoxLen}</p>
        </div>
      </div>
    </main>
  );
}
