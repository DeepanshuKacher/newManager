import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import { useAppSelector } from "../../../../useFullItems/redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  showSearchBar: boolean;
  placeholderText: string;
  setSearchString: (para: string) => void;
}

export const NavBar = ({
  showSearchBar,
  placeholderText,
  setSearchString,
}: Props) => {
  const router = useRouter();

  const sectionName = useAppSelector(
    (store) => store.dishesSlices.value.sectionName
  );

  return (
    <Container className="py-1 border-bottom" fluid>
      <Row>
        <Col>
          <Nav>
            <Nav.Item
              onClick={() =>
                router.push("/customize_restaurant/dishes/section")
              }
            >
              <Nav.Link eventKey="link-1">Sections</Nav.Link>
            </Nav.Item>
            <Nav.Item
              id="sectionName"
              onClick={() =>
                router.push(`/customize_restaurant/dishes/${sectionName}`)
              }
            >
              <Nav.Link eventKey="link-2">
                {sectionName || "Section Name"}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">Option 3</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-4">Option 4</Nav.Link>
            </Nav.Item>
          </Nav>
          {showSearchBar && (
            <FormControl
              className="d-sm-none mt-1"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder={placeholderText}
              onChange={(e) => setSearchString(e.target.value)}
            />
          )}
        </Col>
        {showSearchBar && (
          <Col sm={5} className="d-none d-sm-block">
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder={placeholderText}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};
