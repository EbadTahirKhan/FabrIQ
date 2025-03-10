import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";


const NewProduct = () => {
  const [status, setStatus] = useState("enabled");
  const [visibility, setVisibility] = useState("visible");
  const [manageStock, setManageStock] = useState(false);

  return (
    <div className="flex justify-between ml-[220px] w-[calc(%-0px)] bg-black min-h-screen">
    <div className="flex justify-between p-6 ml-[0px] w-[calc(300%-0px)] bg-gray-100 min-h-screen">
      
      {/*-------------Left Panel: Includes Create a new product & General Section------------------*/}

      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-left block">Create a new product</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <label className="text-lg font-medium mb-3 text-left block">General</label>
          <label className="text-lg font-medium mb-3 text-left block mt-4">Name</label>
          <input type="text" placeholder="Name" className="w-full p-2 border mb-2 rounded" />

          <div className="grid grid-cols-3 gap-4">
            <label className="text-lg font-medium mb-3 text-left block">SKU</label>
            <label className="text-lg font-medium mb-3 text-left block">Price</label>
            <label className="text-lg font-medium mb-3 text-left block">Weight</label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="SKU" className="p-2 border rounded" />
            <input type="text" placeholder="Price (USD)" className="p-2 border rounded" />
            <input type="text" placeholder="Weight (kg)" className="p-2 border rounded" />
          </div>

          <label className="text-lg font-medium mb-3 text-left block">Category</label>
          <a href="#" className="text-blue-500 block  text-left">Select category</a>
          <label className="text-lg font-medium mb-3 text-left block">Tax class</label>
          <select className="w-full p-2 border rounded mt-2">
            <option>None</option>
          </select>

          <div className="mt-4">
            <label className="text-lg font-medium text-left block mb-2">Description</label>
            <textarea className="w-full border border-gray-300 rounded-md p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your description here..."
            ></textarea>
          </div>

        </div >

        <br />

        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
           <label className="text-lg font-medium text-left block mb-2">Media</label>
           <div className="border-2 border-dashed border-gray-300 rounded-md flex justify-center items-center h-48 w-48 cursor-pointer">
           <FaCamera className="text-teal-600 text-3xl" />
           </div>
        </div>

        <br />

  {/*--------------------------Search Engine Optimization DIV ----------------------------------*/}

        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
           <h2 className="text-lg font-medium text-left block mb-2">Search Engine Optimization</h2>
           <label className="text-left block font-medium mb-1">Url Key</label>
           <input type="url" className="w-full p-1 border mb-2 rounded" />
           <label className="text-left block font-medium mb-1">Meta Title</label>
           <input type="text" className="w-full p-1 border mb-2 rounded" />
           <label className="text-left block font-medium mb-1">Meta Keywords</label>
           <input type="text" className="w-full p-1 border mb-2 rounded" />
           <label className="text-left block font-medium mb-1">Meta Description</label>
           <textarea className="w-full border border-gray-300 rounded-md p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <hr className="border-gray-300 mt-6 border-t-4 my-4"/>

        <div className="flex justify-between w-full p-4 ">
           <button className="text-red-500 px-6 py-2" >Cancel</button>
           <button className="text-green-700 px-6 py-2">Save</button>
        </div>

      </div>

{/*-------------Left Panel ENDS: Includes Create a new product & General Section------------------*/}
      

      {/*------------Right Panel: Includes Product Status, Inventory, Attribute Group-----------------*/}

      <div className="w-1/3 flex flex-col space-y-4 ml-8"> 

        {/*---------------------------------------Product Status--------------------------------------*/}

        <div className="bg-white p-4 shadow-lg rounded-lg">
           <h2 className="text-lg font-medium mb-3 text-left block">Product Status</h2> 
           <h3 className="text-md font-medium mt-3 text-left">Status</h3>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={status === "disabled"} onChange={() => setStatus("disabled")} /> Disabled
           </label>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={status === "enabled"} onChange={() => setStatus("enabled")} /> Enabled
           </label>

           <hr className="border-gray-300"/>

           <h3 className="text-md font-medium mt-3 text-left">Visibility</h3>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={visibility === "not_visible"} onChange={() => setVisibility("not_visible")} />Not Visible
           </label>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={visibility === "visible"} onChange={() => setVisibility("visible")} />Visible
           </label>

        </div>
        {/*---------------------------------------Product Status ENDS-----------------------------------*/}


        {/*------------------------------------Inventory-------------------------------------------*/}

        <div className="bg-white p-4 shadow-lg rounded-lg">
           <h2 className="text-lg font-medium mb-3 text-left block">Inventory</h2> 
           <h3 className="text-md font-medium mt-3 text-left">Manage stock?</h3>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={status === "disabled"} onChange={() => setStatus("disabled")} /> No
           </label>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={status === "enabled"} onChange={() => setStatus("enabled")} /> Yes
           </label>

           <hr className="border-gray-300"/>

           <h3 className="text-md font-medium mt-3 text-left">Stock availability</h3>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={visibility === "not_visible"} onChange={() => setVisibility("not_visible")} />No
           </label>
           <label className="text-left block">
             <input className="m-2" type="radio" checked={visibility === "visible"} onChange={() => setVisibility("visible")} />Yes
           </label>

           <hr className="border-gray-300"/>

           <label className="text-left block font-medium mb-1 mt-2">Quantity</label>
           <input type="Number" className="w-full p-1 border mb-1 rounded" />

        </div>
        {/*------------------------------------Inventory ENDS-------------------------------------------*/}


        {/*-----------------------------------ATTRIBUTE GROUP-------------------------------------- */}

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-medium mb-3 text-left block">ATTRIBUTE GROUP</h2>
          <input type="Number" placeholder = "Default" className="w-full p-1 border mb-1 rounded" />

          <hr className="border-gray-300 mt-3"/>

          <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm mt-2">

            <h2 className="text-lg font-medium mb-3 text-left">ATTRIBUTES</h2>
            <table className="w-full border border-gray-200">
               <tbody>
                 <tr className="border-b">
                 <td className="p-2 font-medium text-gray-700">Color</td>
                 <td className="p-2">
                 <select className="w-full p-2 border rounded">
                    <option>Please select</option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Green</option>
                 </select>
                 </td>
                 </tr>
                 <tr>
                 <td className="p-2 font-medium text-gray-700">Size</td>
                 <td className="p-2">
                 <select className="w-full p-2 border rounded">
                    <option>Please select</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                 </select>
                 </td>
                 </tr>
               </tbody>
            </table>
          </div>
        {/*-----------------------------------ATTRIBUTE GROUP ENDS-------------------------------------- */}

        </div>
        {/*------------Right Panel ENDS: Includes Product Status, Inventory, Attribute Group-------------*/}

      </div>
    </div>
    </div>
  );
};

export default NewProduct;