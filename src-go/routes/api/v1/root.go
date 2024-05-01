package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// The RouteGroupV1 function sets up routes for the v1 API.
func RouteGroupV1(router *gin.RouterGroup) {
	v1 := router.Group("/v1")
	{
		v1.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "Welcome to the v1 root!",
			})
		})
		v1.POST("/echo", func(c *gin.Context) {
			var body map[string]interface{}
			c.BindJSON(&body)

			c.JSON(http.StatusOK, gin.H{
				"message": "Echoing the request body!",
				"body":    body,
			})
		})
	}
}