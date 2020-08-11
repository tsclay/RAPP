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
       * [React](#check-out-the-indexjs-file)
       * [PHP](#php-this-or-that)
   * [Customizing](#-customizing-)
   * [Deploying your App](#-deploying-your-app-)
       * [React](#the-react-side)
       * [PHP](#the-php-side)
       * [Composer.json](#composerjson)
       * [Database](#-database-add-on-)
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

<br>

## 🌎 Caring for the Environment 🌏

Our front-end and back-end will relate to each other differently between development and production modes.

In development, the React app lives on the dev server `localhost:3000` that we started with the `npm run start` command, and our PHP API lives on the Apache server `localhost:8888`. In production, the Apache server will host both sides.

Because of this, our API routes for AJAX requests need to change depending on the environment.

### Check out the package.json file

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

If your MAMP server is not on port `8888`, simply change the `proxy` in `package.json`. Easy.

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

### The React side

Change the `ENV` variable in `index.js` to something other than `'dev'`. Run `npm run build` to get the optimized bundle of code that will be used on the live site. The resulting build directory will look like this:

<img src="https://i.imgur.com/rW7Tal8.png" style="display: block; margin: 0 auto;">

### The PHP side

The `index.html` will be our main route, and the JS and CSS files in the build directory will be loaded in that `index.html` file. The `.htaccess` file in the project root handles this.

If you look inside the build HTML file, you'll find that the scripts have `static` as the first directory in the paths. This confuses our Apache server, which will attempt to find the `static` folder in the project root, not in `build`. To solve this, we tell the server to prepend `build` to those routes so that it doens't freak out. Notice that the "/" route will be last in the `.htaccess` file to prevent other routes being caught by this one.

```Apache
# For the js and css assets when using React in PRODUCTION
RewriteCond %{REQUEST_METHOD} ^GET$
RewriteRule ^static/(.*)$ build/static/$1

# Reserved for the React build => PRODUCTION
RewriteCond %{REQUEST_METHOD} ^GET$
RewriteRule ^$ build/index.html
```

### Composer.json

Brief sidebar: Take a look at the `composer.json` file:

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

1. **You must have this file to deploy a PHP app to Heroku**, even if it is blank. The `Procfile` and `composer.json` tell Heroku that this is a PHP app that needs an Apache server. Otherwise, Heroku will assume Node since there is a `package.json` file present.
2. You can change which version of PHP you wish to use. _Change this with caution._
3. The phpdotenv library is only needed when were working locally. Once we push to Heroku, we don't need it, as Heroku will give our app the `DATABASE_URL`.

Run `composer install` from the project root in your terminal. This will create a `vendor` directory for your project, indicating that it worked. You won't need this in deployment, as Heroku will install one for you. It is already included in the `gitignore`.

- If you change the PHP version in the `composer.json` file, delete the `vendor` directory and re-run `composer update`.

Deploy to Heroku!

```bash
git add .
git commit -am 'please work'
git push heroku master
```

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

#### TL;DR: Making a full-stack app from scratch is freeing, educational, and fun. Deployment and environment bugs are not fun, but this project has that covered. Framework or no framework, apps are as secure as the developer makes them.

_Why do this when one could use Laravel which offers React front-end scaffolding?_

Laravel is robust, intuitive, and secure out of the box. However, it comes with some pain-points:

- **Time required to learn it.** If you visit the Laracasts site for Laravel, you'll number a large store of videos on using Laravel. Visit Laravel's site, and you'll find extensive and well-written documentation. While this is exciting, it shows that one could spend months learning the "ins and outs" of the framework.

- **Setting up and configuring a Laravel app** takes as much time as it does to create your app – sometimes more if you encounter errors during this phase.

- **Are you using authentication/authorization in your app?** When you need to nail a picture to a wall, a hammer will do. I hope that expression makes sense.

- **Laravel is secure by default when it comes to POST requests.** If your POST request doesn't include a CSRF token, then your request fails. Meaning, setting up POST requests in your forms require more work, especially when you're using React as your front-end instead of Blade templates.

_Is security not important?_

Security is important. This template project can be as secure as you make it. It is possible to secure an app without something like Laravel or Django. If you work with Express and Node, this is something you'd have to do anyway. Express doesn't protect your site from CSRF and XSS by default. If you want security features out of the box, then I recommend researching Laravel or Django.

_What's the gain of using this approach then?_

I believe there are two gains to this approach.

1. Learning how to write front-end and back-end code that interacts sensibly with each other while having a lot of freedom to do so. Again, it can be as secure as you want it to be. An opinionated framework will direct you to code a certain way from the start. While that isn't bad, starting from scratch can be fun and educational.

2. The skills and insights taken from working with this can easily transfer to working with a framework such as Laravel. Much can be learned by securing your app without a framework doing it all for you. Those lessons will then provide insights as to why a given framework operates under certain opinions.

<br>

## ❓ Questions, Quandaries, and Queries ❓

Submit an issue with any ideas about this project! If you do, please be cordial and kind. There is enough nastiness in the world today.

Pull requests are welcome as well!
