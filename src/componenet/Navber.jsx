import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from './../hook/useAxios';
import { NavLink } from 'react-router-dom';

// Profile menu items
const profileMenuItems = [
  // {
  //   label: "Sign Out",
  //   icon: PowerIcon,
  //   func:localStorage.removeItem('user')
  // },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);
  const { user } = useAuth();
  const axiosCommon = useAxios();
  const { data = {}, error } = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      try {
        const response = await axiosCommon.get(`/user-balance/${user.email}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  });

  const toggleBalance = () => {
    setShowBalance(true);
    setTimeout(() => {
      setShowBalance(false);
    }, 6000);
  };

  return (
    <div className="flex items-center gap-3">
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <div className="flex justify-center gap-2 items-center">
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="user avatar"
                className="border border-gray-900 p-0.5"
                src={user?.image}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </Button>
         
          </div>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => (
            <MenuItem
              key={label}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 rounded"
            >
              {React.createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography as="span" variant="small" className="font-normal">
                {label}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <div className="rounded-full p-1 border flex gap-2">
        
      </div>
      <div  onClick={toggleBalance} className={`transition-transform duration-500 ${showBalance ? "translate-x-0" : "translate-x-full"} flex items-center gap-2`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <span>Balance</span>  <span>Balance: ${data.balance}</span>
            </div>
    </div>
  );
}

// Nav list component
const navListItems = [
  {
    label: "Overview",
    icon: UserCircleIcon,
    href: "/overview",
  },
  {
    label: "Transactions",
    icon: UserCircleIcon,
    href: "/transactions",
  },
  {
    label: "Send Money",
    icon: UserCircleIcon,
    href: "/sendMoney",
  },
  {
    label: "Cash-Out",
    icon: UserCircleIcon,
    href: "/cash-out",
  },
  {
    label: "Cash-In",
    icon: UserCircleIcon,
    href: "/cash-in",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, href }, key) => (
        <li key={key}>
          <NavLink
            to={href}
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold border-b-2 border-primary transition-transform duration-300"
                : "border-b-2 border-transparent transition-transform duration-300"
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2  lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <ProfileMenu />
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll text-black">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
