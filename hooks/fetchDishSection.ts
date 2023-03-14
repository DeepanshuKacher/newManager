import { useEffect, useState } from "react";
import {
  axiosGetFunction,
  controllerUrls,
} from "../useFullItems/axios";
import { useAppSelector } from "../useFullItems/redux";

interface DishSection {
  id: string;
  sectionName: string;
}

export const useFetchDishSection = () => {
  const [dishSection, setDishSection] = useState<DishSection[]>([]);

  const { id } = useAppSelector((store) => store.restaurantInfo.defaultValues);

  const getDishSection = () => {
    axiosGetFunction({
      parentUrl: controllerUrls.dishSection,
      childUrl: id,
      thenFunction: setDishSection,
    });
  };

  useEffect(() => {
    getDishSection();
  }, []);

  return dishSection;
};
