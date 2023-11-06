const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentOption = 'main';
const userData = {}; // Store user data
const registeredUsers = []; // Store registered users

function showMenu() {
  switch (currentOption) {
    case 'main':
      console.log('Welcome to the interactive system!');
      console.log('Choose an option:');
      console.log('1. Register');
      console.log('2. Track Delivery');
      console.log('3. Contact Support');
      console.log('4. Admin');
      console.log('5. Exit');

      rl.question('Enter your choice: ', choice => {
        switch (choice) {
          case '1':
            currentOption = 'register';
            showRegisterMenu();
            break;
          case '2':
            currentOption = 'trackDelivery';
            showTrackDeliveryMenu();
            break;
          case '3':
            showContactSupport();
            break;
          case '4':
            currentOption = 'admin';
            showAdminMenu();
            break;
          case '5':
            console.log('Thank you for using our system!');
            rl.close();
            break;
          default:
            console.log('Invalid option. Please choose a valid option.');
            showMenu();
        }
      });
      break;
    case 'register':
      showRegisterMenu();
      break;
    case 'trackDelivery':
      showTrackDeliveryMenu();
      break;
    case 'admin':
      showAdminMenu();
      break;
  }
}

function showRegisterMenu() {
  console.log('Registration');

  rl.question('Enter first name: ', firstName => {
    userData['First Name'] = firstName;

    rl.question('Enter last name: ', lastName => {
      userData['Last Name'] = lastName;

      rl.question('Enter date of birth: ', dateOfBirth => {
        userData['Date of Birth'] = dateOfBirth;

        registeredUsers.push({ ...userData });

        console.log('Registration successful.');
        console.log(`Name: ${userData['First Name']} ${userData['Last Name']}`);
        console.log(`Date of birth: ${userData['Date of Birth']}`);

        rl.question('Back to main menu? (y/n): ', backToMain => {
          if (backToMain === 'y') {
            currentOption = 'main';
            showMenu();
          } else {
            showRegisterMenu();
          }
        });
      });
    });
  });
}

function showTrackDeliveryMenu() {
  console.log('Track Delivery');

  console.log('Choose an option:');
  console.log('1. Track by ID');
  console.log('2. Track by phone number');
  console.log('3. Back to main menu');

  rl.question('Enter your choice: ', choice => {
    switch (choice) {
      case '1':
        trackById();
        break;
      case '2':
        trackByPhoneNumber();
        break;
      case '3':
        currentOption = 'main';
        showMenu();
        break;
      default:
        console.log('Invalid option. Please choose a valid option.');
        showTrackDeliveryMenu();
    }
  });
}

function trackById() {
  console.log('Track by ID');

  rl.question('Enter tracking ID: ', trackingId => {
    console.log(`Tracking ID ${trackingId} verified.`);
    console.log('Your product is currently in Kochi and will be delivered within 2 days.');

    rl.question('Back to track delivery menu? (y/n): ', backToTrackDelivery => {
      if (backToTrackDelivery === 'y') {
        showTrackDeliveryMenu();
      } else {
        showMenu();
      }
    });
  });
}

function trackByPhoneNumber() {
  console.log('Track by phone number');

  rl.question('Enter phone number: ', phoneNumber => {
    console.log(`Phone number ${phoneNumber} verified.`);
    console.log('Your product is currently in Kochi and will be delivered within 2 days.');

    rl.question('Back to track delivery menu? (y/n): ', backToTrackDelivery => {
      if (backToTrackDelivery === 'y') {
        showTrackDeliveryMenu();
      } else {
        showMenu();
      }
    });
  });
}

function showContactSupport() {
  console.log('Contact Support');
  console.log('Admin details:');
  console.log('Name: Aazim Anish');
  console.log('Email: aazimanish1@gmail.com');
  console.log('Phone number: 9562037068');

  rl.question('Back to main menu? (y/n): ', backToMain => {
    if (backToMain === 'y') {
      currentOption = 'main';
      showMenu();
    } else {
      // Continue within the current submenu
    }
  });
}

function showAdminMenu() {
  console.log('Admin Menu');
  console.log('1. Search Registered Users');
  console.log('2. Back to main menu');

  rl.question('Enter your choice: ', choice => {
    switch (choice) {
      case '1':
        searchRegisteredUsers();
        break;
      case '2':
        currentOption = 'main';
        showMenu();
        break;
      default:
        console.log('Invalid option. Please choose a valid option.');
        showAdminMenu();
    }
  });
}

function searchRegisteredUsers() {
  console.log('Search Registered Users');
  rl.question('Enter a search query (first name, last name): ', searchQuery => {
    const matchingUsers = registeredUsers.filter(user => {
      return (
        user['First Name'].toLowerCase().includes(searchQuery.toLowerCase()) ||
        user['Last Name'].toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (matchingUsers.length > 0) {
      console.log('Matching Users:');
      matchingUsers.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`Name: ${user['First Name']} ${user['Last Name']}`);
        console.log(`Date of Birth: ${user['Date of Birth']}`);
      });
    } else {
      console.log('No matching users found.');
    }

    rl.question('Back to admin menu? (y/n): ', backToAdmin => {
      if (backToAdmin === 'y') {
        showAdminMenu();
      } else {
        showMenu();
      }
    });
  });
}

showMenu();
