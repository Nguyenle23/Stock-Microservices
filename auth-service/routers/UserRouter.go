package routers

import (
	"github.com/Nguyenle23/Stocking-Microservices/handlers"
	"github.com/gofiber/fiber/v2"
)

func UserRoute() *fiber.App {
	app := fiber.New()

	app.Get("/", handlers.GetAllUsers)
	app.Get("/:id", handlers.GetUserID)
	app.Put("/:id", handlers.UpdateUser)
	app.Delete("/:id", handlers.DeleteUserByID)
	
	return app
}
