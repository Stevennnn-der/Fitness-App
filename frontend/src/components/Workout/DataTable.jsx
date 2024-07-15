import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataTable.css";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

const DataTable = ({
  date,
  numRow,
  setNumRow,
  numCol,
  setNumCol,
  data,
  setData,
  setSubmitMessage,
}) => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("http://localhost:5001/homepage", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(response.data._id);
          // console.log("Response Username ", response);
          const dataTableIndex = response.data.dataTables.findIndex(
            (workout) => workout.workoutDate === date
          );

          // console.log(dataTableIndex);
          const dtRow =
            dataTableIndex !== -1
              ? response.data.dataTables[dataTableIndex].numRow
              : numRow;
          const dtCol =
            dataTableIndex !== -1
              ? response.data.dataTables[dataTableIndex].numCol
              : numCol;

          if (dataTableIndex !== -1) {
            const dataTable = response.data.dataTables[dataTableIndex];
            console.log("DT: ", dataTable);

            if (dataTable) {
              setNumRow(dtRow);
              setNumCol(dtCol);
            }

            setData(() => {
              const rows = new Array(dtRow)
                .fill(null)
                .map(() => new Array(dtCol).fill(""));
              rows[0][0] = "Actions";
              for (let i = 1; i < dtCol; i++) {
                rows[0][i] = `Set ${i} (lb x #)`;
              }

              for (let row = 1; row < dtRow - 1; row++) {
                rows[row][0] = dataTable.data[row - 1].action;
                for (let col = 1; col < dtCol; col++) {
                  rows[row][col] = dataTable.data[row - 1].sets[col - 1]
                    ? dataTable.data[row - 1].sets[col - 1]
                    : "";
                }
              }

              console.log(rows);
              return rows;
            });
          } else {
            setData(() => {
              const rows = new Array(dtRow)
                .fill(null)
                .map(() => new Array(dtCol).fill(""));
              rows[0][0] = "Actions";
              for (let i = 1; i < dtCol; i++) {
                rows[0][i] = `Set ${i} (lb x #)`;
              }

              for (let row = 1; row < dtRow - 1; row++) {
                rows[row][0] = "";
                for (let col = 1; col < dtCol; col++) {
                  rows[row][col] = "";
                }
              }

              console.log(rows);
              return rows;
            });
          }

          // console.log(data);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setData(() => {
      const dtRowLen = data.length;
      const dtColLen = data[0].length;
      const diffRow = numRow - dtRowLen;
      const diffCol = numCol - dtColLen;

      // console.log(data);
      // console.log(data[0]);
      // console.log("Num Row: " + numRow);
      // console.log("Num Col: " + numCol);
      // console.log("Data Row: " + dtRowLen);
      // console.log("Data Col: " + dtColLen);
      // console.log("Diff Row: " + diffRow);
      // console.log("Diff Col: " + diffCol);
      // console.log("");
      const rows = data.map((row) => row.slice());
      if (diffCol > 0) {
        
        rows.forEach((row, index) => {
          row.push(index === 0 ? `Set${dtColLen} (lb x #)` : "");
        });
      } else if (diffCol < 0) {
        rows.forEach((row, index) => {
          row[row.length - 2] = (index === 0) ? row[row.length - 2] : "";
        })
        rows.forEach(row => row.pop())
      }

      if (diffRow > 0) {
        rows.push(new Array(numCol).fill(""));
      } else if (diffRow < 0) {
        rows[rows.length - 2] = rows[rows.length - 2].map(() => '');
        rows.pop();

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

  const addTable = (rowIndex, colIndex) => {
    setSubmitMessage('');
    if (rowIndex === 0) {
      setNumCol(numCol + 1);
    } else if (colIndex === 0) {
      setNumRow(numRow + 1);
    }
  };

  const minusTable = (rowIndex, colIndex) => {
    setSubmitMessage('');
    if (rowIndex === 0) {
      setNumCol(numCol - 1);
    } else if (colIndex === 0) {
      setNumRow(numRow - 1);
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
                      <div className="add-container">
                        <AddBoxOutlinedIcon
                          style={{
                            transform: "scale(0.9)",
                            margin: "2px",
                            cursor: 'pointer'
                          }}
                          onClick={() => addTable(rowIndex, colIndex)}
                        />
                        {(rowIndex === numRow - 1 &&
                          rowIndex >= 4 &&
                          colIndex === 0 && (
                            <p style={{ fontSize: "1em" }}>/</p>
                          )) ||
                          (rowIndex === 0 &&
                            colIndex === numCol - 1 &&
                            colIndex >= 4 && (
                              <p style={{ fontSize: "1em" }}>/</p>
                            ))}
                        {(rowIndex === numRow - 1 &&
                          rowIndex >= 4 &&
                          colIndex === 0 && (
                            <IndeterminateCheckBoxOutlinedIcon
                              style={{
                                transform: "scale(0.9)",
                                margin: "2px",
                                cursor: 'pointer',
                              }}
                              onClick={() => minusTable(rowIndex, colIndex)}
                            />
                          )) ||
                          (rowIndex === 0 &&
                            colIndex === numCol - 1 &&
                            colIndex >= 4 && (
                              <IndeterminateCheckBoxOutlinedIcon
                                style={{
                                  transform: "scale(0.9)",
                                  margin: "2px",
                                  cursor: 'pointer',
                                }}
                                onClick={() => minusTable(rowIndex, colIndex)}
                              />
                            ))}
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
                            ? "6em"
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
