const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
  { id: 07, to: "Shanghai", from: "Barcelona", cost: 800, layover: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
];

const showFlights = () => {
  const myJSON = JSON.stringify(flights);
  alert(`Showing all flights :
  ${myJSON}`);
};

const leaveOrStay = () => {
  if (window.confirm("Do you really want to leave?")) {
    alert(`Thanks for Visiting!`);
    window.open("https://github.com/bboyruso");
  } else startMenu();
};

const greeting = () => {
  const sign = window.prompt("What is your name?");
  alert(`Welcome ${sign} !`);
};

const startMenu = () => {
  const adminOrUser = window.prompt("Are you ADMIN or USER?");

  if (adminOrUser.toUpperCase() === "ADMIN") {
    signInAdmin();
  } else if (adminOrUser.toUpperCase() === "USER") {
    signInUser();
  } else {
    alert(`You should chose ADMIN or USER.`);
    startMenu();
  }
};

const signInUser = () => {
  alert(`You are in the USER menu.`);
  showFlights();
  const price = window.prompt("What is the max price per flight");
  const choosePrice = flights.filter((flights) => flights.cost <= price);
  if (choosePrice.length === 0) {
    alert(`Here is 0 matches in your query`);
    signInUser();
  }
  const myJSON = JSON.stringify(choosePrice);
  alert(myJSON);
  leaveOrStay();
};

const deleteFlights = () => {
  showFlights();
  const deleteNum = window.prompt(`Which flight do you want to delete?
  0 - Its a first flight from the top of list
  ${flights.length - 1} - Its the last flight from the top of the list
  Type any number from 0 to ${flights.length - 1}  
  `);
  flights.splice(deleteNum, 1);
  signInAdmin();
};

const addFlights = () => {
  if (flights.length < 15) {
    const from = window.prompt(`Adding flight from?`);
    const to = window.prompt(`Destination is to?`);
    const price = window.prompt(`Prise of flight is?`);
    let layover = window.prompt(`
The flight has layover?
type : true or false`);
    if (layover.toLowerCase() === "true") {
      layover = !!"false";
    } else if (layover.toLowerCase() === "false") {
      layover = false;
    }

    flights.push({
      id: flights[flights.length - 1].id + 1,
      to: to,
      from: from,
      cost: parseInt(price),
      layover: layover,
    });
    alert(`
    Flight was added!`);
    signInAdmin();
  } else {
    alert(`The maximum of flights is 15!`);
    signInAdmin();
  }
};

const signInAdmin = () => {
  alert(`You are in the ADMIN menu.`);
  const addDelete = window.prompt(`
  For delete flights type : DELETE
  For ADD flights type : ADD
  Back to Main menu type : M
  
  `);

  if (addDelete.toUpperCase() === "ADD") {
    addFlights();
  } else if (addDelete.toUpperCase() === "DELETE") {
    deleteFlights();
  } else if (addDelete.toUpperCase() === "M") {
    startMenu();
  } else leaveOrStay();
};

greeting();
startMenu();
