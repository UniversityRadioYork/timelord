package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}
	fs := http.FileServer(http.Dir(filepath.Join(dir, "static")))
	http.Handle("/", fs)

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
