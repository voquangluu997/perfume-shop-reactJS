import { DropdownButton, Dropdown } from "react-bootstrap";
import { getUser } from "../Utils/Common";

const Avatar = ({ user, logout }) => {
  return (
    <div className="btn-fixed d-flex align-items-center">
      {getUser() ? (
        <DropdownButton
          id="dropdown-avatar"
          title={
            <div
              className="avatar-image"
              style={{
                backgroundImage: `url(${user.avatar})`,
              }}
            />
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

          <Dropdown.Item as="button" className="drop-item" onClick={logout}>
            Logout
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <a href="/login" className="btn btn-warning btn-sm">
          Login/Register
        </a>
      )}
    </div>
  );
};

export default Avatar;
