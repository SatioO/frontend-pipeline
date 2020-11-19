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

// MongoConfig ...
type MongoConfig struct {
	mongoHost string
	mongoPort string
	mongoDb   string
	username  string
	password  string
	msgCol    string
}

var mongoConfig = MongoConfig{
	mongoHost: getEnv("MONGO_HOST", "mongo"),
	mongoPort: getEnv("MONGO_PORT", "27017"),
	mongoDb:   getEnv("MONGO_DB", "users"),
	username:  getEnv("MONGO_USER", "root"),
	password:  getEnv("MONGO_PASS", "root"),
	msgCol:    getEnv("MONGO_MSG_COLLECTION", "msgs"),
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback
}

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

	fmt.Println("MONGO_HOST:", os.Getenv("MONGO_HOST"))
	fmt.Println("MONGO_PORT:", os.Getenv("MONGO_PORT"))
	fmt.Println("config", mongoConfig)

	clientOptions := options.Client().ApplyURI("mongodb://" + getEnv("MONGO_HOST", "mongo") + ":" + getEnv("MONGO_PORT", "mongo"))
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
