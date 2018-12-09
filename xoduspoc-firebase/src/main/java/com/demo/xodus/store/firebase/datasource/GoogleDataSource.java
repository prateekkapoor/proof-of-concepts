package com.demo.xodus.store.firebase.datasource;

import java.io.FileInputStream;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

@Repository
public class GoogleDataSource {
    final static org.apache.log4j.Logger LOGGER = Logger.getLogger(GoogleDataSource.class);

    @Value(value = "${firebase.url}")
    private String databaseUrl;
    private DatabaseReference datastoreRef;

    @Value(value = "${db.root:/department}")
    private String dbRoot;

    @PostConstruct
    public void initializeApp() {
        try {
            datastoreRef = GoogleDataSource.this.getDBInstance().getReference();
        } catch (IOException e) {
            LOGGER.error("ERROR: invalid service account credentials. Error: " + e.getMessage(), e);
        }
    }

    public DatabaseReference getRef() {
        try {
            return datastoreRef.child(dbRoot);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private FirebaseDatabase getDBInstance() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            initializeFirebaseApp();
        }
        return FirebaseDatabase.getInstance();
    }

    private void initializeFirebaseApp() throws IOException {
        // Initialize Firebase
        // [START initialize]
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(
                        new ClassPathResource("serviceAccountKey.json").getInputStream()))
                .setDatabaseUrl(databaseUrl)
                .build();
        FirebaseApp.initializeApp(options);
        // [END initialize]
    }
}
