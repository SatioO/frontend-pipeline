package main

import (
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "I am Root")
}

func greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello Go..!!")
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/hello", greet)
	log.Fatal(http.ListenAndServe(":8888", nil))
}
