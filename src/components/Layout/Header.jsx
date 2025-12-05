import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
  <header>
    <div>
        <NavLink to="/">ZafTanstackQuery</NavLink>
        <ul>
            <li>
                <NavLink to="/">ZafTanstackQuery</NavLink>
            </li>
            <li>
                <NavLink to="/trad">FetchOld</NavLink>
            </li>
            <li>
                <NavLink to="/rq">FetchRQ</NavLink>
            </li>
        </ul>
    </div>
  </header>
  )
};
