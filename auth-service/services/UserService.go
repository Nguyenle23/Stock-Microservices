package services

import (
	"github.com/Nguyenle23/Stocking-Microservices/database"
	"github.com/Nguyenle23/Stocking-Microservices/helpers"
	"github.com/Nguyenle23/Stocking-Microservices/repository"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func GetAllUsers(c *fiber.Ctx) error {
	users := repository.UserRepo(database.DB.Db).FindAllUsers()
	if len(users) == 0 {
		return c.Status(404).JSON(fiber.Map{"message": "No users in database"})
	}
	return c.Status(200).JSON(fiber.Map{ "total": len(users), "data": users})
}

func GetUserByID(c *fiber.Ctx) error {
	userID := c.Params("id")
	user := repository.UserRepo(database.DB.Db).FindUserByID(userID)
	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"message": "User not found", "data": nil})
	}
	return c.Status(200).JSON(fiber.Map{"data": user})
}

func UpdateUser(c *fiber.Ctx) error {
	type updateUser struct {
		Password string `json:"password"`
	}

	userID := c.Params("id")
	user := repository.UserRepo(database.DB.Db).FindUserByID(userID)
	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"message": "User not found", "data": nil})
	}

	var updateUserData updateUser
	err := c.BodyParser(&updateUserData)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Invalid input"})
	}

	if len(updateUserData.Password) < 6 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password must be at least 6 characters",	
		})
	}

	hashedPass, _ := helpers.HashPassword(updateUserData.Password)
	user.Password = hashedPass
	repository.UserRepo(database.DB.Db).UpdateUserByID(userID, user)
	return c.Status(200).JSON(fiber.Map{"message": "Update user successfully", "data": user})
}

func DeleteUserByID(c *fiber.Ctx) error {
	userID := c.Params("id")
	user := repository.UserRepo(database.DB.Db).FindUserByID(userID)
	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"message": "User not found", "data": nil})
	}
	repository.UserRepo(database.DB.Db).DeleteUserByID(userID)
	return c.Status(200).JSON(fiber.Map{"message": "Delete user successfully"})
}
