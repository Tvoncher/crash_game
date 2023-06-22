import { FC, useCallback } from "react";
import { userStore } from "../../../stores/UserStore";
import { rocketStore } from "../../../stores/RocketStore";
import "./CashOut.css";

const CashOut: FC = () => {
  const handleTakeMoney = useCallback(() => {
    userStore.setBalance(+userStore.bet.toFixed(2));
    rocketStore.setIsCashedOut(true);
    alert(`You won ${userStore.bet.toFixed(2)} $ !`);
  }, []);

  return (
    <button className="cashOut pulsing neon_green" onClick={handleTakeMoney}>
      CASH OUT
    </button>
  );
};

export default CashOut;
