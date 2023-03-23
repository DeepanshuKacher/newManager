import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import { useAppSelector } from "../../useFullItems/redux";
import { axiosGetFunction, controllerUrls } from "../../useFullItems/axios";

function Setting() {
  const { allowWaiterToClearSession } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.settings
  );

  const toggleClearSessionButton = () => {
    axiosGetFunction({
      parentUrl: controllerUrls.restaurantSetting,
      childUrl: allowWaiterToClearSession
        ? "forbid_waiter_clear_session"
        : "allow_waiter_clear_session",
      useGlobalLoader: true,
      execute_onLoadFunction: true,
    });
  };

  return (
    <ListGroup variant="flush" className="mt-5">
      <ListGroup.Item>
        <FormCheck
          type="switch"
          label="Allow waiter to clear session"
          // onChange={(e) => console.log(e.currentTarget.value)}
          checked={allowWaiterToClearSession}
          onChange={toggleClearSessionButton}
        />
      </ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
}

export default Setting;
