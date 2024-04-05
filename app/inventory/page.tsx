"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { plus } from "../utils/Icons";
import InventoryContent from "../InventoryContent/InventoryContent";
import { useGlobalState } from "../context/globalProvider";
import CreateInventoryItem from "../Components/Modals/CreateInventoryItem";
import InventoryModal from "../Components/Modals/InventoryModal";

interface Props {
  item: string;
  InventoryItem: any[];
}
function Page({ item, InventoryItem }: Props) {
  const { theme, isLoading, fetchAllInventoryItems , openModal, modal} = useGlobalState();


  useEffect( () => {
    console.log("Fetch all inventory items")
    fetchAllInventoryItems()
  }, [])

  return (
    // <div>
    //   {isLoading ? "true" : "false"}
      <InventoryStyled theme={theme}>
         {modal && <InventoryModal content={<CreateInventoryItem />} />}
         <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 800 }}>
          {item}
        </h1>
        
        <button className="create-item" onClick={openModal}>
          {plus}
          Add New Inventory Item
        </button>
        </div>

        <div className="inventoryitem grid mt-5">

        {InventoryItem && Array.isArray(InventoryItem) && InventoryItem.map((inventory) => (
  <InventoryContent
    key={inventory.id}
    item={inventory.item}
    quantity={inventory.quantity}
    supplier={inventory.supplier}
    stockinDate={inventory.stockinDate}
    id={inventory.id}
  />
))}

        </div>
      </InventoryStyled>
    // </div>
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

  .create-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 22rem;
    height: 4rem;
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
