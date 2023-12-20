import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { LineChart } from "../../../components/Charts/LineChart";
import { axiosPostFunction, controllerUrls } from "../../../useFullItems/axios";
import dayjs from "dayjs";


interface RevenueData {
  dateTime: string;
  modeOfIncome: ModeOfIncome | null;
  parcelRevenue: boolean;
  revenueGenerated: number;
}

enum ModeOfIncome {
  online,
  cash,
}



const DataComponent = ({ data }: { data: RevenueData[] }) => {
  const totalRevenue = data.reduce((acc, item) => acc + item.revenueGenerated, 0);

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date Time</th>
            <th>Mode of Income</th>
            <th>Parcel Revenue</th>
            <th>Revenue Generated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{dayjs(item.dateTime).format("DD/M/YY HH:mm")}</td>
              <td>{item.modeOfIncome || '-'}</td>
              <td>{item.parcelRevenue ? 'Yes' : 'No'}</td>
              <td>{item.revenueGenerated}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} style={{ textAlign: 'right' }}>Total</td>
            <td>{totalRevenue}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};




function Revenue() {
  const [startDateTime, setStartDateTime] = useState<number>();
  const [endDateTime, setEndDateTime] = useState<number>();
  const [revenueData, setRevenueData] = useState<
    RevenueData[]
  >([]);

  const getData = () => {
    if (!startDateTime) return alert("Please select starting date");
    if (!endDateTime) return alert("Please select end date");
    axiosPostFunction({
      parentUrl: controllerUrls.revenueAnalysis,
      loader: true,
      data: {
        startDateTime,
        endDateTime,
      },
      thenFunction: setRevenueData
    });
  };

  // useEffect(() => {
  //   console.log(revenueData);
  // }, [revenueData]);

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
              onChange={(e) => setStartDateTime(new Date(e.target.value).getTime())}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setEndDateTime(new Date(e.target.value).getTime())}
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
      <DataComponent data={revenueData} />
    </Container>
  );
}

export default Revenue;
