package handler

import (
	"net/http"
	"time"

	"github.com/JesseKoldewijn/waku_jereko_dev/src-go/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// Create router
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin, X-Requested-With, Content-Type, Accept, Cache-Control"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// AllowOriginFunc: func(origin string) bool {
		//   return origin == "https://github.com"
		// },
		MaxAge: 12 * time.Hour,
	}))

	// Routes
	routes.RouteGroupRoot(router)

	// running gin engine
	router.ServeHTTP(w, r)
}