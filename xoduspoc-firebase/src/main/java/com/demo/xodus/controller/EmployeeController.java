package com.demo.xodus.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xodus.beans.Employee;
import com.demo.xodus.dao.EmployeeDao;
import com.demo.xodus.service.EmployeeService;

///          /xodus/employee/id/123
@RestController
@RequestMapping("/xodus/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @RequestMapping("/id/{id}")
    @ResponseBody
    public Employee getEmployeeById(@PathVariable("id") String id) {
        return employeeService.getEntityByKey(id);

    }

    @RequestMapping("/name/{name}")
    @ResponseBody
    public Employee getEmployeeByName(@PathVariable("name") String name) {
        return employeeService.getEmployeesByName(name);
    }

    @ResponseBody
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();

    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public void createOrUpdate(@RequestBody Employee employee) {
        System.out.println(employee);
        employeeService.createOrUpdate(employee);
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Employee deleteEmployeeById(@PathVariable("id")String id) {
        return employeeService.deleteEmployeeById(id);
    }
}
