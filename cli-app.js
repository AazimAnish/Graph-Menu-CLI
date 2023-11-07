const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  registerPerson(firstName, lastName, dob) {
    // Using a combination of first and last name as the key to handle duplicates
    this.nodes.set(`${firstName} ${lastName}`, {
      firstName,
      lastName,
      dob,
    });
    console.log("Person registered.");
    this.showMenu(); // Go back to the menu after registering
  }

  contactUs() {
    console.log("Name: Aazim Anish, Email: aazimanish1@gmail.com, Phone: 9562037068");
    this.showMenu(); // Go back to the menu after showing contact details
  }

  addShipment() {
    rl.question("Enter Tracking ID (8 digits): ", trackId => {
      if (trackId.length === 8) {
        rl.question("Enter Phone Number (10 digits): ", phoneNo => {
          if (phoneNo.length === 10 && /^\d{10}$/.test(phoneNo)) {
            console.log("Your shipment is currently in Kochi and will be out for delivery within 2 days.");
            this.showMenu();
          } else {
            console.log("Invalid phone number. It must be 10 digits.");
            this.addShipment(); // Retry the process
          }
        });
      } else {
        console.log("Invalid Tracking ID. It must be 8 digits.");
        this.addShipment(); // Retry the process
      }
    });
  }


  adminSearch(name) {
    let found = false;
    this.nodes.forEach((value, key) => {
      if (key.includes(name)) {
        console.log(`\nDetails for ${key}:`);
        console.log(`First Name: ${value.firstName}`);
        console.log(`Last Name: ${value.lastName}`);
        console.log(`DOB: ${value.dob}`);
        found = true;
      }
    });

    if (!found) {
      console.log("No person found with that name.");
    }

    this.showMenu(); // Go back to the menu after searching
  }

  showMenu() {
    console.log("\nMenu:");
    console.log("1. Register Person");
    console.log("2. Contact Us");
    console.log("3. Track Delivery");
    console.log("4. Admin Search");
    console.log("5. Exit");

    rl.question("Choose an option: ", (option) => {
      switch (option) {
        case "1":
          this.promptForPersonDetails();
          break;
        case "2":
          this.contactUs();
          break;
        case "3":
          this.promptForShipmentDetails();
          break;
        case "4":
          this.promptForAdminSearch();
          break;
        case "5":
          rl.close();
          break;
        default:
          console.log("Invalid option. Please choose a valid option.");
          this.showMenu();
      }
    });
  }

  promptForPersonDetails() {
    rl.question("Enter first name: ", firstName => {
      rl.question("Enter last name: ", lastName => {
        rl.question("Enter date of birth: ", dob => {
          this.registerPerson(firstName, lastName, dob);
        });
      });
    });
  }

  promptForShipmentDetails() {
      rl.question("Enter shipment ID: ", shipmentId => {
        this.addShipment(shipmentId);
      });
  }

  promptForAdminSearch() {
    rl.question("Enter first or last name to search: ", name => {
      this.adminSearch(name);
    });
  }
}

const graph = new Graph();

console.log("Welcome to the interactive system!");
graph.showMenu();
