package main

import (
	"fmt"
	"net/http"
)

func main() {
	resp, _ := http.Get("http://127.0.0.1:13251/")
	body := make([]byte, 1024)
	resp.Body.Read(body)
	fmt.Println(string(body))
}
