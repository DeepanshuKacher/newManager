import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import { DishesSliceType } from "../../../../../interfaces";
import { actionTypes, useAppDispatch } from "../../../../../useFullItems/redux";

export const Column = ({
  showEditModal,
  sectionInfo,
}: {
  showEditModal: (e: DishesSliceType) => void;
  sectionInfo: DishesSliceType;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="m-4 text-center">
      <Button
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onClick={() => {
          dispatch(actionTypes.updateSectionInfo(sectionInfo));
          router.push(
            `/customize_restaurant/dishes/${sectionInfo.sectionName}`
          );
        }}
      >
        {sectionInfo.sectionName}
      </Button>
      <Button
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        variant="danger"
        onClick={() => showEditModal(sectionInfo)}
      >
        Edit
      </Button>
    </div>
  );
};
