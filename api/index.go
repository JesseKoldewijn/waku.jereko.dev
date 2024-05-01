package handler

import (
	"net/http"

	"github.com/JesseKoldewijn/waku_jereko_dev/src-go/routes"
	"github.com/gin-gonic/gin"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// Create router
	router := gin.Default()

	// Default headers
	router.Use(func(c *gin.Context) {
		// origin of same domain is allowed 
		c.Header("Access-Control-Allow-Origin", "*") 
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		c.Header("Content-Type", "application/json")
		c.Header("Accept", "application/json")
		c.Next()
	})

	// Routes
	routes.RouteGroupRoot(router)

	// running gin engine
	router.ServeHTTP(w, r)
}