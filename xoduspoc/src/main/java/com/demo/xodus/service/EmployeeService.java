package com.demo.xodus.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.xodus.beans.Employee;
import com.demo.xodus.dao.EmployeeDao;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeDao employeeDao;

    public Employee getEntityByKey(String id) {
        return employeeDao.getEntityByKey(id);
    }

    public Employee getEmployeesByName(String name) {
        return employeeDao.getEmployeesByName(name);
    }

    public List<Employee> getEmployees() {
        return employeeDao.getEmployees();
    }

    public Employee deleteEmployeeById(String id) {
        return employeeDao.deleteEmployeeById(id);
    }

    public void createOrUpdate(Employee employee) {
        String id = employee.getEmployeeId() != null ? employee.getEmployeeId() : UUID.randomUUID().toString();
        employeeDao.createOrUpdate(id, employee);
    }
}
