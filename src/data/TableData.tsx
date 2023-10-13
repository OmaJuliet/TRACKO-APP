import Table from "../components/members/Table";

const data = [
  {
    memberName: "Dev Engineer",
    memberID: "1DNFEA3",
    role: "PROJECT MANAGER",
    startDate: "NOV 2020 - MAY 2021",
    status: "ACTIVE",
  },
  {
    memberName: "Juliet Ofoegbu",
    memberID: "1DNFEA3",
    role: "FRONTEND DEVELOPER",
    startDate: "NOV 2020 - MAY 2021",
    status: "ACTIVE",
  },
  {
    memberName: "Jane Doe",
    memberID: "1DNFDHF",
    role: "BACKEND DEVELOPER",
    startDate: "NOV 2020 - MAY 2021",
    status: "ACTIVE",
  },
  {
    memberName: "Dan Mike",
    memberID: "1DNFEA3",
    role: "PROJECT MANAGER",
    startDate: "NOV 2020 - MAY 2021",
    status: "DORMANT",
  },
  {
    memberName: "Dan Mike",
    memberID: "1DNFEA3",
    role: "PRODUCT DESIGNER",
    startDate: "NOV 2020 - MAY 2021",
    status: "ACTIVE",
  },
  {
    memberName: "Mike Bell",
    memberID: "1DNFEA3",
    role: "SOFTWARE TESTER",
    startDate: "NOV 2020 - MAY 2021",
    status: "DORMANT",
  }
];

function TableData() {
  return (
    <section className="container pb-8 px-2 mx-auto w-10/12">
      <Table data={data} />
    </section>
  );
}

export default TableData;