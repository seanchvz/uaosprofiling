"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import styled from 'styled-components';
import { edit, trash } from '../utils/Icons';

interface Props {
  item:string;
  quantity: number;
  supplier: string;
  stockinDate: string;
  id:string;
  // inventory:any;
}

function InventoryContent({item, quantity, supplier, stockinDate, id}:Props) {
  // console.log(inventory)
  const {theme, deleteInventory} = useGlobalState();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <InventoryContentStyled theme={theme}>
      <h1>{item}</h1>
      <p className="sport">Quantity: {quantity}</p>
      <p className='sport'>Supplier: {supplier}</p>
      <p> Stock-in Date: {new Date(stockinDate).toLocaleDateString(undefined, options)}</p>

      <div className="event-footer">
      <button className="edit">{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteInventory(id);
          }}
        >
          {trash}
        </button>
      </div>
    </InventoryContentStyled>
  )
}

const InventoryContentStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem; /* Add margin to the bottom of the heading */
  }

  .date {
    margin-top: auto;
    margin-bottom: 0.5rem; /* Add margin to the bottom of the date */
  }

  .dateend {
    margin-right: auto;
    margin-bottom: 0.5rem; /* Add margin to the bottom of the end date */
  }

  .event-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.5rem;
        color: #ffffff;
      }
    }

    .edit {
      margin-left: auto;
    }
    .isExternal,
    .isInternal {
      display: inline-block;
      padding: 0.4rem 1rem;
      border: 2px solid ${(props) => props.theme.colorDanger};
      border-radius: 0.8rem;
    }
    
    .isInternal {
      border-color: ${(props) => props.theme.colorGreenDark}; 
    }

  .sport {
    background: #002b88 !important;
    border-radius: 10px;
    padding: 0.5rem 1rem; 
  }
`;

export default InventoryContent