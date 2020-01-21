# NodeJS API Test app

## Run
In order to run the project just execute the following commands:

    docker-compose build
    docker-compose start

## Requests
Some examples of queries the API is able to handle.

### Index (GET): show all the records

    curl --request GET --url http://localhost:3000/books

### Show (GET): show one record

    curl --request GET --url http://localhost:3000/books/1

### Create (POST): add new record

    curl --request POST --url http://localhost:3000/books \
    --header 'content-type: application/x-www-form-urlencoded' \
    --data isbn=9999 \
    --data author=massi \
    --data title=test \
    --data year=2000

### Update (PUT): update existing record

    curl --request PUT --url http://localhost:3000/books/1 \
    --header 'content-type: application/x-www-form-urlencoded' \
    --data isbn=22222222 \
    --data author=Massi \
    --data title=NodeJS \
    --data year=1981

### Destroy (DELETE): delete a record

    curl --request DELETE --url http://localhost:3000/books/1

### Truncate (DELETE): truncate the table
    
    curl --request DELETE --url http://localhost:3000/books