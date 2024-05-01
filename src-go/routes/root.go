package routes

import (
	"net/http"

	utils "github.com/JesseKoldewijn/waku_jereko_dev/src-go/routes/api/utils"
	v1 "github.com/JesseKoldewijn/waku_jereko_dev/src-go/routes/api/v1"
	"github.com/gin-gonic/gin"
)

// The function `RouteGroupRoot` sets up route groups with different prefixes in a Gin router.
func RouteGroupRoot(router *gin.Engine) {
	// prefix /assets
	routeGroupStatic(router)
	// prefix /api
	routeGroupApi(router)
}

// Route group for static file routes
func routeGroupStatic(router *gin.Engine) {
	staticGroup := router.Group("/assets")
	staticGroup.StaticFS("/", http.Dir("./public"))
}

// Route group for API routes
func routeGroupApi(router *gin.Engine) {
	apiGroup := router.Group("/api")
	// path: /
	apiGroup.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to the Jereko API!",
		})
	})
	// path: /api/v1
	v1.RouteGroupV1(apiGroup)
	// path: /api/utils
	utils.RouteGroupUtils(apiGroup)
}