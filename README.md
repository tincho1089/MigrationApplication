# Migration Application

## Application Demo
The purpose of this project is to be able to build a POC application that pretends to be a migration application. It contains user authentication with JWT token management. And the architecture features React on the client side and Nest on the server side. MongoDB is used as the database and Websocket is used to manage notifications in real time for the creation of new migration events.

![App Demo](/images/demo.gif?raw=true "App Demo")


## Local execution with Docker
 The command will build the API developed in Nest JS, will create a MongoDB instance and will build the frontend project developed in React JS with Vite.
`docker-compose stop && docker-compose up --build -d --remove-orphans`

![Docker Services](/images/docker.png?raw=true "Docker Services")

This is the final result of the services that you should see if everything works as expected.

## Application access
To be able to see all the endpoints and structures we are using Swagger. The endpoints documentation can be accessed by `http://localhost:3000/docs`

If the project was build successfully, we should see this screen from the previous link:

![endpoint docs](/images/docs.png?raw=true "endpoint docs")

## Database Access
To MongoDB database can be accessed through the extension MongoDB for VScode:

![db extension](/images/mongoextension.png?raw=true "db extension")

The connection string should be for this case `mongodb://localhost:27017/`. After we stablish the connection, we should have access to the database:

![db access](/images/mongodb.png?raw=true "db access")

## Future Improvements
### User Improvements
Enhance migration information to establish routes instead of just specific points on the map.
Include the ability to save an interesting migration to the user's profile.
Improve real-time notifications so they are only sent to users who have a location close to the established migration point (currently, notifications are sent to all users).

### Technical Debts
Improve the security of user passwords.
Unify styles. Currently, there is a mix of styled-components, MUI components, and inline styles.
Improve responsive design details.
Include E2E unit tests for server endpoints.
Include unit tests for frontend components.
Possible implementation of Storybook.
Implement data persistence at the database level for user notifications (alerts button in the top right corner).
Implement email notifications when an interesting migration is about to start.

