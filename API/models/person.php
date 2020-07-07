<?php
$dbconn = pg_connect('host=localhost dbname=contacts');

class Person {
    public $id;
    public $name;
    public $age;

    public function __construct($id, $name, $age){
        $this->id = $id;
        $this->name = $name;
        $this->age = $age;
    }
}

class People {
    static function delete($id){
        $query = "DELETE FROM people WHERE id = $1";
        $query_params = array($id);
        pg_query_params($query, $query_params);

        return self::all();
    }
    static function update($updated_person){
        $query = "UPDATE people SET name = $1, age = $2 WHERE id = $3";
        $query_params = array($updated_person->name, $updated_person->age, $updated_person->id);
        pg_query_params($query, $query_params);
        return self::all();
    }
    static function create($person){
        $query = "INSERT INTO people (name, age) VALUES ($1, $2)";
        $query_params = array($person->name, $person->age);
        pg_query_params($query, $query_params);
        return self::all();
    }
    static function all(){
        $people = array();

        // $person1 = new Person(1, 'Bob', 32);
        // $person2 = new Person(1, 'Bob', 32);
        // $person3 = new Person(1, 'Bob', 32);
        //
        // $people[] = $person1;
        // $people[] = $person2;
        // $people[] = $person3;

        $results = pg_query("SELECT * FROM people");

        $row_object = pg_fetch_object($results); //i=0
        while($row_object !== false){ //i<5

            $new_person = new Person(
                intval($row_object->id),
                $row_object->name,
                intval($row_object->age)
            );

            $people[] = $new_person;

            $row_object = pg_fetch_object($results);//i++

        }

        return $people;
    }
}

// $asdf = new Person(8, "updated bobby", 131);
// People::update($asdf);
//
// $new_person = new Person(null, "new person", 456);
// People::create($new_person);
//
//
//
// for(let i = 0; i < 5; i++){
//     console.log(i)
// }
//
//
// let i = 0;
// while(i<5){
//     console.log(i);
//     i++
// }
?>
