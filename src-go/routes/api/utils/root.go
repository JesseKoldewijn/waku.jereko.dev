package utils

import (
	"github.com/gin-gonic/gin"
	"github.com/mileusna/useragent"
)

// The RouteGroupUtils function in Go sets up a route group for utility endpoints like retrieving client IP and user agent information.
func RouteGroupUtils(router *gin.RouterGroup) {
	utils := router.Group("/utils")
	{
		utils.GET("/ip", func(c *gin.Context) {
			ip := c.ClientIP()

			uaString := c.Request.Header.Get("User-Agent")
			uaParsed := useragent.Parse(uaString)

			c.JSON(200, gin.H{
				"ip":       ip,
				"os":       uaParsed.OS,
				"browser":  uaParsed.Name,
				"isMobile": uaParsed.Mobile,
			})
		})

	}
}