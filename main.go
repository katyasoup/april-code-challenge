package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// Reservation object
type Reservation struct {
	Room     int `json:"roomNumber"`
	ResStart int `json:"startTimestamp"`
	ResEnd   int `json:"endTimestamp"`
}

// Guest object
type Guest struct {
	ID        int         `json:"id"`
	FirstName string      `json:"firstName"`
	LastName  string      `json:"lastName"`
	ResDeets  Reservation `json:"reservation"`
}

// Company object
type Company struct {
	ID       int    `json:"id"`
	Company  string `json:"company"`
	City     string `json:"city"`
	Timezone string `json:"timezone"`
}

func getCompanies() ([]Company, error) {
	var companies []Company
	raw, err := ioutil.ReadFile("./Companies.json")
	if err != nil {
		return nil, err
	}
	json.Unmarshal(raw, &companies)
	return companies, nil
}

func getGuests() ([]Guest, error) {
	var guests []Guest
	raw, err := ioutil.ReadFile("./Guests.json")
	if err != nil {
		return nil, err
	}
	json.Unmarshal(raw, &guests)
	return guests, nil
}

func main() {
	fmt.Println("Hello!")
	companies, _ := getCompanies()
	fmt.Println(companies)
	guests, err := getGuests()
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(guests)
}
