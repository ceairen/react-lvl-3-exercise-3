import { User } from "./SearchSelect";
import parse from "html-react-parser";
import "./SearchSelect.css";

type SearchSelectListItemProps = {
  searchValue: string;
  user: User;
  valueChange: (user: User) => void;
};

export default function SearchSelectListItem({
  valueChange,
  searchValue,
  user,
}: SearchSelectListItemProps) {
  function stylize() {
    const { name } = user;
    const searchIndex = name.toLowerCase().indexOf(searchValue.toLowerCase());
    const newName =
      name.substring(0, searchIndex) +
      "<span>" +
      name.substring(searchIndex, searchIndex + searchValue.length) +
      "</span>" +
      name.substring(searchIndex + searchValue.length);
    return <>{parse(newName)}</>;
  }
  return (
    <li onClick={() => valueChange(user)} className="SearchSelectListItem">
      {stylize()}
    </li>
  );
}
