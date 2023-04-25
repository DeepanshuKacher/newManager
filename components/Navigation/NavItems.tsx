import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/router";

function NavItems() {
  const router = useRouter();
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link onClick={() =>router.push("/dashboard")}>Dashboard</Nav.Link>
      <NavDropdown title="Realtime" id="offcanvasNavbarDropdown-expand-xl">
        <NavDropdown.Item onClick={()=>router.push('/realtime/orders')}>Orders</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/realtime/table_status')}>Table Status</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Analysis" id="offcanvasNavbarDropdown-expand-xl">
        <NavDropdown.Item onClick={()=>router.push('/analysis/revenue')}>Revenue</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/analysis/dishes')}>Dishes</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link onClick={() => router.push("/sessions_log")}>Sessions Log</Nav.Link>
      <NavDropdown title="Customize Restaurant" id="offcanvasNavbarDropdown-expand-xl">
        <NavDropdown.Item onClick={()=>router.push('/customize_restaurant/dishes/section')}>Dishes</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/customize_restaurant/table_arrangements')} >Table Arrangements</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Manage Staff" id="offcanvasNavbarDropdown-expand-xl">
        <NavDropdown.Item onClick={()=>router.push('/manage_staff/waiter')}>Waiter</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/manage_staff/chef')} >Chef</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/manage_staff/manager')} >Manager</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link onClick={() => router.push("/parcel")}>Parcel</Nav.Link>
      <NavDropdown title="Reviews/feedback" id="offcanvasNavbarDropdown-expand-xl">
        <NavDropdown.Item onClick={()=>router.push('/reviews')}>Reviews</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>router.push('/feedback')}>Feedback</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link onClick={() =>router.push("/setting")}>Setting</Nav.Link>
    </Nav>
  );
}

export { NavItems };
