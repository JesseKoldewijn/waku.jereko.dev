import { Link } from "./core/Link";

const DesktopNavigation = () => {
  return (
    <>
      <Link to="/about">About</Link>
      <Link to="/nested">Nesting</Link>
      <Link to="/actions">Actions</Link>
      <Link to="/view-transitions">View Transitions</Link>
    </>
  );
};

export default DesktopNavigation;
