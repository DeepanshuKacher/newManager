import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import { useRouter } from "next/router";
import { Loader } from "../components/Common";
/* utility */
import { useAxiosGet } from "../useFullItems/hooks";
import { selectRestaurantFunction } from "../useFullItems/functions";

function MainCard({
  restaurantCity,
  restaurantName,
  restaurantId,
}: {
  restaurantName: string;
  restaurantCity: string;
  restaurantId: string;
}) {
  const router = useRouter();
  return (
    <Col lg="3" md="4">
      <Card
        onClick={async () => {
          await selectRestaurantFunction(
            restaurantId
            // , () =>router.push("/dashboard")
          );

          router.push("/dashboard");
        }}
      >
        <Card.Header style={{ cursor: "pointer" }} className="text-center">
          <Card.Title>{restaurantName}</Card.Title>
          <Card.Subtitle>{restaurantCity}</Card.Subtitle>
        </Card.Header>
        <Card.Footer className="d-flex justify-content-between align-center">
          <FormCheck />
          <Card.Text>Make Defaulf</Card.Text>
        </Card.Footer>
      </Card>
    </Col>
  );
}

function Index() {
  const router = useRouter();

  const { data, loading, error } = useAxiosGet<any>({
    parentUrl: "restaurants",
    config: { withCredentials: true },
  });

  if (loading) return <Loader />;
  else if (error) return <h1>Error</h1>;
  else {
    let typeData: {
      restaurants: [{ name: string; city: string; id: string }];
    } = data;

    if (data.restaurant) {
      /* : {
        restaurant: { city: string; name: string; id: string };
      } */
      // typeData = data;

      const temp: {
        restaurant: {
          city: string;
          id: string;
          name: string;
        };
      } = data;

      typeData = {
        restaurants: [
          {
            city: temp.restaurant.city,
            id: temp.restaurant.id,
            name: temp.restaurant.name,
          },
        ],
      };
    }

    const restaurantList = typeData?.restaurants || [];

    return (
      <Container fluid>
        <Container>
          <Row className="g-4 my-5">
            {restaurantList?.map((restaurant) => (
              <MainCard
                key={restaurant.id}
                restaurantCity={restaurant.city}
                restaurantName={restaurant.name}
                restaurantId={restaurant.id}
              />
            ))}

            <Col lg="3" md="4">
              <Card>
                <Card.Body>
                  <h4
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/modify-restaurant/add")}
                  >
                    (+) Add Restaurant
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Index;
