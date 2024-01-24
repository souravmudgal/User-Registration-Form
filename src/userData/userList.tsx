// UserDataComponent.tsx
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as jQuery from "jquery";
import "datatables.net";  
import "datatables.net-dt/css/jquery.dataTables.css";  

const $ = jQuery as any;

function UserDataComponent() {
  const formDataList = useSelector((state: any) => state.registerData.formDataList);

  const tableRef = useRef(null);

  useEffect(() => {
    // Initialize DataTable when the component mounts
    if (tableRef.current) {
      // Using DataTable options for better customization
      $(tableRef.current).DataTable({
        lengthMenu: [10, 25, 50, 75, 100], // Number of records to show per page
        pageLength: 10, // Default number of records per page
        dom: 'lrtip', // Placement of elements (l: length menu, r: processing, t: table, i: information, p: pagination)
        language: {
          info: "Showing _START_ to _END_ of _TOTAL_ entries",
          infoEmpty: "No entries found",
          search: "Search:",
          lengthMenu: "Show _MENU_ entries",
          paginate: {
            first: "First",
            previous: "Previous",
            next: "Next",
            last: "Last"
          }
        }
      });
    }
  }, [formDataList]);

  
  return (
    <>
      <table ref={tableRef} id="dataTable" className="display">
        <thead>
          <tr>
          <th className="">Name</th>
            <th className="">Age</th>
            <th className="">Sex</th>
            <th className="">Mobile</th>
            <th className="">Id type</th>
            <th className="">Id</th>
            <th className="">Address</th>
            <th className="">State</th>
            <th className="">City</th>
            <th className="">Country</th>
            <th className="">Pincode</th>
            {/* Add more columns based on your form fields */}
          </tr>
        </thead>
        <tbody>
          {formDataList.map((formData: any, index: any) => (
            <tr key={index}>
                        <td className="border ">{formData.name || "N/A"}</td>
              <td className="border ">{formData.age || "N/A"}</td>
              <td className="border ">{formData.sex || "N/A"}</td>
              <td className="border ">{formData.mobile || "N/A"}</td>
              <td className="border ">{formData.idType || "N/A"}</td>
              <td className="border ">{formData.govtId || "N/A"}</td>
              <td className="border ">{formData.address || "N/A"}</td>
              <td className="border ">{formData.state || "N/A"}</td>
              <td className="border ">{formData.city || "N/A"}</td>
              <td className="border ">{formData.country || "N/A"}</td>
              <td className="border ">{formData.pincode || "N/A"}</td>
              {/* Add more cells based on your form fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserDataComponent;
