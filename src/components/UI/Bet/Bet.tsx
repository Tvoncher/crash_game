import { FC, useCallback, useState } from "react";
import { userStore } from "../../../stores/UserStore";
import { rocketStore } from "../../../stores/RocketStore";
import { observer } from "mobx-react-lite";
import "./Bet.css";

const Bet: FC = observer(() => {
  const [bet, setBet] = useState(1);

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
    <div className="Bet_container">
      <div
        className="possibleProfit"
        style={rocketStore.isFlying ? { marginBottom: "250px" } : {}}
      >
        {userStore.bet.toFixed(2) + " $"}
      </div>

      {!rocketStore.isFlying && (
        <div className="input_container">
          <input
            className="input"
            type="number"
            min={0}
            placeholder={`${bet}`}
            onChange={handleChangeBet}
          />
          <button
            className="placeBet pulsing neon_blue"
            onClick={handlePlaceBet}
          >
            PLACE BET
          </button>
        </div>
      )}
    </div>
  );
});

export default Bet;
