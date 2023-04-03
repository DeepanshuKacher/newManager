import React, { useState } from "react";
/* import bootstrap */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosPostFunction } from "../../../useFullItems/axios";
import { useRouter } from "next/router";
import { loadRestaurantDetail } from "../../../useFullItems/functions";

interface Props {
  handleClose: () => void;
}

export const AddEmployeeModal = (props: Props) => {
  const { handleClose } = props;
  const router = useRouter();
  const [passPortPhoto, setPassportPhoto] = useState<File>();
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  // const [dateofbirth, setdateofbirth] = useState<Date>(new Date());
  // const [gender, setGender] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [idProofPhoto, setIdProofPhoto] = useState<File>();

  // useEffect(() => {
  //   console.log(new Date(dateofbirth));
  //   console.log(dataFormatter(dateofbirth));
  // }, [dateofbirth]);

  // const formatDate = (date: Date) => {
  //   let d = date,
  //     month = "" + (d.getMonth() + 1),
  //     day = "" + d.getDate(),
  //     year = d.getFullYear();

  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;

  //   return [year, month, day].join("-");
  // };

  const convertURL = (image: File | undefined) => {
    if (image) return URL.createObjectURL(image);
    else return "/images/default_food.jpg";
  };

  const workerType =
    router.pathname === "/manage_staff/chef"
      ? "chefs"
      : router.pathname === "/manage_staff/waiter"
      ? "waiters"
      : null;

  const workerFormSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    // formData.append("DOB", dateofbirth?.toString());
    formData.append("MobileNumber", mobileNumber);
    formData.append("address", localAddress);
    if (passPortPhoto) formData.append("passportImage", passPortPhoto);
    if (idProofPhoto) formData.append("idProof", idProofPhoto);

    if (workerType) {
      axiosPostFunction({
        data: formData,
        parentUrl: workerType,
        loader: true,
        thenFunction: loadRestaurantDetail,
      });
    }

    handleClose();
  };

  return (
    <Modal
      scrollable
      centered
      show={true}
      onHide={() => alert("Modal Closed")}
      backdrop="static"
    >
      <Modal.Header>
        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
        <h3>
          Adding{" "}
          {workerType === "chefs"
            ? "Chef"
            : workerType === "waiters"
            ? "Waiter"
            : "Nothing"}
        </h3>
        <Button variant="success" type="submit" form="workerForm">
          Save
        </Button>
      </Modal.Header>
      <Modal.Body className="p-3">
        <Form
          method="post"
          id="workerForm"
          onSubmit={(e) => {
            e.preventDefault();
            workerFormSubmit();
          }}
        >
          <Row className="mb-2">
            <Col className="border position-relative d-flex justify-content-center align-items-center">
              <img
                src={convertURL(passPortPhoto)}
                height={230}
                alt="Worker Photo"
                className="border"
                style={{ objectFit: "contain", padding: 2 }}
                width={230}
              />
              {/* <input
                type="file"
                id="changePassportImage"
                className="d-none"
                accept="image/*"
                name="passpost-photo"
                onChange={(e) => {
                  const imageFile = e?.target?.files?.[0];
                  if (imageFile) {
                    if (imageFile.size > 100000)
                      alert("Image Size should be less than 100KB");
                    else setPassportPhoto(imageFile);
                  }
                }}
              /> */}
              <input
                type="file"
                // required
                className="position-absolute bottom-0 start-0"
                onChange={(e) => {
                  const imageFile = e?.target?.files?.[0];
                  if (imageFile) setPassportPhoto(imageFile);
                }}
              />
              {/* <button
                className="position-absolute bottom-0 end-0"
                onClick={() => {
                  document.getElementById("changePassportImage")?.click();
                }}
              >
                Change
              </button> */}
            </Col>
            <Col>
              <Form.Control
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2"
                required
              />
              <Form.Control
                placeholder="Mobile Number"
                type="text"
                className="mb-2"
                value={mobileNumber}
                pattern="[6789][0-9]{9}"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              {/* <Form.Label>
                Date of birth
                <Form.Control
                  placeholder="Date Of birth"
                  type="date"
                  required
                  value={dateofbirth.toISOString()}
                  onChange={(e) => setdateofbirth(new Date(e.target.value))}
                />
              </Form.Label> */}
              {/* <Form.Check
                type="radio"
                label="Male"
                value="Male"
                name="formHorizontalRadios"
                checked={gender === "Male"}
                onChange={(e) => setGender(e?.target?.value)}
              />
              <Form.Check
                type="radio"
                label="Female"
                value="Female"
                name="formHorizontalRadios"
                checked={gender === "Female"}
                onChange={(e) => setGender(e?.target?.value)}
              />
              <Form.Check
                type="radio"
                label="Other"
                value="Other"
                name="formHorizontalRadios"
                checked={gender === "Other"}
                onChange={(e) => setGender(e?.target?.value)}
              /> */}
              <Form.Control
                as="textarea"
                placeholder="Local address"
                aria-label="With textarea"
                value={localAddress}
                onChange={(e) => setLocalAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="border position-relative d-flex justify-content-center align-items-center">
              <img
                src={convertURL(idProofPhoto)}
                height={400}
                width={500}
                alt="id proof image"
                className="border"
              />
              <input
                type="file"
                // required
                className="position-absolute bottom-0 start-0"
                onChange={(e) => {
                  const imageFile = e?.target?.files?.[0];
                  if (imageFile) setIdProofPhoto(imageFile);
                }}
              />

              {/* <button className="position-absolute bottom-0 end-0">
                Change
              </button> */}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
