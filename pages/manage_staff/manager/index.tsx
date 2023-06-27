import React, { useEffect, useState } from "react";
import Head from "next/head";
/* import bootstrap */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* import components */
import { useAppSelector } from "../../../useFullItems/redux";
import { WaiterType } from "../../../interfaces";
import { DeleteModal } from "../../../components/pagesComponents/manage_staff/DeleteModal";
import { EmployeeCard } from "../../../components/pagesComponents/manage_staff/EmployeeCard";
import { AddManager } from "../../../components/pagesComponents/manage_staff/AddManagerModal";
import { useGetManagerListQuery } from "../../../useFullItems/redux_toolkit_query";
import { axiosGetFunction } from "../../../useFullItems/axios";

/* import utility */

function Manager() {
  // const [showEditDishModal, setShowEditDishModal] = useState(false);  ---- edit & add mode
  // const [dishModalMode, setDishModalMode] = useState<MODE>(false);  ---- edit & add mode
  const [employeeAddModal, setEmployeeAddModal] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState<WaiterType>();
  const [listOfManager, setListOfManager] = useState<
    {
      firstName: string;
      middleName: string;
      lastName: string;
    }[]
  >([]);

  const chefs = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.chefs
  );

  // const {} = useGetManagerListQuery();
  /* useEffects */

  useEffect(() => {
    axiosGetFunction({
      parentUrl: "manager",
      useGlobalLoader: true,
      thenFunction: setListOfManager,
    });
  }, []);

  /* functions */

  const toggleAddModal = () =>
    setEmployeeAddModal((currentValue) => !currentValue);

  const toggleDeleteModal = () => setWorkerToDelete(undefined);

  return (
    <>
      <Head>
        <title>Manage Manager</title>
      </Head>

      {employeeAddModal && <AddManager handleClose={toggleAddModal} />}

      {workerToDelete && (
        <DeleteModal
          workerDetail={workerToDelete}
          handleClose={toggleDeleteModal}
          deleteType="chefs"
        />
      )}

      <Container fluid className="py-1">
        <Row className="g-2">
          {/* If not availabe then background */}
          {chefs?.map((chef) => {
            return (
              <EmployeeCard
                setWorkerToDelete={setWorkerToDelete}
                employeeDetail={chef}
                key={chef.id}
              />
            );
          })}

          <Col xs={6} sm={4} md={3} xl={2}>
            <Card>
              <Button size="lg" onClick={() => toggleAddModal()}>
                Manager
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Manager;
