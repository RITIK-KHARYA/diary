import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <Input
      type="search"
      placeholder="Search"
      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  );
}
