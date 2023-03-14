import Spinner from "react-bootstrap/Spinner";
import { constants } from "../../useFullItems/constants";
import { useAppSelector } from "../../useFullItems/redux";

export function GlobalLoader() {
  const show = useAppSelector((store) => store.loaderState.values);
  return (
    <div
      className={`${
        show ? "d-flex" : "d-none"
      } justify-content-center align-items-center`}
      style={{
        backgroundColor: constants.transparentBackgroundColor,
        position: "fixed",
        width: "100%",
        height: "100vh",
        zIndex: 1,
        top: 0,
      }}
    >
      <Spinner variant="light" />
    </div>
  );
}
