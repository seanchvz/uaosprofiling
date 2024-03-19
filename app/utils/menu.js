import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Profile Management",
    icon: list,
    link: "/profile",
  },
  {
    id: 3,
    title: "Events",
    icon: check,
    link: "/events",
  },
  {
    id: 4,
    title: "Inventory",
    icon: todo,
    link: "/inventory",
  },
];

export default menu;