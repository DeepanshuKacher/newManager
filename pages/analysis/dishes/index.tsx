import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { LineChart } from "../../../components/Charts/LineChart";
import { axiosPostFunction, controllerUrls } from "../../../useFullItems/axios";
import { useAppSelector } from "../../../useFullItems/redux";
import { Dish } from "../../../interfaces";
import { Order } from "../../realtime/orders/redux";
import { randomIntFromInterval } from "../../../useFullItems/functions";

function AnalysisDishes() {
  const [dishSearchText, setDishSearchText] = useState("");
  const [startingDate, setStartingDate] = useState<Date>();
  const [selectedDishForAnalysis, setSelectedDishForAnalysis] = useState<
    Dish["id"][]
  >([]);
  const [endDate, setEndDate] = useState<Date>();
  const [showDropdown, setShowDropDown] = useState(false);
  const [analysisData, setAnalysisData] = useState<
    {
      dateOfOrder: string;
      dishId: string;
      _count: { id: number };
      _sum: { cost: number };
    }[]
  >([]);
  const [formattedData, setFormattedData] = useState<{
    [dishId: string]: {
      [dateOfOrder: string]: {
        // dishId: string;
        _count: { id: number };
        _sum: { cost: number };
      };
    };
  }>({});

  const [dateRange, setDateRange] = useState<Date[]>([]);

  const { dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  /* useEffects */

  useEffect(() => {
    if (startingDate && endDate)
      setDateRange(getDatesInRange(startingDate, endDate));
  }, [startingDate, endDate]);

  useEffect(() => {
    formatAnalysisData();
  }, [analysisData]);

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const formatAnalysisData = () => {
    const dishData: {
      [dishId: string]: {
        [dateOfOrder: string]: {
          // dishId: string;
          _count: { id: number };
          _sum: { cost: number };
        };
      };
    } = {};

    analysisData.forEach((data) => {
      if (dishData[data.dishId] === undefined) dishData[data.dishId] = {};
      dishData[data.dishId][data.dateOfOrder] = {
        _count: data._count,
        _sum: data._sum,
      };
    });

    setFormattedData(dishData);
  };

  const getData = () => {
    if (!startingDate) return alert("Please select starting date");
    if (!endDate) return alert("Please select end date");
    if (startingDate > endDate)
      return alert("Starting Date should before end date");
    axiosPostFunction({
      parentUrl: controllerUrls.dishAnalysis,
      childUrl: "getData",
      loader: true,
      data: {
        startDate: startingDate,
        endDate: endDate,
        dishesId: selectedDishForAnalysis,
      },
      thenFunction: setAnalysisData,
    });
  };

  const toggleSelectedDishForAnalysis = (dishId: Dish["id"]) => {
    let isItemFound = false;

    const tempStore = selectedDishForAnalysis.filter((id) => {
      if (id !== dishId) return id;
      else isItemFound = true;
    });

    if (isItemFound === false) {
      tempStore.push(dishId);
    }
    setSelectedDishForAnalysis(tempStore);
  };

  const extractSumFromFormattedData = (dishId: Order["dishId"]) => {
    const dataStore: number[] = [];
    for (let x of dateRange) {
      // console.log(x.toISOString());
      dataStore.push(
        formattedData?.[dishId]?.[x.toISOString()]?.["_sum"]?.["cost"] || 0
      );
    }
    return dataStore;
  };

  const getRandomColor = () => {
    const red = randomIntFromInterval(0, 255),
      blue = randomIntFromInterval(0, 255),
      green = randomIntFromInterval(0, 255);

    return `${red},${blue},${green}`;
  };

  return (
    <Container fluid>
      <Row>
        <Col style={{ height: "70vh" }}>
          <LineChart
            data={{
              labels: dateRange.map((dateItem) => dateItem.toDateString()),
              datasets: selectedDishForAnalysis.map((dishId) => {
                const randomColor = getRandomColor();
                return {
                  label: dishesh.find((dish) => dish.id === dishId)?.name,
                  data: extractSumFromFormattedData(dishId),
                  borderColor: `rgb(${randomColor})`,
                  backgroundColor: `rgba(${randomColor},0.5)`,
                };
              }),
            }}
            displayLegend={true}
            title="Revenue from dish"
          />
        </Col>
      </Row>
      <Row className="align-items-end mb-2 mt-4">
        <Col>
          <Form.Group>
            <Form.Label>Starting Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setStartingDate(new Date(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col
          className="position-relative"
          onMouseOver={() => setShowDropDown(true)}
          onMouseLeave={() => setShowDropDown(false)}
        >
          <Form.Control
            type="text"
            placeholder={"Search Dish"}
            value={dishSearchText}
            onChange={(e) => setDishSearchText(e.target.value)}
          />
          <ListGroup
            className={`position-absolute ${showDropdown ? "" : "d-none"}`}
            style={{ height: "7rem", overflow: "auto", width: "93%" }}
          >
            {dishesh
              ?.filter((value) =>
                value.name.match(new RegExp(dishSearchText, "gi"))
              )
              .map((dish) => (
                <ListGroup.Item
                  onClick={() => toggleSelectedDishForAnalysis(dish.id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedDishForAnalysis.includes(dish.id)
                      ? "lightgreen"
                      : "white",
                  }}
                  key={dish.id}
                >
                  {dish.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
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

export default AnalysisDishes;
