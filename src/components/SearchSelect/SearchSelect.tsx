import { useEffect, useState } from "react";
import "./SearchSelect.css";
import SearchSelectListItem from "./SearchSelectListItem";

export type User = {
  name: string;
};

export default function SearchSelect() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [displayedUsers, setDisplayedUsers] = useState<User[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  async function loadUsers() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const responseUsers = await response.json();
    setUsers(
      responseUsers.map((response: User) => {
        return {
          name: response.name,
        };
      })
    );
  }

  function handleSelectedItem(user: User) {
    setSearchValue((searchValue) => user.name);
    setTimeout(() => {
      setDisplayedUsers(null);
    }, 20);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (users === null) return;
    if (searchValue.length > 0) {
      const usersToDisplay = users.reduce((p: User[], c: User) => {
        if (c.name.toLowerCase().includes(searchValue.toLowerCase())) p.push(c);
        return p;
      }, []);
      setDisplayedUsers(usersToDisplay);
    } else {
      setDisplayedUsers(null);
    }
  }, [searchValue]);

  return users === null ? (
    <p>chargement...</p>
  ) : (
    <div className="SearchSelect">
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search any user..."
        value={searchValue}
      />
      {displayedUsers &&
        (displayedUsers.length === 0 ? (
          <ul className="NoResults">
            <li>No results</li>
          </ul>
        ) : (
          <ul>
            {displayedUsers.map((user, userindex) => {
              return (
                <SearchSelectListItem
                  fireSelectedUser={handleSelectedItem}
                  user={user}
                  key={userindex}
                  searchValue={searchValue}
                />
              );
            })}
          </ul>
        ))}
    </div>
  );
}
