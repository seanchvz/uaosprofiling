import {
  list,
  check,
  todo,
  home,
  student,
  coach,
  CalendarIcon,
  inventory,
  borrowing,
} from "./Icons";

const menu = [
  // {
  //   id: 3,
  //   title: "Dashboard",
  //   icon: home,
  //   link: "/events",
  // },
  {
    id: 1,
    title: "Events",
    icon: CalendarIcon,
    link: "/",
  },
  {
    id: 2,
    title: "Student Profile",
    icon: student,
    link: "/StudentScreen",
  },
  {
    id: 5,
    title: "Coach Profile",
    icon: coach,
    link: "/CoachScreen",
  },
  /* 
  {
    id: 4,
    title: "Inventory",
    icon: inventory,
    link: "/InventoryScreen",
  },
  {
    id: 6,
    title: "Borrowing",
    icon: borrowing,
    link: "/borrowing",
  },
  */
];

export default menu;
