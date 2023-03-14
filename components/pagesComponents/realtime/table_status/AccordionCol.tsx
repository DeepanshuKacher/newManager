import { useState, useEffect } from "react";
/* bootstrap */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { Table } from "../../../../interfaces";
import {
  actionTypes,
  useAppDispatch,
  useAppSelector,
} from "../../../../useFullItems/redux";
import { useRouter } from "next/router";

interface Props {
  tableInfo: Table;
  setDataToModal: (para: Table) => void;
  setDataToDelete: (para: Table) => void;
  toggleOpenClose: boolean;
}

export const AccordionCol = (props: Props) => {
  /* initialization */
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { tableInfo, setDataToModal, setDataToDelete, toggleOpenClose } = props;

  /* states or store */
  const [tableNumbers, setTableNumbers] = useState<number[]>([]);

  const tableStatus = useAppSelector(
    (store) => store.tableStatus.tableDetail
  )?.[tableInfo.id];

  /* useEffect */
  useEffect(() => {
    (function () {
      const temp: number[] = [];

      for (let i = tableInfo.startNumber; i <= tableInfo.endNumber; i++) {
        temp.push(i);
      }
      setTableNumbers(temp);
    })();
  }, []);

  /* functions */

  return (
    <Col>
      <Accordion defaultActiveKey={toggleOpenClose ? "0" : ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="d-flex justify-content-evenly">
            {tableInfo.name}
          </Accordion.Header>
          <Accordion.Body>
            <Container fluid>
              <Row xs={4} sm={6} md={4} lg={6} xl={4} xxl={6} className="gx-3">
                {tableNumbers.map((tNumber) => {
                  return (
                    <Col key={tNumber}>
                      <p
                        className="p-3 border d-flex justify-content-center"
                        style={{
                          backgroundColor: tableStatus?.[tNumber]
                            ? "purple"
                            : "green",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch(
                            actionTypes.updateBillingTable({
                              tableNumber: tNumber,
                              tableSectionId: tableInfo.id,
                            })
                          );

                          router.push(
                            `table_status/${tableInfo.prefix}${tNumber}${tableInfo.suffix}`
                          );
                        }}
                      >
                        <span style={{ color: "white" }}>
                          {tableInfo.prefix}
                          {tNumber}
                          {tableInfo.suffix}
                        </span>
                      </p>
                    </Col>
                  );
                })}
                {/* <Col>
                  <Button className="p-3">(+)</Button>
                </Col> */}
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};
