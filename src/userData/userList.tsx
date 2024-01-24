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
    if (tableRef.current) {
      $(tableRef.current).DataTable({
        lengthMenu: [10, 25, 50, 75, 100], 
        pageLength: 10, 
        dom: 'lrtip',
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserDataComponent;
