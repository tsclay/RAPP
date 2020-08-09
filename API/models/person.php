<?php
// $dbconn = pg_connect('host=localhost dbname=contacts');
$dbconn = pg_connect(getenv("DATABASE_URL"));

// Person class is a factory for creating new people
class Person
{
  public $id;
  public $name;
  public $age;

  public function __construct($id, $name, $age)
  {
    $this->id = $id;
    $this->name = $name;
    $this->age = $age;
  }
}

// People class handles the CRUD for the "people" table in the database
class People
{
  // Create a new person and insert into "people" table
  static function create($person)
  {
    $query = "INSERT INTO people (name, age) VALUES ($1, $2)";
    $query_params = array($person->name, $person->age);
    pg_query_params($query, $query_params);
    return self::all();
  }
  // Read all the data from the "people" table
  static function all()
  {
    $people = array();

    $results = pg_query("SELECT * FROM people");

    $row_object = pg_fetch_object($results); //i=0
    while ($row_object !== false) { //i<5

      $new_person = new Person(
        intval($row_object->id),
        $row_object->name,
        intval($row_object->age)
      );

      $people[] = $new_person;

      $row_object = pg_fetch_object($results); //i++

    }

    return $people;
  }
  // Update a person
  // uses name, age, and id to locate row in table
  static function update($updated_person)
  {
    $query = "UPDATE people SET name = $1, age = $2 WHERE id = $3";
    $query_params = array($updated_person->name, $updated_person->age, $updated_person->id);
    pg_query_params($query, $query_params);
    return self::all();
  }
  // Delete a person using id to locate the row
  static function delete($id)
  {
    $query = "DELETE FROM people WHERE id = $1";
    $query_params = array($id);
    pg_query_params($query, $query_params);

    return self::all();
  }
}
