import { useState, useEffect } from "react";
import { useRouter } from "next/router";
/* bootstrap styles */
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

/* ulitily */
import {
  axiosGetFunction,
  axiosPostFunction,
  controllerUrls,
} from "../../useFullItems/axios";

function EditOrAdd() {
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantState, setRestaurantState] = useState<string>("");
  const [restaurantCity, setRestaurantCity] = useState<string>("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [stateList, setStateList] = useState<string[]>();
  const [cityList, setCityList] = useState<string[]>();

  const router = useRouter();

  const fetchStateLists = async () =>
    await axiosGetFunction({
      parentUrl: controllerUrls.restaurantsignup,
      childUrl: "states",
      thenFunction: setStateList,
    });

  useEffect(() => {
    fetchStateLists();
  }, []);

  const fetchCities = (e: string) =>
    axiosGetFunction({
      parentUrl: controllerUrls.restaurantsignup,
      childUrl: e,
      thenFunction: setCityList,
    });

  const onSubmit = async () => {
    const response = await axiosPostFunction({
      parentUrl: controllerUrls.restaurant,
      config: { withCredentials: true }, // check whole bording process
      data: {
        name: restaurantName,
        state: restaurantState,
        city: restaurantCity,
        latitude,
        longitude,
      },
    });

    if (response === "OK") router.push("/");
  };

  return (
    <section
      className="pb-5"
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/images/restro.webp)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Row>
          <h1 className="display-4 mt-5 text-white  text-center">
            Add Restaurant
          </h1>
        </Row>
        <Row className="justify-content-center">
          <Col md={9} lg={7}>
            <Form className="border p-3 rounded-3 mt-1 bg-white">
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.FloatingLabel label="Restaurant Name">
                  <Form.Control
                    onChange={(e) => setRestaurantName(e.target.value)}
                    value={restaurantName}
                    placeholder="1234 Main St"
                  />
                </Form.FloatingLabel>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      setRestaurantState(e.target.value);
                      fetchCities(e.target.value);
                    }}
                    defaultValue="Select State"
                  >
                    <option disabled>Select State</option>
                    {stateList?.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    onChange={(e) => setRestaurantCity(e.target.value)}
                    defaultValue="Select City"
                  >
                    <option disabled>Select City</option>
                    {cityList?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="Latitude">
                  <Form.Label>
                    Enter gps coordinates in decimal degrees (Latitude)
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    type="number"
                    placeholder="28.613101"
                    step="any"
                    value={latitude}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="Longitude">
                  <Form.Label>
                    Enter gps coordinates in decimal degrees (Longitude)
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    type="number"
                    placeholder="77.229498"
                    step="any"
                    value={longitude}
                  />
                </Form.Group>
              </Row>

              <Button
                variant="primary"
                type="submit"
                className="me-2"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                Back
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default EditOrAdd;
