package com.demo.xodus.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.demo.xodus.configuration.PropertiesConfiguration;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = {
        "com.demo.xodus.store",
        "com.demo.xodus.controller",
        "com.demo.xodus.service",
        "com.demo.xodus.dao",
        "com.demo.xodus.constants"
})
@Import({PropertiesConfiguration.class})
@PropertySource(value = {"classpath:Application.properties"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
