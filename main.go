package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getCompanies() ([]Company, error) {
	var companies []Company
	raw, err := ioutil.ReadFile("./data/Companies.json")
	if err != nil {
		return nil, err
	}
	json.Unmarshal(raw, &companies)
	return companies, nil
}

func getGuests() ([]Guest, error) {
	var guests []Guest
	raw, err := ioutil.ReadFile("./data/Guests.json")
	if err != nil {
		return nil, err
	}
	json.Unmarshal(raw, &guests)
	return guests, nil
}

func getMessages() ([]Message, error) {
	var messages []Message
	raw, err := ioutil.ReadFile("./data/Messages.json")
	if err != nil {
		return nil, err
	}
	json.Unmarshal(raw, &messages)
	return messages, nil
}

func main() {
	fmt.Println("Hello World!")
	companies, _ := getCompanies()
	fmt.Println(companies)
	guests, err := getGuests()
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(guests)
	messages, _ := getMessages()
	test := fmt.Sprintf(messages[0].Message, "Good morning", "Candy", 305, "Hotel California")
	fmt.Println(test)

	routes := gin.Default()
	routes.LoadHTMLFiles("./public/views/index.html")
	routes.Static("/static", "./public/static/")
	routes.Static("/vendors", "./public/static/vendors")
	// routes.Static("/controllers", "./public/scripts/controllers")
	// routes.Static("/services", "./public/scripts/services")
	// routes.Static("/angular", "./public/vendors/angular")
	// routes.Static("/angular-route", "./public/vendors/angular-route")
	// routes.Static("/bootstrap", "./public/vendors/bootstrap")

	routes.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	routes.GET("/companies", func(c *gin.Context) {
		results, _ := getCompanies()
		c.JSON(200, results)
	})

	routes.GET("/guests", func(c *gin.Context) {
		results, _ := getGuests()
		c.JSON(200, results)
	})

	routes.Run()
}
