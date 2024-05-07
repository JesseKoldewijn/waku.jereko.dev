package v1

import (
	"io"
	"net/http"
	"time"

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
		v1.GET("/timestamp", func(c *gin.Context) {
			now := time.Now().UTC();
			c.JSON(http.StatusOK, gin.H{
				"timestamp": now,
			})
		})
		v1.POST("/echo", func(c *gin.Context) {
			// Get the request body
			jsonData, err := io.ReadAll(c.Request.Body)
			if err != nil {
				// Handle error
				c.JSON(http.StatusInternalServerError, gin.H{
					"message": "Error reading request body!",
				})
			}

			c.JSON(http.StatusOK, gin.H{
				"message": "Echoing the request body!",
				"body":    string(jsonData),
			})
		})
	}
}