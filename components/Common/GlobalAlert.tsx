import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { constants } from "../../useFullItems/constants";
import {
  useAppSelector,
  actionTypes,
  useAppDispatch,
} from "../../useFullItems/redux";

function GlobalAlert() {
  const { text, title, varient } = useAppSelector((store) => store.globalAlert);
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 20,
        backgroundColor: constants.transparentBackgroundColor,
        position: "fixed",
        display: text ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert show={true} variant={varient} className="w-50">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{text}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => dispatch(actionTypes.resetAlert())}
            variant="outline-success"
          >
            I understand
          </Button>
        </div>
      </Alert>
    </div>
  );
}

export { GlobalAlert };
