import Spinner from "react-bootstrap/Spinner";

export function Loader({ show = true }: { show?: boolean }) {
  return (
    <div
      className={`${
        show ? "d-flex" : "d-none"
      } justify-content-center align-items-center`}
      style={{ height: "100vh", backgroundColor: "#3c3c3c" }}
    >
      <Spinner variant="light" animation="grow" />
    </div>
  );
}
