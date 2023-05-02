package routers

import (
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON("RESTFull API is called successfully!")
	})

	app.Mount("/auth", AuthRoute())
	app.Mount("/users", UserRoute())
}