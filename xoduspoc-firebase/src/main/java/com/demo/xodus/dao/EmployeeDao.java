package com.demo.xodus.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.xodus.beans.Employee;
import com.demo.xodus.constants.ApplicationConstant;
import com.demo.xodus.store.EntityStore;

import jetbrains.exodus.entitystore.Entity;
import jetbrains.exodus.entitystore.EntityIterable;
import jetbrains.exodus.entitystore.EntityIterator;
import jetbrains.exodus.entitystore.StoreTransaction;
import jetbrains.exodus.entitystore.StoreTransactionalComputable;
import jetbrains.exodus.entitystore.StoreTransactionalExecutable;

@Service
public class EmployeeDao {
    final static Logger LOGGER = Logger.getLogger(EmployeeDao.class);
    @Autowired
    private EntityStore store;
    @Autowired
    ApplicationConstant applicationConstant;

    public void createOrUpdate(String id, Employee employee) {
        LOGGER.info("Got employee " + employee);
        Entity existingEmployee = getEntityById(id);
        store.write(new StoreTransactionalExecutable() {
            @Override
            public void execute(StoreTransaction txn) {
                existingEmployee.setProperty("employeeId", id);
                existingEmployee.setProperty("employeeName", employee.getEmployeeName());
                existingEmployee.setProperty("employeeAddress", employee.getEmployeeAddress());
                existingEmployee.setProperty("employeeCompany", employee.getEmployeeCompany());
                txn.saveEntity(existingEmployee);
                LOGGER.info("Saved asset image properties " + existingEmployee);
            }
        });
    }

    private Entity getEntityById(String id) {
        return store.readAndWrite(new StoreTransactionalComputable<Entity>() {
            @Override
            public Entity compute(@NotNull StoreTransaction txn) {
                EntityIterable es = txn.find(EntityStore.EntityType.Employee.name(), "employeeId", id);
                if (es.size() > 0) {
                    return es.getFirst();
                } else {
                    return txn.newEntity(EntityStore.EntityType.Employee.name());
                }
            }
        });
    }

    public Employee getEntityByKey(String id) {
        return store.readAndWrite(new StoreTransactionalComputable<Employee>() {
            @Override
            public Employee compute(@NotNull StoreTransaction txn) {
                EntityIterable es = txn.find(EntityStore.EntityType.Employee.name(), "employeeId", id);
                if (es.size() > 0) {
                    return getObjectFromEntity(es.getFirst());
                } else {
                    return getObjectFromEntity(txn.newEntity(EntityStore.EntityType.Employee.name()));
                }
            }
        });
    }

    public Employee removeEntity(String id) {
        LOGGER.info("Removing employeeId " + id);
        Entity employeeEntity = getEntityById(id);
        Employee employeeToBeDeleted = getObjectFromEntityInTransaction(employeeEntity);
        store.write(new StoreTransactionalExecutable() {
            @Override
            public void execute(StoreTransaction txn) {
                employeeEntity.delete();
                LOGGER.info("Removed Employee" + employeeToBeDeleted);
            }
        });
        return employeeToBeDeleted;
    }

    public Employee getEmployeesByName(String name) {
        return store.readAndWrite(new StoreTransactionalComputable<Employee>() {
            @Override
            public Employee compute(@NotNull StoreTransaction txn) {
                EntityIterable es = txn.find(EntityStore.EntityType.Employee.name(), "employeeName", name);
                if (es.size() > 0) {
                    return getObjectFromEntity(es.getFirst());
                } else {
                    return getObjectFromEntity(txn.newEntity(EntityStore.EntityType.Employee.name()));
                }
            }
        });
    }

    private Employee getObjectFromEntity(Entity entity) {
        Employee employee = new Employee();
        employee.setEmployeeId(applicationConstant.getProperty("employeeId", entity, String.class));
        employee.setEmployeeName(applicationConstant.getProperty("employeeName", entity, String.class));
        employee.setEmployeeAddress(applicationConstant.getProperty("employeeAddress", entity, String.class));
        employee.setEmployeeCompany(applicationConstant.getProperty("employeeCompany", entity, String.class));
        return employee;
    }

    private Employee getObjectFromEntityInTransaction(Entity entity) {
        return store.read(new StoreTransactionalComputable<Employee>() {
            @Override
            public Employee compute(@NotNull StoreTransaction txn) {
                return getObjectFromEntity(entity);
            }
        });
    }

    public Employee deleteEmployeeById(String id) {
        return removeEntity(id);
    }

    public List<Employee> getEmployees() {
        return store.readAndWrite(new StoreTransactionalComputable<List<Employee>>() {
            List<Employee> employees = new ArrayList<>();

            @Override
            public List<Employee> compute(@NotNull StoreTransaction txn) {
                EntityIterator entityIterable = txn.getAll(EntityStore.EntityType.Employee.name()).iterator();
                while (entityIterable.hasNext()) {
                    employees.add(getObjectFromEntity(entityIterable.next()));
                }
                return employees;
            }
        });
    }
}
