import { DropdownButton, Dropdown } from "react-bootstrap";
import { removeUserSession } from "../Utils/Common";
import { Link } from "react-router-dom";
import { useState } from "react";

const Avatar = ({ user, onSubmit }) => {
  const [currUser, setCurrUser] = useState(user);

  const handleSubmit = () => {
    setCurrUser(null);
    removeUserSession();
    onSubmit({ currUser });
  };

  return (
    <div className="btn-fixed d-flex align-items-center">
      {user ? (
        <DropdownButton
          id="dropdown-avatar"
          title={
            user.fullname
            // <div
            //   className="avatar-image"
            //   style={{
            //     backgroundImage: `url(${user.avatar})`,
            //   }}
            // />
          }
        >
          <Dropdown.Item href="/profile" className="username drop-item">
            {user.firstName} {user.lastName}
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item href="/profile" className="drop-item">
            Update profile
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item href="/profile/password" className="drop-item">
            Change password
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item as="button" className="drop-item">
            <Link to="/login" onClick={handleSubmit}>
              Logout
            </Link>
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <a href="/login" className="btn btn-warning btn-sm">
          Login
        </a>
      )}
    </div>
  );
};

export default Avatar;
