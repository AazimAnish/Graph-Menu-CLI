const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.registrationData = {
      firstName: '',
      lastName: '',
      dob: '',
      step: 'firstName',
    };
  }

  addMenuItem(key, text, action) {
    this.nodes.set(key, text);
    this.edges.set(key, action);
  }

  showMenu() {
    console.log('\nMenu:');
    this.nodes.forEach((text, key) => {
      // Check if the current item is a user object and skip its display
      if (typeof text !== 'object') {
        console.log(`${key}. ${text}`);
      }
    });
  
    rl.question('Choose an option: ', (option) => {
      const action = this.edges.get(option);
      if (action) {
        action();
      } else {
        console.log('Invalid option. Please choose a valid option.');
        this.showMenu();
      }
    });
  }
  

  registerPerson() {
    const { step } = this.registrationData;
    if (step === 'firstName') {
      rl.question('Enter first name: ', (firstName) => {
        if (firstName === '*') {
          this.showMenu();
        } else {
          this.registrationData.firstName = firstName;
          this.registrationData.step = 'lastName';
          this.registerPerson();
        }
      });
    } else if (step === 'lastName') {
      rl.question('Enter last name: ', (lastName) => {
        if (lastName === '*') {
          this.registrationData.step = 'firstName';
          this.registerPerson(); // Go back to first name
        } else {
          this.registrationData.lastName = lastName;
          this.registrationData.step = 'dob';
          this.registerPerson();
        }
      });
    } else if (step === 'dob') {
      rl.question('Enter date of birth: ', (dob) => {
        if (dob === '*') {
          this.registrationData.step = 'lastName';
          this.registerPerson(); // Go back to last name
        } else {
          this.registrationData.dob = dob;
          this.registrationData.step = 'firstName'; // Reset to the initial state
          this.storeUserData();
          this.showMenu();
        }
      });
    }
  }
  
  storeUserData() {
    const { firstName, lastName, dob } = this.registrationData;
    if (firstName && lastName && dob) {
      // Store user data
      const user = new Person(firstName, lastName, dob);
      this.nodes.set(`${firstName} ${lastName}`, user);
      console.log('Person registered.');
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Date of birth: ${dob}`);
    } else {
      console.log('Registration data is incomplete. Please fill all fields.');
    }
  }
  

  trackDelivery() {
    console.log('Track Delivery selected.');
    rl.question('Choose tracking method (1 for Tracking ID, 2 for Phone Number): ', (method) => {
      if (method === '1') {
        rl.question('Enter Tracking ID (8 digits): ', (trackId) => {
          if (trackId.length === 8 && /^\d{8}$/.test(trackId)) {
            console.log('Your shipment is currently in Kochi and will be out for delivery within 2 days.');
          } else {
            console.log('Invalid Tracking ID. It must be 8 digits.');
          }
          this.showMenu();
        });
      } else if (method === '2') {
        rl.question('Enter Phone Number (10 digits): ', (phoneNo) => {
          if (phoneNo.length === 10 && /^\d{10}$/.test(phoneNo)) {
            console.log('Your shipment is currently in Kochi and will be out for delivery within 2 days.');
          } else {
            console.log('Invalid phone number. It must be 10 digits.');
          }
          this.showMenu();
        });
      } else {
        console.log('Invalid tracking method. Please choose 1 for Tracking ID or 2 for Phone Number.');
        this.showMenu();
      }
    });
  }
  

  adminSearch() {
    rl.question('Enter first or last name to search: ', (name) => {
      const results = this.findUsersByName(name);
      if (results.length === 0) {
        console.log('No person found with that name.');
      } else {
        console.log('Search Results:');
        results.forEach((result) => {
          const user = this.nodes.get(result);
          console.log(`Name: ${user.firstName} ${user.lastName}`);
          console.log(`Date of birth: ${user.dob}`);
        }
    )}
      this.showMenu();
    });
  }

  findUsersByName(name) {
    const results = [];
    this.nodes.forEach((user, key) => {
      if (key.includes(name)) {
        results.push(key);
      }
    });
    return results;
  }
  
}

const graph = new Graph();
let isUserRegistered = false; // Initialize the flag

graph.addMenuItem('1', 'Register Person', () => {
  graph.registerPerson();
  isUserRegistered = true; // Set the flag to true when a user is registered
});
graph.addMenuItem('2', 'Contact Us', () => {
  console.log('Name: Aazim Anish, Email: aazimanish1@gmail.com, Phone: 9562037068');
  graph.showMenu();
});

graph.addMenuItem('3', 'Track Delivery', () => {
  if (isUserRegistered) {
    graph.trackDelivery();
  } else {
    console.log('No user is registered. Please register a user first.');
    graph.showMenu();
  }
});

graph.addMenuItem('4', 'Admin Search', () => {
  if (isUserRegistered) {
    graph.adminSearch();
  } else {
    console.log('No user is registered. Please register a user first.');
    graph.showMenu();
  }
});

graph.addMenuItem('5', 'Exit', () => {
  rl.close();
});

console.log('Welcome to the interactive system!');
graph.showMenu();
