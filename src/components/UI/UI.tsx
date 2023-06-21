import { FC } from "react";
import { observer } from "mobx-react-lite";
import { rocketStore } from "../../stores/RocketStore";
import { userStore } from "../../stores/UserStore";
import CashOut from "./CashOut/CashOut";
import Launch from "./Launch/Launch";
import PlaceBet from "./PlaceBet/PlaceBet";
import "./UI.css";

const UI: FC = observer(() => {
  return (
    <div className="UI">
      <div className="UI_balance">{userStore.balance} $</div>
      <div className="UI_userBet">{userStore.bet.toFixed(2) + " $"}</div>
      {rocketStore.isFlying && !rocketStore.isCashedOut && <CashOut />}
      {!rocketStore.isFlying && userStore.bet > 0 && <Launch />}
      {!rocketStore.isFlying && <PlaceBet />}
    </div>
  );
});

export default UI;
