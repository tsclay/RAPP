# :elephant: RAPP :elephant:

This is a template for a project using the following tech stack:

- React for front-end UI
- Apache for web server
- PostgreSQL for database
- PHP for server language

See a deployment of this sample app [here](https://sample-rapp.herokuapp.com/).

**This guide is not a tutorial on how to use React, PHP, LAMP/MAMP, PostgreSQL, and Apache. This guide only covers configuration.**

<br>

## :computer: Database Setup :computer:

First, make sure PostgreSQL is installed on your machine. If it's not, install it [here](https://www.postgresql.org/download/).

Start up the database server. The command for this may differ based on your configuration. Refer to [these docs](https://www.postgresql.org/docs/9.1/server-start.html).

```bash
postgres -D /usr/local/var/postgres/
```

In a separate tab, run the seed file that will create a database called "contacts", connect to it, create a "people" table, and populate it. Run this command from inside the project root; otherwise, you'll need to type the absolute path to the seed file.

```bash
$: psql -f API/models/seed.sql
> DROP DATABASE
> CREATE DATABASE
> You are now connected to database "contacts" as user "YourUserName".
> CREATE TABLE
> INSERT 0 4
```

<br>

## :satellite: Pointing the MAMP server :satellite:

Go to your MAMP preferences and change the directory for the server to the public directory inside the project root.

<br>

## :rocket: Setup React :rocket:

Start the development server that comes with React.

```bash
npm run start
```

Upon success, your browser should load the localhost for the server. It should look something like this:

<img src="./assets/hello2.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto; border: 1px solid black">

<br>

## :globe_with_meridians: Caring for the Environment :globe_with_meridians:

Our front-end and back-end will relate to each other differently between development and production modes.

In development, the React app lives on the dev server `localhost:3000` that we started with the `npm run start` command, and our PHP API lives on the Apache server `localhost:8888`. In production, the Apache server will host both sides.

Because of this, our API routes for AJAX requests need to change depending on the environment. We could configure an env file, but this is more work needed for only one API.

### Check out the index.js file

<img src="./assets/index.js.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">

<br>

Lines 8-19 handle our environment switch. When you're ready to deploy the app, just change the value of `ENV` to be `'prod'`. Again, the reason for this is that the Apache server will host both the React app that the client receives and the API/database combo for our full CRUD operations.

<br>

## Customizing

Change what you need! You can scrap the React components in this project and make your own. If you want to use functional components with React hooks, by all means, have at it!

The code in the API directory? Scrap it too! As long as you understand how to use React and how to setup the back-end with PHP, :thumbsup:.

<br>

## :thinking: Why? :thinking:
 
 *Why do this when one could use Laravel which offers React front-end scaffolding?*

 Laravel is robust, intuitive, and easy-to-use out of the box. However, it comes with some pain-points:
  - **Time required to learn it.** If you visit the Laracasts site for Laravel, you'll number a large store of videos on using Laravel. Visit Laravel's site, and you'll find extensive and well-written documentation. While this is exciting, it shows that one could spend months learning the "ins and outs" of the framework.

  - **Setting up and configuring a Laravel app** takes as much time as it does to create your app – sometimes more if you encounter errors during this phase.

  - **Are you using authentication/authorization in your app?** If not, I believe you'll find yourself using a multi-featured power tool when all you needed was a hammer. (I hope this metaphor makes sense...) 

  - **Laravel is secure by default when it comes to POST requests.** If your POST request doesn't include a CSRF token, then your request fails. Meaning, setting up POST requests in your forms require more work, especially when you're using React as your front-end instead of Blade templates, which handles this for you.

  *Is security not important?*

  Security is important. This template project can be as secure as you make. Again, this project is customizable. If you need security out of the box, then I highly recommend checking out Laravel.

  *What's the gain of using this approach then?*

  I believe there are two gains to this approach. 
  
  1. Learning how to write front-end and back-end code that interacts sensibly with each other. If you're familiar with using Node.js and Express, you'll recall that Express is unopinionated on what your sever needs to do. Again, it can be as secure as you want it to be. A framework such as Laravel is opinionated about elements such as authentication/authorization and database queries. What if you don't like those opinions?

  2. The skills and insights taken from working with this can easily transfer to working with a framework such as Laravel.

  **TL;DR: I believe using this template project will teach and reinforce concepts of full-stack development; it will not teach you how to memorize a framework's way of doing things... except React. Can't get away from memorizing some things about React.**
