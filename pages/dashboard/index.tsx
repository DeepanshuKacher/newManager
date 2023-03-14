import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BarChart } from "../../components/Charts/BarChart";
import { LineChart } from "../../components/Charts/LineChart";
import { Doughnutchart } from "../../components/Charts/Doughnutchart";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Head from "next/head";

function Dashboard() {
  return (
    <Container fluid className="p-2">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Row className="g-2">
        <Col xs={12} lg={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Top 7
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Top 5</Dropdown.Item>
                  <Dropdown.Item>Top 7</Dropdown.Item>
                  <Dropdown.Item>All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Card.Title className="d-none d-sm-block">
                Top 5 popular dishesh sales
              </Card.Title>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  This week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Today&apos;s</Dropdown.Item>
                  <Dropdown.Item>This week</Dropdown.Item>
                  <Dropdown.Item>This month</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body style={{ height: "39vh" }}>
              <BarChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={4}>
          <Card>
            <Card.Header>
              <Card.Title>Restaurant seat status</Card.Title>
            </Card.Header>
            <Card.Body style={{ height: "39vh" }}>
              <Doughnutchart />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title>Average sales comparision</Card.Title>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  This week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Today&apos;s</Dropdown.Item>
                  <Dropdown.Item>This week</Dropdown.Item>
                  <Dropdown.Item>This month</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body style={{ height: "39vh" }}>
              <LineChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Button>‹ Session List ›</Button>
              <Button variant="outline-info">Overview ▸</Button>
            </Card.Header>
            <Card.Body style={{ height: "39vh" }}>
              <BarChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
