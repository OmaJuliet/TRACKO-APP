import { AiOutlineCloseSquare } from "react-icons/ai";
import { GoCheckbox } from "react-icons/go";


type TableRow = {
  memberName: string;
  memberID: string;
  role: string;
  startDate: string;
  status: string;
};

type TableProps = {
  data: TableRow[];
};


const Members: React.FC<TableProps> = ({ data }) => {
  return (
    <>
      <section className="container px-2 mx-auto lg:pl-36 pt-6 pb-5">
      <h2 className="text-xl mb-4 text-gray-700 flex justify-center font-medium">Team Members</h2>
        <table className="table-auto w-full border-separate border-spacing-y-2">
          <thead className="mb-1">
            <tr className="text-gray-600">
              <th className="py-3 px-6 font-medium text-left uppercase">name</th>
              <th className="py-3 px-6 font-medium text-left uppercase">id</th>
              <th className="py-3 px-6 font-medium text-left uppercase">Role</th>
              <th className="py-3 px-6 font-medium text-left uppercase">Start date</th>
              <th className="py-3 px-6 font-medium text-left uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, index) => (
              <tr key={index} className="bg-gray-100 mb-2 border border-slate-600 rounded">
                <td className="p-4 ">{item.memberName}</td>
                <td className="p-4 text-base">{item.memberID}</td>
                <td className={`p-4 ${getCategoryStyles(item.role)}`}>{item.role}</td>
                <td className="p-4 text-base">{item.startDate}</td>
                <td className={`p-4 text-base flex items-center ${getStatusStyles(item.status).textColorClass}`}>
                  {getStatusStyles(item.status).iconComponent}
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* members page pagination */}
      <section className="flex justify-center items-center bg-white py-1">
        <p className="px-3 py-2 text-xl text-gray-400 font-semibold cursor-pointer">
          &lt;&lt;
        </p>
        <p className="px-3 py-2 text-xl text-gray-400 font-semibold cursor-pointer">
          &lt;
        </p>
        <p className="px-3 py-2 text-blue-500 font-semibold text-lg cursor-pointer">
          1
        </p>
        <p className="px-3 py-2 text-gray-400 font-semibold text-lg cursor-pointer">
          2
        </p>
        <p className="px-3 py-2 text-gray-400 font-semibold text-lg cursor-pointer">
          3
        </p>
        <p className="px-3 py-2 text-gray-400 font-semibold text-lg cursor-pointer">
          4
        </p>
        <p className="px-3 py-2 text-gray-400 font-semibold text-lg cursor-pointer">
          5
        </p>
        <p className="px-3 py-2 text-gray-400 font-semibold text-lg cursor-pointer">
          ...
        </p>
        <p className="px-3 py-2 text-gray-400 font-semibold text-lg cursor-pointer">
          10
        </p>
        <p className="px-3 py-2 font-semibold text-gray-700 text-xl cursor-pointer">
          &gt;
        </p>
        <p className="px-3 py-2 font-semibold text-gray-700 text-xl cursor-pointer">
          &gt;&gt;
        </p>
      </section>
    </>
  );
};

// logic to set background color and text color for each member's role
function getCategoryStyles(role: string) {
  switch (role) {
    case "PROJECT MANAGER":
      return "text-green-800 bg-green-100";
    case "FRONTEND DEVELOPER":
      return "text-blue-700 bg-blue-100";
    case "BACKEND DEVELOPER":
      return "text-yellow-800 bg-yellow-100";
    case "PRODUCT DESIGNER":
      return "text-purple-700 bg-purple-100";
    case "SOFTWARE TESTER":
      return "text-indigo-700 bg-indigo-100";
    default:
      return "";
  }
}

// logic to set text color of statuses and icon
function getStatusStyles(status: string) {
  switch (status) {
    case "ACTIVE":
      return { textColorClass: "text-green-400", iconComponent: <GoCheckbox className="inline-block mr-3 text-2xl" /> };
    case "DORMANT":
      return { textColorClass: "text-red-500", iconComponent: <AiOutlineCloseSquare className="inline-block mr-3 text-2xl" /> };
    default:
      return { textColorClass: "", iconComponent: null };
  }
}

export default Members;
