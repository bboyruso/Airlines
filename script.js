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

const cleanText = (text) => {
  text = text.replaceAll("id", "Flight");
  text = text.replace(/\W/g, " ");
  text = text.replace(/ {1,}/g, " ");
  text = text.replaceAll("cost", "has a cost of");
  text = text.replaceAll("layover", "");
  text = text.replaceAll("true", "and has a layover.");
  text = text.replaceAll("false", "and doesn't has a layover.");
  return text.replaceAll(".", ".\n");
};

const alertInvalidInput = () => {
  alert(`Invalid data input.`);
  addFlights();
};

const checkIsLetter = (input) => {
  const letters = /^[A-Za-z]+$/;
  if (!input.match(letters)) {
    alertInvalidInput();
  }
};

const showFlights = () => {
  const myJSON = JSON.stringify(flights);
  let res = cleanText(myJSON);
  alert(`Showing all flights : \n${res}`);
};

const leaveOrStay = () => {
  if (window.confirm("Do you really want to leave?")) {
    alert(`Thanks for Visiting!`);
    window.open("https://github.com/bboyruso");
  } else startMenu();
};

const greeting = () => {
  const sign = window.prompt("What is your name?");
  if (sign === null) {
    greeting();
    return;
  } else {
    alert(`Welcome ${sign} !`);
  }
};

const startMenu = () => {
  const adminOrUser = window.prompt("Are you ADMIN or USER?");
  if (adminOrUser === null) {
    leaveOrStay();
  } else if (adminOrUser.toUpperCase() === "ADMIN") {
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
  alert(
    `We find ${
      choosePrice.length
    } flights for you with price ${price} or below :\n${cleanText(myJSON)}`
  );
  leaveOrStay();
};

const deleteFlights = () => {
  if (flights.length === 0) {
    alert(`There is no flights`);
    signInAdmin();
    return;
  }

  showFlights();
  const deleteNum =
    window.prompt(`Please type Id number of the flight you want to delete.
  `);

  if (deleteNum === null) {
    signInAdmin();
  }

  const findID = flights.findIndex(
    (flight) => flight.id === parseInt(deleteNum)
  );
  if (findID < 0) {
    alert(`Flight with id: ${deleteNum} doesn't exist`);
    deleteFlights();
  }

  flights.splice(findID, 1);
  deleteFlights();
};

const addFlights = () => {
  if (flights.length < 15) {
    const from = window.prompt(`Adding flight from?`);
    if (from === null) {
      signInAdmin();
    }
    checkIsLetter(from);
    const to = window.prompt(`Destination is to?`);
    if (to === null) {
      signInAdmin();
    }
    checkIsLetter(to);
    const price = window.prompt(`Prise of flight is?`);
    if (!Number.isInteger(parseInt(price))) {
      alertInvalidInput();
    }

    const layover = window.prompt(`
The flight has layover?
type : true or false`);
    if (layover === null) {
      signInAdmin();
    } else if (layover.toLowerCase() === "true") {
      layover = !!"false";
    } else if (layover.toLowerCase() === "false") {
      layover = false;
    } else {
      alertInvalidInput();
    }

    if (flights.length === 0) {
      flights.push({
        id: 0,
        to: to,
        from: from,
        cost: parseInt(price),
        layover: layover,
      });
    } else {
      flights.push({
        id: flights[flights.length - 1].id + 1,
        to: to,
        from: from,
        cost: parseInt(price),
        layover: layover,
      });
    }

    alert(`
    Flight was added!`);
    addFlights();
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
  `);
  if (addDelete === null) {
    startMenu();
  } else if (addDelete.toUpperCase() === "ADD") {
    addFlights();
  } else if (addDelete.toUpperCase() === "DELETE") {
    deleteFlights();
  } else leaveOrStay();
};

greeting();
startMenu();
