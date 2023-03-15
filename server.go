package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

func main() {
	port := 5100
	if len(os.Args) > 1 {
		// Get the last argument
		port, _ = strconv.Atoi(os.Args[len(os.Args)-1])
	}
	log.Printf("Listening on port %d", port)
	log.Fatal(
		http.ListenAndServe(
			fmt.Sprintf(":%d", port),
			http.FileServer(http.Dir(".")),
		),
	)
}
