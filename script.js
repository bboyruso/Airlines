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
  text = text.replace(/\b\id/g, "Flight");
  text = text.replace(/\W/g, " ");
  text = text.replace(/ {1,}/g, " ");
  text = text.replaceAll("cost", "has a cost of");
  text = text.replaceAll("layover", "");
  text = text.replaceAll("true", "and has a layover.");
  text = text.replaceAll("false", "and doesn't has a layover.");
  return text.replaceAll(".", ".\n");
};

const alertInvalidInput = () => {
  alert(`Invalid input data.`);
};

const checkIsLetter = (input) => {
  const letters = /^[A-Za-z]+$/;
  if (!input.match(letters)) {
    alertInvalidInput();
    return false;
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
    return;
  } else startMenu();
  return;
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

  const askForPrice = () => {
    const price = window.prompt("What is the max price per flight");
    if (price === null) {
      leaveOrStay();
      return;
    } else if (!Number.isInteger(parseInt(price))) {
      alertInvalidInput();
      askForPrice();
      return;
    }
    const choosePrice = flights.filter((flights) => flights.cost <= price);

    const myJSON = JSON.stringify(choosePrice);
    alert(
      `We find ${
        choosePrice.length
      } flights for you with price ${price} or below :\n${cleanText(myJSON)}`
    );
    leaveOrStay();
  };
  askForPrice();
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
    or press Cancel to back ADMIN menu.
  `);

  if (deleteNum === null) {
    signInAdmin();
    return;
  }

  const findID = flights.findIndex(
    (flight) => flight.id === parseInt(deleteNum)
  );
  if (findID < 0) {
    alert(`Flight with id: ${deleteNum} doesn't exist`);
    return deleteFlights();
  }

  flights.splice(findID, 1);
  alert(`Flight with id: ${deleteNum} was deleted.`);
  return signInAdmin();
};

const addFlights = () => {
  let askForPrice = () => {
    let price = window.prompt(`Price of flight is?`);
    if (!Number.isInteger(parseInt(price))) {
      alertInvalidInput();
      return askForPrice();
    } else return price;
  };
  const askWhere = () => {
    let from = window.prompt(`Adding flight from ?`);
    if (from === null) {
      signInAdmin();
    } else if (checkIsLetter(from) === false) {
      return askWhere();
    } else return from;
  };

  const askToWhere = () => {
    let to = window.prompt(
      `Adding flight with Destination to ? Type destination city`
    );
    if (to === null) {
      signInAdmin();
    } else if (checkIsLetter(to) === false) {
      return askToWhere();
    } else return to;
  };

  const askForLayover = () => {
    let layover = window.prompt(`
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
      return askForLayover();
    }
    return layover;
  };

  if (flights.length < 15) {
    if (flights.length === 0) {
      flights.push({
        id: 0,
      });
    } else {
      flights.push({
        id: flights[flights.length - 1].id + 1,
      });
    }

    flights[flights.length - 1] = {
      id: flights[flights.length - 1].id,
      to: askToWhere(),
      from: askWhere(),
      cost: parseInt(askForPrice()),
      layover: askForLayover(),
    };

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
  For DELETE flights type : D
  For ADD flights type : A
  Press Cancel to back Main menu
  
  `);
  if (addDelete === null) {
    startMenu();
  } else if (addDelete.toUpperCase() === "A") {
    addFlights();
  } else if (addDelete.toUpperCase() === "D") {
    deleteFlights();
  } else {
    alertInvalidInput();
    signInAdmin();
  }
};

greeting();
startMenu();
