const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addMenuItem(key, text, action) {
    this.nodes.set(key, text);
    this.edges.set(key, action);
  }

  showMenu() {
    console.log('\nMenu:');
    this.nodes.forEach((text, key) => {
      console.log(`${key}. ${text}`);
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
}

class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
  }
}

const graph = new Graph();
const people = new Map();

graph.addMenuItem('1', 'Register Person', () => {
  rl.question('Enter first name: ', (firstName) => {
    rl.question('Enter last name: ', (lastName) => {
      rl.question('Enter date of birth: ', (dob) => {
        const person = new Person(firstName, lastName, dob);
        people.set(`${firstName} ${lastName}`, person);
        console.log('Person registered.');
        console.log(`Name: ${firstName} ${lastName}`);
        console.log(`Date of birth: ${dob}`);
        graph.showMenu(); // Go back to the menu after completing registration
      });
    });
  });
});

graph.addMenuItem('2', 'Contact Us', () => {
  console.log('Name: Aazim Anish, Email: aazimanish1@gmail.com, Phone: 9562037068');
  graph.showMenu(); // Go back to the menu after showing contact details
});

graph.addMenuItem('3', 'Track Delivery', () => {
  console.log('Track Delivery selected.');
  rl.question('Enter Tracking ID (8 digits): ', (trackId) => {
    if (trackId.length === 8) {
      rl.question('Enter Phone Number (10 digits): ', (phoneNo) => {
        if (phoneNo.length === 10 && /^\d{10}$/.test(phoneNo)) {
          console.log('Your shipment is currently in Kochi and will be out for delivery within 2 days.');
        } else {
          console.log('Invalid phone number. It must be 10 digits.');
        }
        graph.showMenu(); // Go back to the menu after track delivery
      });
    } else {
      console.log('Invalid Tracking ID. It must be 8 digits.');
      graph.showMenu(); // Go back to the menu
    }
  });
});

graph.addMenuItem('4', 'Admin Search', () => {
  rl.question('Enter first or last name to search: ', (name) => {
    // Implement DFS search to find matching people
    const results = performAdminSearch(name);
    if (results.length === 0) {
      console.log('No person found with that name.');
    } else {
      console.log('Search Results:');
      results.forEach((result) => {
        const person = people.get(result);
        console.log(`Name: ${person.firstName} ${person.lastName}`);
        console.log(`Date of birth: ${person.dob}`);
      });
    }
    graph.showMenu(); // Go back to the menu after searching
  });
});

graph.addMenuItem('5', 'Exit', () => {
  rl.close();
});

function performAdminSearch(name) {
  const visited = new Set();
  const results = [];

  people.forEach((person, fullName) => {
    if (!visited.has(fullName) && fullName.includes(name)) {
      visited.add(fullName);
      results.push(fullName);
    }
  });

  return results;
}

console.log('Welcome to the interactive system!');
graph.showMenu();
