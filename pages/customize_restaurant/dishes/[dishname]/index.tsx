import React, { useEffect, useState } from "react";
import Head from "next/head";
/* import bootstrap */
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
/* import components */
import { DishCard } from "../../../../components/pagesComponents/customize_restaurant/dishes/dishname/DishCard";
import { DishModal } from "../../../../components/pagesComponents/customize_restaurant/dishes/dishname/DishModal";
import { NavBar } from "../../../../components/pagesComponents/customize_restaurant/dishes/NavBar";
/* import utility */
import { useAppSelector, useAppDispatch } from "../../../../useFullItems/redux";
import { Dish } from "../../../../interfaces";
import { useRouter } from "next/router";
import { useFetchSectionDishesh } from "../../../../hooks/useFetchSectionDishesh";

// const ViewModal = <T extends boolean, Z extends () => void>({
//   showViewModal,
//   toggleViewModal,
// }: {
//   showViewModal: T;
//   toggleViewModal: Z;
// }) => (
//   <Modal centered show={showViewModal} scrollable onHide={toggleViewModal}>
//     <Modal.Body className="p-0">
//       <Card>
//         <Card.Body>
//           <Card.Title>Chicken Biryani</Card.Title>

//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Full</th>
//                 <th>Half</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th>Large</th>
//                 <td>
//                   ₹<span>25</span>
//                 </td>
//                 <td>
//                   ₹<span>25</span>
//                 </td>
//               </tr>
//               <tr>
//                 <th>Medium</th>
//                 <td>
//                   ₹<span>50</span>
//                 </td>
//                 <td>
//                   ₹<span>25</span>
//                 </td>
//               </tr>
//               <tr>
//                 <th>Small</th>
//                 <td>
//                   ₹<span>80</span>
//                 </td>
//                 <td>
//                   ₹<span>25</span>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//           <Card.Text>
//             <strong>Description :- </strong>
//             <span>
//               Some quick example text to build on the card title and make up the
//               content. Some quick example text to build on the card title and
//               make
//             </span>
//           </Card.Text>

//           <ListGroup>
//             <ListGroup.Item className="d-flex justify-content-between">
//               <span>extra chilld flavour</span>
//               <span>₹25</span>
//             </ListGroup.Item>
//             <ListGroup.Item className="d-flex justify-content-between">
//               <span>extra chilld flavour</span>
//               <span>₹25</span>
//             </ListGroup.Item>
//             <ListGroup.Item className="d-flex justify-content-between">
//               <span>extra chilld flavour</span>
//               <span>₹25</span>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>
//     </Modal.Body>
//   </Modal>
// );

export type MODE = "VIEW" | "EDIT" | "ADD" | false;

function AllDish() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const [showEditDishModal, setShowEditDishModal] = useState(false);  ---- edit & add mode
  // const [dishModalMode, setDishModalMode] = useState<MODE>(false);  ---- edit & add mode
  const [dishForModal, selectDishForModal] = useState<Dish>();
  const [searchResult, setSearchReault] = useState("");

  const seletedDishSection = useAppSelector(
    (store) => store.dishesSlices.value
  );

  const sectionDishesh = useFetchSectionDishesh(seletedDishSection.id);

  console.log({ sectionDishesh });

  /* useEffects */

  useEffect(() => {
    if (!seletedDishSection.id)
      router.push("/customize_restaurant/dishes/section");
  }, []);

  return (
    <>
      <Head>
        <title>All Dish</title>
      </Head>

      {/* <ViewModal<typeof showViewModal, typeof toggleViewModal>
        showViewModal={showViewModal}
        toggleViewModal={toggleViewModal}
      /> */}

      <DishModal
        showHeader={true}
        dishInfo={dishForModal!}
        setMode={selectDishForModal}
      />

      <NavBar
        placeholderText="search for dish"
        setSearchString={setSearchReault}
        showSearchBar={true}
      />

      <Container fluid className="py-1">
        <Row className="g-2">
          {/* If not availabe then background */}
          {sectionDishesh
            ?.filter((value) =>
              value.name.match(new RegExp(searchResult, "gi"))
            )
            .map((dish, index) => {
              return (
                <DishCard
                  key={index}
                  dishInfo={dish}
                  openViewModel={selectDishForModal}
                />
              );
            })}

          <Col xs={6} sm={4} md={3} xl={2}>
            <Card>
              <Button
                size="lg"
                onClick={() => {
                  router.push("/customize_restaurant/multiple_dish");
                }}
              >
                Add Dish (+)
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllDish;
