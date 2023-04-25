import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { axiosPostFunction } from "../../../useFullItems/axios";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { EntryForm } from "../../../components/pagesComponents/customize_restaurant/multiple_dish/EntryForm";
import { DishInfo } from "../../../components/pagesComponents/customize_restaurant/multiple_dish/DishInfo";
import {
  useAppSelector,
  useAppDispatch,
  actionTypes,
} from "../../../useFullItems/redux";
import { useRouter } from "next/router";

export type DishItem = {
  id: number;
  name: string;
  description?: string;
  image?: File;
  FullLarge_Price?: number;
  FullMedium_Price?: number;
  FullSmall_Price?: number;
  HalfLarge_Price?: number;
  HalfMedium_Price?: number;
  HalfSmall_Price?: number;
};

function Add_MultipleDish() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: dishSectionId, sectionName } = useAppSelector(
    (store) => store.dishesSlices.value
  );

  const [multipleDish, setMultipleDish] = useState<DishItem[]>([]);

  useEffect(() => {
    if (!dishSectionId) router.push("/customize_restaurant/dishes/section");
  }, []);

  // useEffect(() => {
  //   console.log(multipleDish);
  // }, [multipleDish]);

  const addItemToMultipleDish = (itemToAdd: DishItem) => {
    setMultipleDish((currentItems) => [...currentItems, itemToAdd]);
  };

  const deleteFunction = (id: number) => {
    let temp = multipleDish;
    temp = temp.filter((dishItem) => dishItem.id !== id);
    setMultipleDish(temp);
  };

  const editFunction = (id: number, newItem: DishItem) => {
    const temp = multipleDish;
    const editElementIndex = temp.findIndex((value) => value.id === id);
    temp[editElementIndex] = newItem;
    setMultipleDish(temp);
  };

  const submitDishToServer = () => {
    dispatch(actionTypes.updateLoaderState(true));
    axios
      .all(
        multipleDish.map((items) => {
          const { id, ...newItem } = items;
          if (newItem.image) {
            const formData = new FormData();
            formData.append("image", newItem.image!);
            formData.append("name", newItem.name);
            formData.append("description", newItem?.description || "");
            formData.append(
              "FullLarge_Price",
              newItem?.FullLarge_Price?.toString() || "0"
            );
            formData.append(
              "FullMedium_Price",
              newItem?.FullMedium_Price?.toString() || "0"
            );
            formData.append(
              "FullSmall_Price",
              newItem?.FullSmall_Price?.toString() || "0"
            );
            formData.append(
              "HalfLarge_Price",
              newItem?.HalfLarge_Price?.toString() || "0"
            );
            formData.append(
              "HalfMedium_Price",
              newItem?.HalfMedium_Price?.toString() || "0"
            );
            formData.append(
              "HalfSmall_Price",
              newItem?.HalfSmall_Price?.toString() || "0"
            );
            formData.append("dishSectionId", dishSectionId);

            axiosPostFunction({
              parentUrl: "dishes",
              childUrl: "with_image",
              data: formData,
            });
          } else {
            axiosPostFunction({
              parentUrl: "dishes",
              childUrl: "without_image",
              data: { ...newItem, dishSectionId },
            });
          }
        })
      )
      .then((response) => {
        setMultipleDish([]);
      })
      .catch((error: AxiosError) => console.log({ error }))
      .finally(() => dispatch(actionTypes.updateLoaderState(false)));
  };

  return (
    <>
      <Head>
        <title>Add dishesh</title>
      </Head>

      <Container fluid>
        <EntryForm addItem={addItemToMultipleDish} />
        {multipleDish.map((item) => {
          return (
            <DishInfo
              defaultValue={item}
              deleteFunction={deleteFunction}
              editCurrentItem={editFunction}
              key={item.id}
            />
          );
        })}
        <Button variant="success" onClick={submitDishToServer}>
          Add Items to {sectionName} section
        </Button>
      </Container>
    </>
  );
}

export default Add_MultipleDish;
