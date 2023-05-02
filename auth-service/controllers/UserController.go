package controllers

import (
	"github.com/Nguyenle23/Stocking-Microservices/services"
	"github.com/gofiber/fiber/v2"
)

func UserController() *fiber.App {
	app := fiber.New()

	app.Get("/", services.GetAllUsers)
	app.Get("/:id", services.GetUserByID)
	app.Put("/:id", services.UpdateUser)
	app.Delete("/:id", services.DeleteUserByID)

	return app
}