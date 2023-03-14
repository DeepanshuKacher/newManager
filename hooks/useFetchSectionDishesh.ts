import { useEffect, useState } from "react";
import { Dish } from "../interfaces";
import {
  axiosGetFunction,
  controllerUrls,
} from "../useFullItems/axios";

const useFetchSectionDishesh = (sectionId: string) => {
  const [sectionDishesh, setSectionDishesh] = useState<Dish[]>([]);

  const getDishSection = () => {
    if (sectionId)
      axiosGetFunction({
        parentUrl: controllerUrls.dishes,
        childUrl: sectionId,
        thenFunction: setSectionDishesh,
      });
  };

  useEffect(() => {
    getDishSection();
  }, []);

  return sectionDishesh;
};

export { useFetchSectionDishesh };
