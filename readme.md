
# Clubhouse Message Board

This project is an implementation of a clubhouse-style message board, allowing users to sign up, create messages, join the club, and perform various actions based on their membership status and permissions.

## Assignment Details

The project was built following the instructions provided in an assignment. The assignment included steps to set up database models, implement user sign-up and login functionality, create messages, manage membership statuses, and introduce admin privileges for certain users.

[Assignment Instructions](https://www.theodinproject.com/lessons/nodejs-members-only) | [Live Preview](https://members-only-message-board.fly.dev/)

## Key Features
- User authentication with signup, login, and password hashing using bcrypt.
- Membership management, allowing users to join the club using a secret passcode.
- Differentiated access levels for users (members, admins) with varying privileges.
- Message creation and display with author anonymity based on membership status.
- Admin functionality to delete messages and manage user permissions.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Passport.js
- HTML/CSS/JavaScript
- etc.

## Usage
- Navigate to the live preview link to interact with the application.
- Sign up, create messages, and explore the different functionalities based on your membership status.

### Getting started
1. Clone the repository: git clone https://github.com/octavian-sn/members_only.git
2. Install dependencies: npm install
3. Set up MongoDB and configure the database.
4. Start the server: npm start

## Screenshots

![Homepage Screenshot](https://i.ibb.co/N2P4M9Z/homepage.png)
![Register Screenshot](https://i.ibb.co/R788mWh/register.png)

#### Contributing
Contributions are welcome! Please fork the repository and create a pull request.

#### License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).