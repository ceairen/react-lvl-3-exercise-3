import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import "./MainLeft.css";

export type CustomUser = {
  name: string;
};

export default function MainLeft() {
  const [users, setUsers] = useState<CustomUser[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<CustomUser | null>(null);

  async function loadUsers() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const responseUsers = await response.json();
    setUsers(
      responseUsers.map((response: CustomUser) => {
        return {
          name: response.name,
        };
      })
    );
  }

  function handleUserSelected(user: CustomUser) {
    setSelectedUser(user);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <div>
        <label>
          {selectedUser === null ? "Choisir un user" : selectedUser.name}
        </label>
        {users !== null && (
          <CustomSelect
            data={users}
            dataFilteredKey={"name"}
            dataSelected={handleUserSelected}
          />
        )}
      </div>
    </div>
  );
}
