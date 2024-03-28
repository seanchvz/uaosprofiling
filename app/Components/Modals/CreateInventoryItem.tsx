import { useGlobalState } from "@/app/context/globalProvider";
import { useInventoryGlobalState } from "@/app/context/InventoryGlobalProvider";
import { add } from "@/app/utils/Icons";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

function CreateInventoryItem() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0); // initialize with 0
  const [supplier, setSupplier] = useState("");
  const [stockinDate, setStockinDate] = useState("");
  const [userId, setUserId] = useState("");

  const {fetchAllInventoryItems, closeModal}= useGlobalState();

  const handleChange = (item: string) => (e: any) => {
    switch (item) {
      case "item":
        setItem(e.target.value);
        break;
      case "quantity":
        setQuantity(parseInt(e.target.value, 10)); // sets the base value to 10 or decimal
        break;
      case "supplier":
        setSupplier(e.target.value);
        break;
        case "stockinDate":
          console.log("Stock-in Date value:", e.target.value);
          setStockinDate(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const inventoryitem = {
      item,
      quantity,
        supplier,
        stockinDate,
        userId,
    };
    try {
      const res = await axios.post("/api/inventory", inventoryitem);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Item created successfully.");
        fetchAllInventoryItems();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
    <div>
    <div className="mb-8"> {/* Add margin-bottom */}
    <h1 className="text-4xl font-bold mb-4">Create an Inventory Item</h1> {/* Add margin-bottom */}
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="input-control">
        <label htmlFor="item">Item Name</label>
        <input
          type="text"
          id="item"
          value={item}
          name="item"
          onChange={handleChange("item")}
          placeholder="Enter Item Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      <div className="input-control">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          name="quantity"
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          placeholder="Enter Quantity"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      <div className="input-control">
        <label htmlFor="supplier">Supplier</label>
        <input
          type="text"
          id="supplier"
          value={supplier}
          name="supplier"
          onChange={handleChange("supplier")}
          placeholder="Enter Supplier Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>

      <div className="input-control">
        <label htmlFor="stockinDate" className="block">
          Stock-in Date
        </label>
        <input
          type="date"
          id="stockinDate"
          value={stockinDate}
          name="stockinDate"
          onChange={handleChange("stockinDate")}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
      </div>
      <div className="submit-btn mt-4 flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          {add}
          Create Item
        </button>
      </div>
    </div>
    </div>
    </form>
  );
}


const CreateInventoryItemStyled = styled.form`
> h1 {
  font-size: clamp(1.2rem, 5vw, 1.6rem);
  font-weight: 600;
}

color: ${(props) => props.theme.colorGrey1};

.input-control {
  position: relative;
  margin: 1.6rem 0;
  font-weight: 500;

  @media screen and (max-width: 450px) {
    margin: 1rem 0;
  }

  label {
    margin-bottom: 0.5rem;
    display: inline-block;
    font-size: clamp(0.9rem, 5vw, 1.2rem);

    span {
      color: ${(props) => props.theme.colorGrey3};
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;

    resize: none;
    background-color: ${(props) => props.theme.colorGreyDark};
    color: ${(props) => props.theme.colorGrey2};
    border-radius: 0.5rem;
  }
}

.submit-btn button {
  transition: all 0.35s ease-in-out;

  @media screen and (max-width: 500px) {
    font-size: 0.9rem !important;
    padding: 0.6rem 1rem !important;

    i {
      font-size: 1.2rem !important;
      margin-right: 0.5rem !important;
    }
  }

  i {
    color: ${(props) => props.theme.colorGrey0};
  }

  &:hover {
    background: ${(props) => props.theme.colorPrimaryGreen} !important;
    color: ${(props) => props.theme.colorWhite} !important;
  }
}
`;

export default CreateInventoryItem;
