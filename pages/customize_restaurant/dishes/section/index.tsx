import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { NavBar } from "../../../../components/pagesComponents/customize_restaurant/dishes/NavBar";
/* utitlies */
import { axiosPostFunction } from "../../../../useFullItems/axios";
import { Loader, ErrorUI } from "../../../../components/Common";
import { DishesSliceType } from "../../../../interfaces";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  actionTypes,
  useAppSelector,
} from "../../../../useFullItems/redux";
import Head from "next/head";
import { Column } from "../../../../components/pagesComponents/customize_restaurant/dishes/section/Column";
import { DeleteModal } from "../../../../components/pagesComponents/customize_restaurant/dishes/section/DeleteModals";
import { EditModal } from "../../../../components/pagesComponents/customize_restaurant/dishes/section/EditModal";
import { useFetchDishSection } from "../../../../hooks/fetchDishSection";

const AddButton = ({ openEditModal }: { openEditModal: () => void }) => {
  return (
    <div className="text-center m-4">
      <Button variant="success" onClick={openEditModal}>
        Add Section
      </Button>
    </div>
  );
};

function Section() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  // const [editModalAddMode, setEditModalAddMode] = useState(false);
  const [editSectionInfo, setEditSectionInfo] = useState<DishesSliceType>();
  // const [reload, toggleReload] = useState(false);
  const dishSections = useFetchDishSection();

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const editModalDeleteFunction = () => {
    closeEditModal();
    setShowDeleteModal(true);
  };

  const openEditModal = (value?: DishesSliceType) => {
    if (value?.sectionName) setEditSectionInfo(value);
    else setEditSectionInfo(undefined);
    setShowEditModal(true);
  };

  return (
    <>
      <Head>
        <title>Dish Section</title>
      </Head>
      <NavBar
        placeholderText="search for section"
        setSearchString={setSearchString}
        showSearchBar={true}
      />
      {/* {showEditModal && ( */}
      {showEditModal && (
        <EditModal
          // show={showEditModal}
          handleClose={closeEditModal}
          handleDelete={editModalDeleteFunction}
          editSectionInfo={editSectionInfo}

          // addMode={editModalAddMode}
          // toggleReload={toggleReloadFunction}
        />
      )}

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        deleteSectionInfo={editSectionInfo!}
      />
      <Container fluid className="d-flex flex-wrap">
        {dishSections
          ?.filter((value) =>
            value.sectionName.match(new RegExp(searchString, "gi"))
          )
          .map((section) => {
            return (
              <Column
                key={section.id}
                showEditModal={openEditModal}
                sectionInfo={section}
              />
            );
          })}

        <AddButton openEditModal={openEditModal} />
      </Container>
    </>
  );
}

export default Section;
