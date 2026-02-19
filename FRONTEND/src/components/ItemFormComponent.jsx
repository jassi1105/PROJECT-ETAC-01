import React from 'react'
import "./customerform.css";
import {useState} from "react"
import {addNewItemService} from "../fetch2";
import { showSuccess, showError } from "../toast";

const ItemFormComponent = ({onClose,data,sendData}) => {
      const initialItemState = {
        itemName: "",
        price: "",
        quantity: "1",
      };



    
      const [newItemdata, setnewItemdata] = useState(initialItemState);
    
      const handlechange = (e) => {
        const { name, value } = e.target;
        setnewItemdata((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handlesubmit = async (e) => {
        e.preventDefault();
          const datatosend = {
            itemdata: newItemdata,
            customerId: data,
        };
    
        try {

          const { response, data } = await addNewItemService(datatosend);
          if (!response.ok) {
            showError(data?.error || "Failed to add item");
            return;
          }
    
        showSuccess("Added New Item Successfully");
        sendData(data.customer)
        setnewItemdata(initialItemState);
        setTimeout(()=>{onClose();}, 1000)
        
    
        }  catch (error) {
               console.error("handleSubmit error:", error);
               showError(error?.message || "Something went wrong. Please try again later.");
        }
      };
      
  return (
 <div className="modal-overlay"
 onClick={(e) => e.stopPropagation()} >
      <div
        className="modal-container"
        
      >
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="modal-title">Add New Item</h2>

        <form className="modal-form" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Item Name"
            name="itemName"
            value={newItemdata.itemName}
            onChange={handlechange}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            name="price"
            value={newItemdata.price}
            onChange={handlechange}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={newItemdata.quantity}
            onChange={handlechange}

          />

          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  )
}

export default ItemFormComponent
