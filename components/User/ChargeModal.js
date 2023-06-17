import React, { useState } from "react";
import BankModal from "./BankModal";
import Kakaopay from "./Kakaopay";
import Munsang from "./Munsang";
export default function ChargeModal({ setModal, user, data }) {
  const [state, setState] = useState(
    data.setting.bank === "0"
      ? data.setting.pay === "0"
        ? data.setting.munsang === "0"
          ? ""
          : "munsang "
        : "pay"
      : "bank"
  );
  switch (state) {
    case "bank":
      return (
        <BankModal
          setModal={setModal}
          user={user}
          setState={setState}
          data={data}
        />
      );

    case "pay":
      return (
        <Kakaopay
          setModal={setModal}
          user={user}
          setState={setState}
          data={data}
        />
      );
    case "munsang":
      return (
        <Munsang
          setModal={setModal}
          user={user}
          setState={setState}
          data={data}
        />
      );
    default:
      return (
        <BankModal
          setModal={setModal}
          user={user}
          setState={setState}
          data={data}
        />
      );
      break;
  }
}
