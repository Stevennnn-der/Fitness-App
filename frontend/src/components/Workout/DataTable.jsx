import React, { useState } from "react";
import "./DataTable.css";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const DataTable = () => {
  // Initialize the state with 5 rows and 5 columns of empty strings
  const [numRow, setNumRow] = useState(4);
  const [numCol, setNumCol] = useState(4);
  const [data, setData] = useState(() => {
    const rows = new Array(numRow)
      .fill(null)
      .map(() => new Array(numCol).fill(""));
    rows[0][0] = "Actions";
    rows[0][1] = "Set 1";
    rows[0][2] = "Set 2";
    return rows;
  });

  // Handle input change
  const handleInputChange = (value, row, col) => {
    // Update the specific cell with the new value
    const updatedData = data.map((rowData, rowIndex) => {
      if (rowIndex === row) {
        return rowData.map((cellData, colIndex) => {
          if (colIndex === col) {
            return value;
          }
          return cellData;
        });
      }
      return rowData;
    });

    setData(updatedData);
  };

  return (
    <table className="workout-table">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                style={{
                  padding: "0",
                  height: rowIndex === numRow - 1 ? "0.5em" : "3em",
                  backgroundColor: (rowIndex === numRow - 1 || colIndex === numCol - 1) ? '#F0F3F8' : '',
                }}
              >
                {(rowIndex === 0 && colIndex === numCol - 1) ||
                (rowIndex === numRow - 1 && colIndex === 0) ? (
                  <div className="add">
                    <AddBoxOutlinedIcon
                      style={{
                        cursor: "pointer",
                        transform: "scale(0.9)",
                        margin: "2px",
                      }}
                    />
                    {rowIndex === numRow - 1 && <p>New</p>}
                  </div>
                ) : (
                  <input
                    className="input-box"
                    type="text"
                    value={cell}
                    readOnly={
                      rowIndex === 0 ||
                      colIndex === numCol - 1 ||
                      rowIndex === numRow - 1
                    }
                    onChange={(e) =>
                      handleInputChange(e.target.value, rowIndex, colIndex)
                    }
                    style={{
                      width: colIndex === numCol - 1 ? "3em" : colIndex === 0 ? "15em" : "12em",
                      height: rowIndex === numRow - 1 ? "0.5em" : "2em",
                      backgroundColor: (rowIndex === numRow - 1 || colIndex === numCol - 1) ? '#F0F3F8' : '',
                    }}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
