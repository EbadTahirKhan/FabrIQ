import React from 'react';
import Table from '../components/Business_Panel_Table';

const Orders = () => {
  return (
    <div className="p-6 w-[85%] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <Table
        columns={['Order Number', 'Date', 'Customer Email', 'Shipment Status', 'Payment Status', 'Total']}
        data={[]}
        selectable={true}
        filters={[{ label: "Select Status", value: "select" }, 
          { label: "Payment Status", value: "payment" },
          { label: "Shipment Status", value: "shipment" }]}
      />
    </div>
  );
};

export default Orders;
