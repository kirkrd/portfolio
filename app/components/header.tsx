import { ModeToggle } from "./mode-toggle.js";

function Header() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-auto">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Kirkerud Development
        </h1>
        <p className="text-sm text-muted-foreground">kirkerud.dev</p>
      </div>
      <ModeToggle />
    </div>
  );
}

export default Header;
