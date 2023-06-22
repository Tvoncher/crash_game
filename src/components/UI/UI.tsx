import { FC } from "react";
import { observer } from "mobx-react-lite";
import { rocketStore } from "../../stores/RocketStore";
import { userStore } from "../../stores/UserStore";
import CashOut from "./CashOut/CashOut";
import Launch from "./Launch/Launch";
import Bet from "./Bet/Bet";
import "./UI.css";

const UI: FC = observer(() => {
  return (
    <div className="UI">
      <div className="UI_balance">{userStore.balance.toFixed(2)} $</div>
      {!rocketStore.isFlying && userStore.bet > 0 && <Launch />}
      <Bet />
      {rocketStore.isFlying && !rocketStore.isCashedOut && <CashOut />}
    </div>
  );
});

export default UI;
