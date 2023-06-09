import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid, HomeIcon } from "@heroicons/react/24/solid";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chat } from "./Chat";
import { LogoutLink } from "./LogoutLink";

const history = createBrowserHistory();

const navigation = [
  { name: "All Paintings", href: "all-paintings", current: false },
  
  /*{
    name: "Featured Movements",
    href: "",
    current: false,
    children: [
      { name: "Impressionism", href: "/paintings/impressionism", current: false },
      { name: "Surrealism", href: "/paintings/surrealism", current: false },
      { name: "Realism", href: "/paintings/realism", current: false },
      { name: "Abstract", href: "/paintings/abstract", current: false },
      { name: "Cubism", href: "/paintings/cubism", current: false },
      { name: "Expressionism", href: "/paintings/expressionism", current: false },
      { name: "Baroque", href: "/paintings/baroque", current: false },
      { name: "Romaticism", href: "/paintings/romanticism", current: false },
      // add more movements as needed
    ],
  },*/

  { name: "AI Art Assistant", href: "/chat", current: false },
  { name: "Artist Map", href: "/artist-map", current: false },
];

// CustomToggle component
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="text-black-300 rounded-md px-3 py-2 text-sm font-medium hover:text-black inline-flex items-center"  // Add inline-flex and items-center
  >
    {children}
  </a>
));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const handleLogout = () => {
    // Clear the JWT from local storage
    localStorage.removeItem("jwt");

    // Redirect the user to the home page
    history.push("/login");
  };

  let authenticationLinks;
  if (localStorage.jwt === undefined || !localStorage.jwt) {
    authenticationLinks = (
      <>
        <li>
          <a className="relative ml-3" href="/signup">
            Sign Up
          </a>
        </li>
        <li>
          <a className="relative ml-3" href="/login">
            Log In
          </a>
        </li>
      </>
    );
  } else {
    authenticationLinks = (
      <li>
        <a href="/login">
          <button className="relative ml-3" href="/login" onClick={handleLogout}>
            Log Out
          </button>
        </a>
      </li>
    );
  }

  return (
    <Disclosure as="nav" className="nav-bg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <b>
                    <header>ArtNook</header>
                  </b>
                  <div className="flex items-center ml-2 mb-2">
                    <Link to="/home">
                      <HomeIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="border-r border-gray-400 h-6 mx-2"></div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      if (item.children) {
                        // If the navigation item has children, render a Dropdown
                        return (
                          <Dropdown key={item.name}>
                            <Dropdown.Toggle
                              as={CustomToggle}
                              id="dropdown-basic"
                              className={classNames(
                                item.current ? "bg-gray-900 text-white" : "text-black-300",
                                "rounded-md px-3 py-2 text-sm font-medium hover-item"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                              <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />{" "}
                              {/* dropdown icon */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="featured-movements-dropdown w-48 featured-movements-menu">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link className="relative ml-3 hover-item" to={child.href}>
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        );
                      } else {
                        // If the navigation item does not have children, render a Link
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current ? "bg-gray-900 text-white" : "text-black-300",
                              "rounded-md px-3 py-2 text-sm font-medium hover-item"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <div className="flex items-center">{item.name}</div>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center mr-2"> {/* Increase the right margin */}</div>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-2">
                  <div>
                    <Menu.Button className="text-gray-700 flex items-center hover-item text-sm font-medium px-3 py-2 rounded-md ml-0 mr-0">
                      {" "}
                      {/* Increase the left margin */}
                      <span className="sr-only">Open user menu</span>
                      {localStorage.jwt ? (
                        <UserIconSolid className="items-center h-6 w-6" aria-hidden="true" />
                      ) : (
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {authenticationLinks}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
