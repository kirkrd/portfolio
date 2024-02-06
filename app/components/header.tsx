import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="flex items-strech">
      <h1 className="flex-auto"> kirkerud.dev </h1>
      <ModeToggle />
    </div>
  );
};

export default Header;
