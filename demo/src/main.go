package main

import (
	"math/rand"
	"net/http"
	"strconv"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("httpserver v1"))
	})
	http.HandleFunc("/attack", attack)
	http.ListenAndServe(":13251", nil)
}

func attack(w http.ResponseWriter, r *http.Request) {
	n := rand.Intn(100)
	s := strconv.Itoa(n)
	w.Write([]byte(s))
}