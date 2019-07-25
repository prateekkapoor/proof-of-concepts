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
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FirestoreTests {
    @Autowired
    private Firestore firestore;

    @PostConstruct
    public void startUp() {
        Timer timer = new Timer();
        TimerTask task = new Helper();

        timer.schedule(task, 2000, 5000);
    }

    private void pushDataFirestore(String id) {
        log.info("firestore Id: " + id);
        // Create a Map to store the data we want to set
        Map<String, Object> docData = new HashMap<>();
        docData.put("name", "Los Angeles");
        docData.put("state", "CA");
        docData.put("country", "USA");
        docData.put("regions", Arrays.asList("west_coast", "socal"));
        docData.put("id", id);
        docData.put("createDateTime", new Date());
        // Add a new document (asynchronously) in collection "cities" with id "LA"
        ApiFuture<WriteResult> future = firestore.collection("cities").document(id).set(docData);
    }

    private class Helper extends TimerTask {

        public void run() {
            pushDataFirestore(UUID.randomUUID().toString());
        }
    }
}
