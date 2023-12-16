import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LineChart } from "../../../components/Charts/LineChart";
import { axiosPostFunction, controllerUrls } from "../../../useFullItems/axios";
import dayjs from "dayjs";

enum ModeOfIncome {
  online,
  cash,
}

function Revenue() {
  const [startingDate, setStartingDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [revenueData, setRevenueData] = useState<
    {
      dateTime: string;
      id: string;
      restaurantId: string;
      modeOfIncome: ModeOfIncome | null;
      parcelRevenue: boolean;
      revenueGenerated: number;
    }[]
  >([]);

  const getData = () => {
    if (!startingDate) return alert("Please select starting date");
    if (!endDate) return alert("Please select end date");
    axiosPostFunction({
      parentUrl: controllerUrls.revenueAnalysis,
      loader: true,
      data: {
        startDate: startingDate,
        endDate: endDate,
      },
      thenFunction: (e: any) => {
        console.log(e);
        setRevenueData(e);
      },
    });
  };

  useEffect(() => {
    console.log(revenueData);
  }, [revenueData]);

  return (
    <Container fluid>
      <Row>
        <Col style={{ height: "68vh" }}>
          <LineChart
            title={`Total = ${revenueData.reduce(
              (total, currentValue) => total + currentValue.revenueGenerated,
              0
            )}`}
            data={{
              labels: revenueData.map((data) =>
                dayjs(data.dateTime).format("HH:mm DD/M")
              ),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData.map((data) => data.revenueGenerated),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </Col>
      </Row>
      <Row className="align-items-end mb-2 mt-4">
        <Col>
          <Form.Group>
            <Form.Label>Starting Date</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setStartingDate(new Date(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col className="d-none d-sm-block">
          <Button onClick={getData}>Show Data</Button>
        </Col>
      </Row>
      <Row className="justify-content-center d-sm-none">
        <Col xs={12}>
          <Button onClick={getData} style={{ width: "100%" }}>
            Show Data
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Revenue;
