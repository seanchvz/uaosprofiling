"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { logout } from "@/app/utils/Icons";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

function Sidebar() {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="imageaddu mb-4">
          <Image width={100} height={100} src="/addu.jpeg" alt="profile" />
        </div>
        <p className="text-center text-white text-lg">
          University Athletics Office
        </p>
      </div>

      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`} // para kabalo unsay ihighlight pag naa sa current page
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>

      <div className="profile">
        <div className="profile-overlay"></div>

        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt="profile" />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>

        <h1>
          {firstName}
          {/* {lastName} */}
        </h1>
      </div>
      <div>
        <div className="sign-out relative mb-6 ml-6 ">
          <div className="flex justify-center items-center">
            <Button
              name={"Logout"}
              type={"submit"}
              padding={"0.4rem 0.8rem"}
              borderRad={"0.8rem"}
              fw={"500"}
              fs={"1rem"}
              icon={logout}
              click={() => {
                signOut(() => router.push("/signin"));
              }}
            />
          </div>
        </div>
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
   

    .toggle-nav {
      display: block !important;
    }
  }


  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 200;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

    h1 {
      font-size: 1rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: 1rem;
      line-height: 100%;
    }


      img {
        transform: scale(1.1);
      }
    }
  }
  .imageaddu {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Or using Tailwind CSS */
  .imageaddu {
    @apply flex justify-center items-center;
  }
  

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      color: #ffffff;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    a {
      font-weight: 500;
      color: #ffffff;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 1;
    }

    i {
      display: flex;
      align-items: center;
      color: #ffffff;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: #002B88;

  
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
    
  }

  .imageaddu,
  h1 {
    position: relative;
    z-index: 1;
  }

  .imageaddu {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.5s ease;
    border-radius: 100%;
    
    width: 100px;
    height: 100px;

    img {
      border-radius: 100%;
      transition: all 0.5s ease;
    }
  }
`;

export default Sidebar;
