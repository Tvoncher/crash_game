import { FC, useCallback, useState } from "react";
import { userStore } from "../../../stores/UserStore";
import "./PlaceBet.css";

const PlaceBet: FC = () => {
  const [bet, setBet] = useState(0);

  const handleChangeBet = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBet(() => +e.target.value);
    },
    [bet]
  );

  const handlePlaceBet = useCallback(() => {
    userStore.placeBet(bet);
  }, [bet]);

  return (
    <div className="placeBet_container">
      <input
        className="input"
        type="number"
        placeholder="0 $"
        onChange={handleChangeBet}
      />
      <button className="placeBet" onClick={handlePlaceBet}>
        PLACE BET
      </button>
    </div>
  );
};

export default PlaceBet;
