import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/router";
import { actionTypes, store } from '../../useFullItems/redux'

function NavItems() {
  const router = useRouter();
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link onClick={() =>router.push("/dashboard")}>Dashboard</Nav.Link>
      <NavDropdown title="Realtime">
        <NavDropdown.Item onClick={()=>router.push('/realtime/orders')}>Orders</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/realtime/table_status')}>Table Status</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Analysis">
        <NavDropdown.Item onClick={()=>router.push('/analysis/revenue')}>Revenue</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/analysis/dishes')}>Dishes</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Logs">
        <NavDropdown.Item onClick={()=>router.push('/logs/orders_logs')}>Order Logs (KOT)</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/logs/sessions_log')} >Session Logs</NavDropdown.Item>
      </NavDropdown>
      {/* <Nav.Link onClick={() => router.push("/sessions_log")}>Logs</Nav.Link> */}
      <NavDropdown title="Customize Restaurant">
        <NavDropdown.Item onClick={()=>router.push('/customize_restaurant/dishes/section')}>Dishes</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/customize_restaurant/table_arrangements')} >Table Arrangements</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/customize_restaurant/template')} >Template</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Manage Staff">
        <NavDropdown.Item onClick={()=>router.push('/manage_staff/waiter')}>Waiter</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/manage_staff/chef')} >Chef</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/manage_staff/manager')} >Manager</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link onClick={() => store.dispatch(actionTypes.changeOrderModalShowState(true))}>Parcel/Order</Nav.Link>
      {/* <Nav.Link onClick={()=>router.push('/parcel')}>Parcel/Order</Nav.Link> */}
      <NavDropdown title="Reviews/feedback">
        <NavDropdown.Item onClick={()=>router.push('/reviews')}>Reviews</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/feedback')}>Feedback</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link onClick={() =>router.push("/setting")}>Setting</Nav.Link>
    </Nav>
  );
}

export { NavItems };
