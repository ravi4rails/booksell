# BookSell

This Project is dedicated to work with AJAX and Rails 7. Follw the steps below to setup the project.

## Requirements

* ruby version 3.0
* rails version 7.0

## Clone the Repository

```
git clone https://github.com/ravi4rails/booksell.git
```

```
cd booksell
```

Install bundle

```
bundle install
```

After instaling the bundle run following command to get bootstrap working:

```
yarn build:css
```

Runing the migration and setup the database. Here I am using sqlite as database adapter. If you are using postgresql or MySQL then first configure your database.yml accordingly. And then run following commands:


```
rails db:migrate
```

```
rails db:seed
```

## Get the app running

Once following all above steps, start your rails server and visit http://localhost:3000/.

Woooohooo!