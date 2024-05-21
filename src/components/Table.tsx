import Pagination from "./Pagination";

interface Row {
  department: string;
  region: string;
  position: string;
  itemNumber: string;
  startDate: string;
  endDate: string;
  school: string;
  buttonId: string;
}

interface TableProps {
  currentPage: string;
}

const Table = async ({ currentPage }: TableProps) => {
  const response = await fetch(
    `http://localhost:3000/?page=${currentPage}`
  );
  const data = await response.json();
  const tableData: Row[] = await data.data;
  const totalPages = await data.totalPages;

  const renderTableData = () => {
    return tableData.map((row, index) => (
      <tr key={index}>
        <td>{row.department}</td>
        <td>{row.region}</td>
        <td>{row.position}</td>
        <td>{row.itemNumber}</td>
        <td>{row.startDate}</td>
        <td>{row.endDate}</td>
        <td>{row.school}</td>
        <td>
          <a
            href={`https://csc.gov.ph/career/job/${row.buttonId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Details
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Region</th>
            <th>Position</th>
            <th>Item Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>School</th>
            <th>Button ID</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages}></Pagination>
    </div>
  );
};

export default Table;
