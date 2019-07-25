package com.firebase.offline.poc.services;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FirebaseTests {

    @Autowired
    private FirebaseDatabase firebaseDatabase;

    @PostConstruct
    public void startUp() {
        Timer timer = new Timer();
        TimerTask task = new Helper();

        timer.schedule(task, 2000, 5000);
    }

    private void pushDataFirebase(String id) {
        log.info("firebase Id: " + id);
        DatabaseReference usersRef = firebaseDatabase.getReference("users/" + id);
        Map<String, User> users = new HashMap<>();
        users.put("alanisawesome", new User("June 23, 1912", "Alan Turing", id));
        //users.put("gracehop", new User("December 9, 1906", "Grace Hopper", id));
        usersRef.setValueAsync(users);
    }

    private class Helper extends TimerTask {

        public void run() {
            pushDataFirebase(UUID.randomUUID().toString());
        }
    }

    class User {

        public String date_of_birth;
        public String full_name;
        public String nickname;
        public String id;
        public String createDateTime;


        public User(String dateOfBirth, String fullName) {
            this.full_name = fullName;
            this.date_of_birth = this.full_name;
            // ...
        }

        public User(String dateOfBirth, String fullName, String id) {
            this.full_name = fullName;
            this.date_of_birth = this.full_name;
            this.id = id;
            this.createDateTime = new Date().toString();
            // ...
        }
    }

}

