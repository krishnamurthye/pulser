"use client";

const ChildContactCard = () => {
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
        {childData.firstName + " " + childData.firstName}
      </h2>
      <p>School: {childData.school}</p>
      <p>Grade: {childData.grade}</p>
      <p>Language: {childData.language}</p>
      <p>Start Date: {childData.startDate}</p>
      <p>End Date: {childData.endDate}</p>
      <p>Status: {childData.status}</p>
      <p>Progress: {childData.progress}</p>
      <p>Rating: {childData.rating}</p>
    </div>
  );
};

export default ChildContactCard;
