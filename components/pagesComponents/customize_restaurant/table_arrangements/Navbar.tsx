import { useEffect, useRef, useState } from "react";
import Head from "next/head";
/* bootstrap */
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { axiosPostFunction } from "../../../../useFullItems/axios";

interface Props {
  // text: string;
  // setText: (e: string) => void;
  setShowTableAddModal: () => void;
  toggleAccordion: (para: boolean) => void;
}

export const Navbar = (props: Props) => {
  const {
    // setText, text,
    setShowTableAddModal,
    toggleAccordion,
  } = props;
  // const [addSection, setAddSection] = useState(false);
  const [toggleCollapseExpand, setToggleCollapseExpand] = useState(true);

  return (
    <>
      <Container
        aria-label="small size nav"
        fluid
        className="mt-2 d-flex d-md-none flex-row justify-content-end"
      >
        {/* <FormControl
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter section name"
          style={{ width: "20rem" }}
          type="text"
          size="sm"
        /> */}
        {/* {addSection ? (
          <Button size="sm" style={{ marginLeft: 5 }} onClick={addTableSection}>
            Submit
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => setAddSection(true)}
            style={{ marginLeft: 5 }}
          >
            Add section
          </Button>
        )} */}
        <Button
          size="sm"
          onClick={setShowTableAddModal}
          style={{ marginLeft: 5 }}
        >
          Add section
        </Button>
        {/* {toggleCollapseExpand ? (
          <Button
            onClick={() => {
              setToggleCollapseExpand(!toggleCollapseExpand);
              toggleAccordion(true);
            }}
            size="sm"
            style={{ marginLeft: 5 }}
            variant="outline-primary"
          >
            Expand all
          </Button>
        ) : (
          <Button
            onClick={() => {
              setToggleCollapseExpand(!toggleCollapseExpand);
              toggleAccordion(false);
            }}
            style={{ marginLeft: 5 }}
            size="sm"
            variant="outline-primary"
          >
            Collapse all
          </Button>
        )} */}
      </Container>
      <Container
        aria-label="big size nav"
        fluid
        className="mt-2 d-none d-md-flex flex-row justify-content-end"
      >
        {/* <FormControl
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter section name"
          style={{ width: "20rem" }}
          type="text"
        /> */}
        {/* {addSection ? (
          <Button style={{ marginLeft: 5 }} onClick={addTableSection}>
            Submit
          </Button>
        ) : (
          <Button onClick={() => setAddSection(true)} style={{ marginLeft: 5 }}>
            Add section
          </Button>
        )} */}
        <Button style={{ marginLeft: 5 }} onClick={setShowTableAddModal}>
          Add section
        </Button>
        {/* <Button
          style={{ marginLeft: 5 }}
          variant="outline-primary"
          onClick={() => toggleAccordion(false)}
        >
          Collapse all
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          onClick={() => toggleAccordion(true)}
          variant="outline-primary"
        >
          Expand all
        </Button> */}
      </Container>
    </>
  );
};
