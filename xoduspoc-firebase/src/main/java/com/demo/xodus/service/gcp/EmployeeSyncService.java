package com.demo.xodus.service.gcp;

import java.util.concurrent.CompletableFuture;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.xodus.beans.Employee;
import com.demo.xodus.service.EmployeeService;
import com.demo.xodus.store.firebase.listeners.PathListener;
import com.demo.xodus.store.firebase.store.FirebaseSyncStore;

@Service
public class EmployeeSyncService {
    final static Logger LOGGER = Logger.getLogger(EmployeeSyncService.class);
    @Autowired
    FirebaseSyncStore firebaseSyncStore;
    @Autowired
    EmployeeService employeeService;

    @PostConstruct
    public void startListenting() {
        firebaseSyncStore.watchFirebasePath(createPathListener(), "/employee", Employee.class);

    }

    private PathListener<Employee> createPathListener() {
        return new PathListener<Employee>() {
            @Override
            public void onChildAdded(String key, Employee employee) {
                CompletableFuture.runAsync(() -> {
                    try {
                        employeeService.createOrUpdate(key, employee);
                    } catch (Exception e) {
                        LOGGER.error(e.getMessage(), e);
                    }
                });
            }

            @Override
            public void onChildUpdated(String key, Employee employee) {
                CompletableFuture.runAsync(() -> {
                    try {
                        employeeService.createOrUpdate(key, employee);
                    } catch (Exception e) {
                        LOGGER.error(e.getMessage(), e);
                    }
                });

            }

            @Override
            public void onChildDeleted(String key, Employee employee) {
                CompletableFuture.runAsync(() -> {
                    try {
                        employeeService.deleteEmployeeById(key);
                    } catch (Exception e) {
                        LOGGER.error(e.getMessage(), e);
                    }
                });

            }
        };
    }
}
