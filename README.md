# Stocks-WebApp

## Frontend

* Give a more specific top and bottom chart margin dependent on stock area not hardcoded -5 and 5
* Remove unneeded navbar items
* Add Chart Option for half a year and a year
* make tooltips more specific (Date)


## Backend

### Development

* [x] Decide on the storage - Sequel or nonSequel
  * [x] MySQL  
  * [ ] MongoDB

#### set up MySQL DB

* [ ] Install MySQL DB on local machine
* [ ] Write CommandLineRunner to insert Data into DB
* [ ] Insert some stockData into DB

### Deploy

* [ ] give Spring Boot access to Stock .csv files -> [stackoverflow](https://bit.ly/3jnzXAw)

#### setup Linode Server Instance

* 
 
  
  
  
  
* [x] Decide on the Specs for the instance
  * Spring Boot + Security + Docker = 200 - 300 RAM according to [stackoverflow](https://bit.ly/3cJy7ai)
  * MySql 500MB
  * [x] 2 GB RAM Instance will suffice for my needs right now, could also separate MySQL and Spring Instance
  * [ ] Separate DB and App Instances



* Install Jenkins
* Configure CI pipeline: local Development -> Github -> Linode Instance