import { useEffect, useState } from "react";
import Head from "next/head";
/* bootstrap */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Navbar } from "../../../components/pagesComponents/customize_restaurant/table_arrangements/Navbar";
import { AccordionCol } from "../../../components/pagesComponents/customize_restaurant/table_arrangements/AccordionCol";
import { TableAddModal } from "../../../components/pagesComponents/customize_restaurant/table_arrangements/TableAddModal";
import { useAppSelector } from "../../../useFullItems/redux";
import { Table } from "../../../interfaces";
import { DeleteModal } from "../../../components/pagesComponents/customize_restaurant/table_arrangements/DeleteModal";
// import Alert from "react-bootstrap/Alert";

function TableArrangements() {
  const [showTableAddModal, setShowTableAddModal] = useState(false);
  const [navText, setNavText] = useState("");
  const [passDataToTableAddModal, setDataToTableAddModal] = useState<Table>();
  const [dataToDelete, setDataToDelete] = useState<Table>();
  const [toggleAccordionOpenClose, setToggleAccordionOpenClose] =
    useState(true);

  const tables = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.tables
  );

  /* useEffect */

  // useEffect(() => {
  //   if (passDataToTableAddModal !== undefined) setShowTableAddModal(true);
  //   else setShowTableAddModal(false);
  // }, [passDataToTableAddModal]);

  useEffect(() => {
    if (showTableAddModal === false) setDataToTableAddModal(undefined);
  }, [showTableAddModal]);

  /* functions */
  const toggleTableAddModalShow = () => {
    setShowTableAddModal((currentValue) => !currentValue);
  };

  const setDataToAddTableModal = (para: Table) => {
    setDataToTableAddModal(para);
    setShowTableAddModal(true);
  };

  return (
    <>
      <Head>
        <title>TableArrangement</title>
      </Head>
      <Navbar
        setShowTableAddModal={toggleTableAddModalShow}
        toggleAccordion={setToggleAccordionOpenClose}
        // setText={setNavText}
        // text={navText}
      />

      {dataToDelete && (
        <DeleteModal
          deleteTableDetail={dataToDelete!}
          handleClose={() => setDataToDelete(undefined)}
          show={!!dataToDelete}
        />
      )}

      {showTableAddModal && (
        <TableAddModal
          setShow={toggleTableAddModalShow}
          show={showTableAddModal}
          valuesForEdting={passDataToTableAddModal}
        />
      )}

      <Container fluid className="my-2">
        <Row xs={1} md={2} xl={3} className="g-2">
          {tables.map((table) => (
            <AccordionCol
              toggleOpenClose={toggleAccordionOpenClose}
              setDataToDelete={setDataToDelete}
              setDataToModal={setDataToAddTableModal}
              tableInfo={table}
              key={table.id}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default TableArrangements;
