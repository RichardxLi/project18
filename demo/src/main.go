package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("httpserver v1"))
	})
	http.HandleFunc("/bye", sayBye)
	http.ListenAndServe(":1210", nil)
}

func sayBye(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("bye bye ,this is v1 httpServer"))
}