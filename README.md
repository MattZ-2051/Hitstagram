# Picstagram
*By Matt Zamora  - visit Picstagram*

Table of Contents

* Picstagram Overview
* Technologies Used
* FrontEnd Overview
* BackendOverview
* Conclusion

### Hitstagram Overview

Hitsagram is a full stack application that allows the user to make posts, like and comment on a post, follow other users and edit their profile. The app is based off the social media web app instagram.

(post code snippet here)

## Technologies Used

* Frontend
	* React.js
	* Redux
	* CSS
	* Material UI Icons
	
* Backend
	* Flask
	* SQLAlchemy
	* PostgreSQL

## FrontEnd Overview

### React
Using React as the frontend application allowed me to leverage not only React but the tools that come along with it like different types of hooks

![feed](documentation/feed-gif.mov)

### Redux
Redux allowed me to create a better way to manage my state throughout my application. By managing the state through the store I can update multiple components that rely on the same information.


## Material UI Icons
Material UI Icons are used for the navigation bar Icons. 

## CSS
CSS styling is used for the styling throughout the page. Using grids makes it easier to space the profile and exlore page.

## Backend Overview

### Flask
The python web framework flask is used for the backend.  Flask is a great lightweight framework to use because it allows for easy integration with PostgreSQL and SQLAlchemy ORM. For a smaller application it is an effective framework to use becauase it isn't to difficult to set up and comes with some handy tools like flask-login.

### PostgreSQL
PostgreSQL was a great RDBMS to use. Its fairly simple to integrate it with the Flask framework and store different reltionships between models.

## Conclusion


