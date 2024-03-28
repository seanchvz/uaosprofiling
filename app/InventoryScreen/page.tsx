"use client";
import React from 'react';
import { useGlobalState } from '../context/globalProvider';
import Page from '../inventory/page';

export default function InventoryScreen() {
  const { InventoryItem } = useGlobalState(); // Assuming InventoryItem is the state you want to access
  return (
    <Page item="All Items" InventoryItem={InventoryItem} />
  );
}
