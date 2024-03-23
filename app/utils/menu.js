import { list, check, todo, home,student, coach, CalendarIcon, inventory, borrowing } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Student Profile",
    icon: student,
    link: "/profile",
  },
  {
    id: 5,
    title: "Coach Profile",
    icon: coach,
    link: "/coachprofile",
  },
  {
    id: 3,
    title: "Events",
    icon: CalendarIcon,
    link: "/events",
  },
  
  {
    id: 4,
    title: "Inventory",
    icon: inventory,
    link: "/inventory",
  },
  {
    id: 4,
    title: "Borrowing",
    icon: borrowing,
    link: "/borrowing",
  },
];

export default menu;