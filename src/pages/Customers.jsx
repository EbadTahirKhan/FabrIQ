import React from 'react';
import Table from '../components/Business_Panel_Table';

const Customers = () => {
  return (
    <div className="p-6 w-[85%] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <Table
        columns={["Full Name", "Email", "Status", "Created At"]}
        data={[]}
        selectable={true}
        filters={[{ label: "Select Status", value: "select" }, 
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" }]}
      />
    </div>
  );
};

export default Customers;
