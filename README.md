# :elephant: RAPP :elephant:

This is a template for a project using the following tech stack:

- React for front-end UI
- Apache for web server
- PostgreSQL for database
- PHP for server language

**This guide will not discuss how to use React, PHP, LAMP/MAMP, PostgreSQL, and Apache outside of configuration.**

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

<img src="./assets/hello.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">

<br>

## :globe_with_meridians: Caring for the Environment :globe_with_meridians:

Our front-end and back-end will relate to each other differently between development and production modes.

In development, the React app lives on the dev server `localhost:3000` that we started with the `npm run start` command, and our PHP API lives on the Apache server `localhost:8888`. In production, the Apache server will host both sides.

Because of this, our API routes for AJAX requests need to change depending on the environment. We could configure an env file, but this is more work needed for only one API.

### Check out the index.js file

<img src="./assets/index.js.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">
