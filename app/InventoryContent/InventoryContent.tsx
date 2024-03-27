"use client"
import React from 'react'

interface Props {
  item:string;
  inventory:any;
}

function InventoryContent({inventory}:Props) {
  console.log(inventory)
  const {item, quantity, supplier, stockinDate, id} = inventory;
  return (
    <div>
      <h1>{item}</h1>
      <p>{quantity}</p>
      <p>{supplier}</p>
      <p> {stockinDate}</p>
    </div>
  )
}

export default InventoryContent