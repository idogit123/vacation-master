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
Doesnt show if password incorrect or if user doesnt exist, it will just not login.

### Signup page
Enter name, password and role to signup.
If a user with the same name and password already exists it will login to that user.
Also doesnt show if there are errors in signup.

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
**Importemt: if the user is not recruited by a manager, the request will not be sent**
**and no error message will be displayed to the user!**

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

## How to run project
