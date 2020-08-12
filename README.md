# 🐘 RAPP 🐘

This is a template for a project using the following tech stack:

- React for front-end UI
- Apache for web server
- PostgreSQL for database
- PHP for server language

This guide will walkthrough the setup process and deploying to Heroku. This setup guide will use the source code as is. See a deployment of this sample app on Heroku [here](https://sample-rapp.herokuapp.com/).


<br>

## Table of Contents

<!--ts-->
   * [TL;DR Setup](https://github.com/tsclay/RAPP/#-tldr-setup)
   * [Getting Started](#-getting-started-)
   * [Database Setup](#-database-setup-)
   * [Pointing the MAMP server](#-pointing-the-mamp-server-)
   * [Setup React](#-setup-react-)
   * [Caring for the Environment](#-caring-for-the-environment-)
       * [React](#packagejson)
       * [PHP](#php-this-or-that)
   * [Customizing](#-customizing-)
   * [Deploying your App](#-deploying-your-app-)
      * [Connecting React and PHP](#connecting-react-and-php)
        * [The PHP side](#the-php-side)
        * [About Composer.json](#about-composerjson)
      * [Database](#-database-add-on)
   * [Why use this?](#-why-use-this-)
   * [Questions?](#-questions-quandaries-and-queries-)
<!--te-->

<br>

## ⏩ TL;DR Setup ⏩

_I wonder if this can be automated..._

```bash
git clone https://github.com/tsclay/RAPP.git
cd RAPP/
npm i
composer install
echo "DATABASE_URL=postgresql://rapp:reactPHP@localhost:5432/contacts" > .env
```

Point your MAMP server to the `RAPP` directory at the root, no sub-folder.

In a new tab, still in `RAPP` directory:

```bash
postgres -D /usr/local/var/postgres/
```

In a new tab, still in `RAPP` directory:

```bash
psql -f API/models/seed.sql
npm run start
```

Open `localhost:3000` and off you go! Refer to Deploying your App when ready to deploy. 🚀

<br>

## 🎬 Getting Started 🎬

In your terminal, navigate to where you want to store the project, and type the following commands:

```bash
git clone https://github.com/tsclay/RAPP.git
cd RAPP/
npm i
composer install
echo "DATABASE_URL=postgresql://rapp:reactPHP@localhost:5432/contacts" > .env
```

Four files of note. These will be discussed later.

- `package.json`
- `composer.json`
- `.env`
- `Procfile`

<br>

## 💻 Database Setup 💻

An installation of PostgreSQL is assumed. (_You know what they say about assumptions. Install it [here](https://www.postgresql.org/download/)._)

Start up the database server. The command for this may differ based on your configuration. Refer to [these docs](https://www.postgresql.org/docs/9.1/server-start.html).

```bash
postgres -D /usr/local/var/postgres/
```

In a separate tab, run the seed file from inside the project root; otherwise, you'll need to type the absolute path to the seed file.

```bash
$: psql -f API/models/seed.sql
> DROP DATABASE
> DROP ROLE
> CREATE ROLE
> CREATE DATABASE
> ALTER DATABASE
> You are now connected to database "contacts" as user "YourUserName".
> CREATE TABLE
> ALTER TABLE
> INSERT 0 4
```

This also created a user named `rapp` with a password of `reactPHP`. This will be important for our database access.

<br>

## 📡 Pointing the MAMP server 📡

Go to your MAMP preferences and change the directory for the server to the public directory inside the project root.

<img src="https://i.imgur.com/NkPRGPE.gif" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">

<br>

## 🧪 Setup React 🧪

Start the development server that comes with React.

```bash
npm run start
```

Upon success, your browser should load the localhost for the server. It should look something like this:

<img src="https://i.imgur.com/NtdB7BN.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">


The AJAX requests in this React app are handled through the Axios library. You may ditch this for something different if you like.

<br>

## 🌎 Caring for the Environment 🌏

Our front-end and back-end will relate to each other differently between development and production modes.

In development, the React app lives on the dev server `localhost:3000` that we started with the `npm run start` command, and our PHP API lives on the Apache server `localhost:8888`. In production, the Apache server will host both sides.

Because of this, our API routes for AJAX requests need to change depending on the environment.

### Package.json

```json
  "proxy": "http://localhost:8888",
```

This line of code sets up a proxy through which our AJAX requests can go if they aren't located on the dev server. In this case, we want our AJAX requests to go to the MAMP server.

This means that we can do this in React:

```jsx
axios.get('/people').then((response) => {
  this.setState({
  people: response.data,
});
```

And not this:

```jsx
axios.get('http://localhost:8888/people').then((response) => {
  this.setState({
  people: response.data,
});
```

If your MAMP server is not on port `8888`, simply change the `proxy` in `package.json`. This will make the transition from development to production much easier. 🙂

### PHP this or that

On the PHP side, the only bit of environment dependent code is inside `API/models/person.php`.

```PHP
if (getenv("DATABASE_URL")) {
  $dbconn = pg_connect(getenv("DATABASE_URL"));
} else {
  require_once '../../vendor/autoload.php';

  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '../../.env');
  $dotenv->load();

  $db = parse_url($_SERVER['DATABASE_URL']);
  $db["path"] = ltrim($db["path"], "/");

  $dbconn = pg_connect("host={$db["host"]} dbname={$db["path"]} port={$db["port"]} user={$db["user"]} password={$db["pass"]}");
}
```

This bit of code **requires** a `.env` file in the root of the project. Refer to the `.env.example` file in the project for an environment variable you can use in development.

While in development, the phpdotenv library will pull in your `.env` file and grab `DATABASE_URL` to use. This means you only need to change the database info in your `.env` file. On Heroku, the `getenv()` method will work. Btw, if you're wondering why not use phpdotenv for both, it doesn't play nice with `getenv()`. Refer to [this issue](https://github.com/vlucas/phpdotenv/issues/446) in the phpdotenv repo.

Given this, it is **recommended to not change this bit of code unless you want to debug deployment issues for hours.**

Refer to the Heroku docs on [connecting to a PostgreSQL database in PHP](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-php) for more info if needed.

<br>

## 😎 Customizing 😎

Other than the necessary bits, change what you need! You can scrap the React components and PHP classes in this project and make your own. As long as you understand how to use React and how to setup the back-end with PHP, :thumbsup:.

Ultimately, you can focus on functionality, UI, UX, and security without worrying about deployment.

<br>

## 🚀 Deploying your App 🚀

The [sample app](https://sample-rapp.herokuapp.com/) was deployed using Heroku, so the following will refer to that. So, if you prefer a different hosting service, make sure to read those docs! 🤓

Assuming you have a Heroku account, Heroku CLI, and XP with deploying to Heroku, set up a new app, add the heroku remote to your git urls, and add a PostgreSQL add-on for your database.

All we need to do is create an optimized React app and push to Heroku.

```bash
npm run build
git add .
git commit -am 'please work'
git push heroku master
```

### Connecting React and PHP

The resulting build directory from `npm run build` will look like this:

<img src="https://i.imgur.com/rW7Tal8.png" style="display: block; margin: 0 auto;">

#### The PHP side

The `index.html` in `build` will be our main route, and the JS and CSS files will be loaded in that `index.html` file. The `.htaccess` file in the project root handles this.

If you look inside that `index.html` file, you'll find that the script tags have `static` as the first directory in the paths. This confuses our Apache server, because it will attempt to find the `static` folder in the project root, not in `build`. 

To solve this, we tell the server to prepend `build` to those routes so that it doens't freak out. Notice that the "/" route will be last in the `.htaccess` file to prevent other routes being caught by this one.

```Apache
# For the js and css assets when using React in PRODUCTION
RewriteCond %{REQUEST_METHOD} ^GET$
RewriteRule ^static/(.*)$ build/static/$1

# Reserved for the React build => PRODUCTION
RewriteCond %{REQUEST_METHOD} ^GET$
RewriteRule ^$ build/index.html
```

#### About Composer.json

```json
{
  "config": {
    "platform": {
      "php": "7.4.2"
    }
  },
  "require": {
    "php": "7.4.2"
  },
  "require-dev": {
    "vlucas/phpdotenv": "^5.1"
  }
}
```

Three things about this file:

1. **This file must be present to deploy a PHP app to Heroku**, even if it is blank. The `Procfile` and `composer.json` tell Heroku that this is a PHP app that needs an Apache server. Otherwise, Heroku will assume Node since there is a `package.json` file present.
2. You can change which version of PHP you wish to use. _Change this with caution._
3. The phpdotenv library is only needed when were working locally. Once we push to Heroku, we don't need it, as Heroku will give our app the `DATABASE_URL`.

When we ran `composer install`, this created a `vendor` directory for the project. Since Heroku will install one for you when you deploy, is is included in the `gitignore`.

- If you change the PHP version in the `composer.json` file, delete the `vendor` directory and run `composer update`.

### 💻 Database Add-On 💻

The only thing left to do at this point is setup the add-on database, which you can do from your terminal! All you need is the command that opens the `psql` shell for the cloud database.

Check the following GIF on how to get that command:

<img src="https://i.imgur.com/bzGYV8I.gif" alt="Whoops..." style="width: 700px; height: 600px; display: block; margin: 0 auto;">

<br>

Once inside, you can seed the database with a table and values.

```SQL
CREATE TABLE people
(id SERIAL, name VARCHAR(255), age INT);

INSERT INTO people (name, age) VALUES
('Bobby', 45),
('Thomas', 37),
('Jo', 18),
('Samantha', 25);
```

<br>

## 🤔 Why use this? 🤔

I believe there are at least three benefits to this approach.

1. Good practice making a full-stack CRUD app from scratch without the pain-points of deployment. 

2. The back-end XP transfers to working with an opinionated back-end framework. 

3. Get started with code quickly.

<br>

## ❓ Questions, Quandaries, and Queries ❓

Submit an issue with any ideas about this project!

Pull requests are welcome as well!
