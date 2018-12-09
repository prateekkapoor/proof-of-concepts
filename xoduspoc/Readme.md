#Build
mvn clean install

#Run
mvn spring-boot:run

#Enpoints
* localhost:4040/employee/id/{123} - getEmployeeById
* localhost:4040/employee/name/{123} - getEmployeeByName
* localhost:4040/employee/ - getAllEmployees
* localhost:4040/employee/id/{123} - Delete- deleteEmployeeById
* localhost:4040/employee/ - post - crateOrUpdateEmployee
  update  -- {
    "employeeId": "123",
    "employeeName": "vipin",
    "employeeAddress": "Lucknow",
    "employeeCompany": "Logica"
 }
 Create -- {
    "employeeName": "vipin",
    "employeeAddress": "Lucknow",
    "employeeCompany": "Logica"
 }
 
###Xodus Libraray:
https://github.com/JetBrains/xodus/wiki/Environments#reading
 
