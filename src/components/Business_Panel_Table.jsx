import React from 'react';

const Table = ({ columns, data, selectable, filters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded-md w-1/3"
        />
        {filters && (
          <select className="border p-2 rounded-md">
            {filters.map((filter, index) => (
              <option key={index} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-center">
            {selectable && <th className="p-2">⚪</th>}
            {columns.map((col, index) => (
              <th key={index} className="p-2 text-center">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t text-center">
                {selectable && (
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-2">{row[col]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4 text-center text-gray-500">
                There is no data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
