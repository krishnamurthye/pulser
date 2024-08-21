"use client";

const ChildContactCard = ({ child }: any) => {
  // You can replace these placeholder values with actual data from your application state
  const childData = {
    firstName: "Ms. Lopez",
    lastName: "Guv",
    school: "DAS",
    grade: "G4",
    language: "English",
    startDate: "29/08/2023",
    endDate: "30/06/2024",
    status: "Active",
    progress: "In Progress",
    rating: "4.5",
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">
        {child.firstName + " " + child.lastName}
      </h2>
      <p>School: {child.school}</p>
      <p>Grade: {child.grade}</p>
      <p>Language: {child.language}</p>
      <p>Start Date: {child.startDate}</p>
      <p>End Date: {child.endDate}</p>
      <p>Status: {child.status}</p>
      <p>Progress: {child.progress}</p>
      <p>Rating: {child.rating}</p>
    </div>
  );
};

export default ChildContactCard;
