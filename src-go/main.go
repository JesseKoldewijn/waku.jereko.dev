package main

import (
	"net/http"
	"os"
	"time"

	"github.com/fvbock/endless"

	"github.com/JesseKoldewijn/waku_jereko_dev/src-go/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Get all environment variables
	env_vars := os.Environ()

	// Default values
	PORT := "8080"

	// Get PORT env var
	for _, env_var := range env_vars {
		if env_var[:4] == "PORT" {
			isEmpty := len(env_var) == 4
			if isEmpty {
				break
			}
			PORT = env_var[5:]
		}
	}

	// Create router
	router := gin.Default()

	// Routes
	routes.RouteGroupRoot(router)

	// Create server
	s := &http.Server{
		Addr:           "0.0.0.0:" + string(PORT),
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	// Server address
	port := ":" + string(PORT)
	urlLoopback := "http://localhost" + port
	urlNetwork := "http://0.0.0.0" + port

	println("Server running on: \n  " + urlLoopback + "\n  " + urlNetwork)

	// Listen and serve
	err := endless.ListenAndServe(port, s.Handler)

	// Check for errors
	if err != nil {
		// Print error
		println(err.Error())
	}
}