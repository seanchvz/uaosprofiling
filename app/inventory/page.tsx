"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import CreateInventoryItem from "../Components/Modals/CreateInventoryItem";
import {
  InventoryGlobalProvider,
  useInventoryGlobalState,
} from "@/app/context/InventoryGlobalProvider";
import { inventory } from "../utils/Icons";
import InventoryItem from "../InventoryContent/InventoryContent";
import InventoryContent from "../InventoryContent/InventoryContent";
import { useGlobalState } from "@/app/context/globalProvider";

interface Props {
  item: string;
  inventoryItem: any[];
}
function Page({ item,inventoryItem }: Props) {
  const { theme, isLoading, fetchAllInventoryItems } = useGlobalState();
  console.log("Inventory Items", inventoryItem);

  useEffect( () => {
    console.log("Fetch all inventory items")
    fetchAllInventoryItems()
  }, [])

  return (
    <div>
      {isLoading ? "true" : "false"}
      <InventoryStyled theme={theme}>
        <h1>{item}</h1>
        <div className="inventoryitem grid">
          
          {inventoryItem &&
            inventoryItem.map((inventory) => (
              <InventoryContent
                key={inventory.id}
                inventory={{ ...inventory }}
                item={""}
              />
            ))}
        </div>
      </InventoryStyled>
    </div>
  );
}

const InventoryStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;

      border-radius: 0.5rem;
    }
  }

  .create-event {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 25rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Page;

// export default function PageWithProvider() {
//   return (
//     <InventoryGlobalProvider>

//       <Page />
//     </InventoryGlobalProvider>
//   );
// }
