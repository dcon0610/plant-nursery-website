# Final Project - Plant Shopping Site
#### Elevator Pitch
This fullstack web application is a plant shopping website, where users can browse plants, register an account and add plants to their cart, and buy them. An admin can add plants, remove plants, hide them from the site by deactivating them, and reactivate them when they are available for sale again. 

#### Concept
My other passion in life - when I am not coding - is gardening. I often log onto plant websites to purchase plants, but find them lacking. Later in the year, I plan to grow plants to sell - I have in previous years, but this year I will be selling them through a website in addition to Facebook and other social media. Plant websites can generate a large amount of sales. 

#### Process and Technologies
##### 1. Server Side Technologies. 
The back end was built from Node.js with the Express library for the server, and it connected to a Mongodb Database. The Node APIs were used to expose the database to a front end React Application. One important function of the server side code was to encrypt passwords before they were stored in the database. When a user registered, the password they had registered with was encrypted using bcryptjs to generate a hash which was then stored in the database. The payment Api was a braintree sandbox and also used encryption to protect sensitive payment details. The login API would receive the password, pull the hash out of the database, and unencrypt it to check whether it was the right password. If these two unencrypted passwords matched, a JWT token would be generated with some information about the user, and this would be stored in local storage. By utilising this JWT token the authentication would not need to be repeated for other API calls and user information could be retained on the client. Other APIs interacted with the database to add plants, retrieve plants, delete plants and add plants to the cart of a user. 

Summary of libraries: 
1. bcryptjs
2. braintree
3. concurrently (for dev)
4. http-proxy-middleware
5. JWT
6. passport
7. morgan (for API troubleshooting)

The main challenge with the server side was learning Mongodb as before this project it was totally new to me. 

##### 2. Client Side Technologies. 
The javascript framework used for this project was React, complemented by redux to manage the state.
1. Redux was used to manage the state across the project to avoid prop drilling and other messy data actions. It was particularly important in managing user state - whether there was a user logged in, whether that user was an admin, whether that user had any items in their cart, also what plants were for sale. These states were in use across multiple pages and an update in state on one of the pages would be reflected in other components and other pages. For example, adding a plant to a cart was reflected in the navbar by the number next to the cart route, and when the user went to their cart, they could immediately see the recently added item. There were two action pages - one for authentication and user info, and one for plants information. These two pages utilised Redux actions which fed into redux reducers, which then updated the Redux Store.
I used the React Persist was the library used to ensure that the state persisted across a browser refresh. It basically stores the state in local storage, updates it if the store is updated and grabs it if the page is refreshed. 
Getting redux to work correctly with asynchronous data calls was probably the most challenging part of the project. 
2. Class components vs. Functional components:
Most of the application was written in class components but since Functional components is React's preferred direction (given that facebook, the maintainers of React have stated that they will make performance optimizations in functional components), the admin page (the last one written) was written as a functional component. The use of React Hooks incuding useEffect and useState simplified the React code. UseEffect in particular was very clean when it came to lifecycle management compared to the use of component will mount, component did mount, component did update, component will unmount etc of class components. 
3. Libraries used:
    1. react-redux (with react-persist and redux-thunk)
    2. font-awesome (instagram and socials)
    3. axios (http calls)
    4. jwt-decode - to get user information
    5. react-select - to enable multiple option adding when deleting, deactivating or reactivating plants on the admin page. 
    6. react-confirm-alert was used across the site to manage popups to give users information such as confirming data, success of their action etc. 
    7. react-slideshow-image was used to create the changing images on the site home page. 

4. Multi Layer Authentication - The other challenge with this website was creating one layer for users - where they could browse and add items to their cart and purchase them, but another layer for admins where they could do all that (for testing purposes) but also access an admin page to edit, delete, deactivate and reactivate plants. There were checks on every login (both ordinary login and admin login) to determine whether the user was an admin (that information was saved in the database), and that information was stored in local storage (and deleted when the user logged out to give some security). There were also checks on the admin page itself to ensure that a non admin user could not alterthe URL to access Admin functions. If they tried to do this, or they were not logged in, it would direct them to the plants page.

    Challenges and Sucesses: React-redux with asychronous data calls was a challenge, but is fully functional. Multi Layer authentication from scratch was also a challenge - but appears to be fully functional. 
    
##### 2. Future Development
Given the time spent on learning technologies (I started this project with a minimal understanding of react and much more experience in Vue.js), the weak point of this project is styling, especially for mobile users. Before I launch this site, i will customize it to ensure it is fully mobile friendly - mobile first. I will also implement a fully functional payment system. 

DeployedApplication: https://arcane-retreat-16998.herokuapp.com/

Github: https://github.com/dcon0610/plant-nursery-website

Readme: https://github.com/dcon0610/plant-nursery-website/blob/main/README.md

video: https://drive.google.com/file/d/1EcgnH8XXgr480bcA9keK9VOHtEHQ0n10/view




