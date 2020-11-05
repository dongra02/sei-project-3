# SEI50 Project - ***popQuest***

## Application Outline
The popQuest app allows users to create and complete fun and challenging 'quests' within the city of their choosing. Each quest consists of a series of stops where the user must solve a clue in order to reveal the next stop. In some cases, the users coordinates will 'solve' the clue based on their proximity to a given location. Quests can be timed for those seeking a challenge, or simply a 'guided tour'-like trip for those interested in a more leasurely journey.

## Project Brief
Collaborate remotely within a team of 4 to create a full-stack application. The application must include a React front-end consuming data served from a Mongo database by an Express API. Complete the project within 9 days.

## Technologies Used

### Frontend
* JavaScript
* React
* Node - SASS
* Boostrap
* Axios
* Mapbox-gl & Geocoder
* Cloudinary

### Backend
* Express
* MongoDB
* Mongoose
* Bcrypt
* Faker
* jsonwebtoken

### Collaboration
* Git + Github
* Slack
* Trello



***
## Process
Once our team decided on an idea and worked together to map the basic wireframing and models as a complete group. We discussed the user stories and worked separate the core needs from extra features. 

User Stories:
* User can participate in quests without Login/Account
* Logged in user can create a profile
* Logged in user can rate & review completed quests
* Logged in user can create/delete quests, stops, clues/proximities
* Map is interactive, and responsive to users location

<div align='center'>
<img src='./images/index-frame.jpg' height='300'/>
<img src='./images/show-frame.jpg' height='300'/>
</div>

Having completed those steps, we broke into 2 pairs with one focusing on the front-end and other on the back. The full team met every morning for a standup session and planning, and often again in the evening to check in. I primarily worked within the backend team to setup the initial models, routes and controllers for the app. I was also responsible for creating the script for seeding our database. I used Faker to create user profiles, reviews and quests consisting of 4 stops within the greater London area. The backend team was then responsible for supporting any udpates or requests to how the data was served to frontend. In the final days of the project, the team worked together to style, add finishing touches and test user stories. 

<div align='center'>
<img src='./images/index.jpg' height='300'/>
<img src='./images/show.jpg' height='300'/>
</div>