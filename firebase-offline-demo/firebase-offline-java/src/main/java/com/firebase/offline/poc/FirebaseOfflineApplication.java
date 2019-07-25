package com.firebase.offline.poc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class FirebaseOfflineApplication {
    public static void main(String[] args) {
        SpringApplication.run(FirebaseOfflineApplication.class, args);
    }

}
