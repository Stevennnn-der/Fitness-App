import React, { useEffect, useState } from "react";
import "./DataTable.css";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const DataTable = ({ numRow, setNumRow, numCol, setNumCol, data, setData }) => {
  useEffect(() => {
    
    setData(() => {
      console.log(data.length);
      
      const dtRowLen = numRow - data.length;
      const dtColLen = numCol ;
      const diffRow = numRow - dtRowLen;
      const diffCol = numCol - dtColLen;

      console.log(diffRow);
      console.log(diffCol);
      const rows = data.map((row) => row.slice());
      if (diffRow > 0) {
        rows.forEach((row) => {
          for (let i = 0; i < diffCol; i++) {
            row.push(`Set${data[0].length - 1 + i}`);
          }
        });
      }

      if (diffCol > 0) {
        for (let i = 0; i < diffRow; i++) {
          rows.push(new Array(numCol).fill(""));
        }
      }
      return rows;
    });
  }, [numRow, numCol]);
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

  const updateTable = (rowIndex, colIndex) => {
    if (rowIndex === 0) {
      setNumCol(numCol + 1);
    } else if (colIndex === 0) {
      setNumRow(numRow + 1);
    }
  };

  return (
    <div className="workout-table-container">
      <table className={`workout-table${numCol > 4 ? " scroll" : ""}`}>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: "0",
                    height: rowIndex === numRow - 1 ? "0.5em" : "3em",
                    backgroundColor:
                      rowIndex === numRow - 1 || colIndex === numCol - 1
                        ? "#F0F3F8"
                        : "",
                  }}
                >
                  {(rowIndex === 0 && colIndex === numCol - 1) ||
                  (rowIndex === numRow - 1 && colIndex === 0) ? (
                    <div className="add">
                      <div
                        className="add-container"
                        onClick={() => updateTable(rowIndex, colIndex)}
                      >
                        <AddBoxOutlinedIcon
                          style={{
                            transform: "scale(0.9)",
                            margin: "2px",
                          }}
                        />
                        {rowIndex === numRow - 1 && <p>New</p>}
                      </div>
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
                        width:
                          colIndex === numCol - 1
                            ? "3em"
                            : colIndex === 0
                            ? "15em"
                            : "12em",
                        height: rowIndex === numRow - 1 ? "0.5em" : "2em",
                        backgroundColor:
                          rowIndex === numRow - 1 || colIndex === numCol - 1
                            ? "#F0F3F8"
                            : "",
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
