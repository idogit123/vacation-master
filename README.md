# Vacation Master 🌴✈️
**A website for requesting vacations from your manager.**

## Website layout
- login page
- signup page
- manager
  - employees page
  - pending requests page
- employee page
  - new request page

## Pages
### Login page
Enter name and password to login. 

### Signup page
Enter name, password and role to signup.
If a user with the same name and password already exists it will login to that user.

### Manager - Employees page
If you login as a manager you have access to the manager pages.
The employees page has two lists:
1. New employees - with a button next to each that recruits that employee
2. Your employees - a list of your employees

### Manager - Requests page
The requests page has a table of all the pending requests.
The table shows:
- Name of employee who sent the request
- Start date of vacation
- End date of vacation
- Duration of vacation
- Buttons to approve or reject the request

### Employee page
If you login as an employee you have access to the employee pages.
In the employee page there is a table with all the requests you made.
The table shows:
- Start date of vacation
- End date of vacation
- Duration of vacation
- Status of request: `Pending 🟡`, `Approved 🟢` or `Rejected 🔴`

### Employee - New request page
In the new request page there is a form to send a new request.

## Database layout
The database has 2 collections:
### The users collection
The users collection stores all the managers and employees.
User properties:
- Name
- Password
- Role
- Id

Employee extends User:
- Manager - The manager id
- Role = Employee

Manager extends User:
- Role = Manager

### The requests collection
Request properties:
- Employee id
- Manager id
- Start date
- End date
- Status
- Id

## How to run the project
- Run the api
  1. In a terminal type: `cd vacation-master-api`
  2. Type: `tsc-watch --onSuccess "node src/javascript/index.js"`
  3. Wait for the terminal to log: "listening on port: 8080"
- Run the website
  1. In a new terminal type: `cd vacation-master-website`
  2. Type: `npm run dev`
- Use the website
  1. Go to the browser
  2. In the search bar enter: `http://localhost:3000`