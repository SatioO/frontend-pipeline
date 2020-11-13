package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("FOO:", os.Getenv("FOO"))
	fmt.Println("BAR:", os.Getenv("BAR"))
	fmt.Fprintln(w, "I am "+os.Getenv("FOO"))
}

func greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello Go..!!")
}

func main() {
	ConnectDB("users")

	http.HandleFunc("/", handler)
	http.HandleFunc("/hello", greet)
	log.Fatal(http.ListenAndServe(":5000", nil))
}

// ConnectDB ...
func ConnectDB(dbName string) *mongo.Database {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI("mongodb://mongo:27017")
	client, err := mongo.NewClient(clientOptions)

	err = client.Connect(ctx)

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Couldn't connect to the database", err)
	} else {
		log.Println("Connected!")
	}

	return client.Database(dbName)
}
