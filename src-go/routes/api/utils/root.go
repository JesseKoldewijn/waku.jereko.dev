package utils

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mileusna/useragent"
)

func getClientIPByHeaders(req *http.Request) (ip string, err error) {
    // Client could be behid a Proxy, so Try Request Headers (X-Forwarder)
    ipSlice := []string{}

    ipSlice = append(ipSlice, req.Header.Get("X-Forwarded-For"))
    ipSlice = append(ipSlice, req.Header.Get("x-forwarded-for"))
    ipSlice = append(ipSlice, req.Header.Get("X-FORWARDED-FOR"))

    for _, v := range ipSlice {
        if v != "" {
            return v, nil
        }
    }
    err = errors.New("error: Could not find clients IP address from the Request Headers")
    return "", err
}

// The RouteGroupUtils function in Go sets up a route group for utility endpoints like retrieving client IP and user agent information.
func RouteGroupUtils(router *gin.RouterGroup) {
	utils := router.Group("/utils")
	{
		utils.GET("/ip", func(c *gin.Context) {
			ref := c.Request.Header.Get("Referer")

			uaString := c.Request.Header.Get("User-Agent")
			uaParsed := useragent.Parse(uaString)

			ipFromHeaders, err := getClientIPByHeaders(c.Request)

			if err != nil {
				c.JSON(http.StatusOK, gin.H{
					"ip":       c.ClientIP(),
					"referer":  ref,
					"os":       uaParsed.OS,
					"browser":  uaParsed.Name,
					"isMobile": uaParsed.Mobile,
					"ip-variant": "request-ctx",
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"ip":       ipFromHeaders,
				"referer":  ref,
				"os":       uaParsed.OS,
				"browser":  uaParsed.Name,
				"isMobile": uaParsed.Mobile,
				"ip-variant": "request-headers",
			})
		})

	}
}