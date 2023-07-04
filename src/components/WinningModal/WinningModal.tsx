import { FC } from "react";
import { userStore } from "../../stores/UserStore";
import "./WinningModal.css";

const WinningModal: FC = () => {
  const profit = userStore.bet.toFixed(2);

  return <div className="WinningModal">{`You won ${profit} $ !`}</div>;
};

export default WinningModal;
