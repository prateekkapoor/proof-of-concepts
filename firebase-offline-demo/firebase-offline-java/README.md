# firebase-offline-java

## How to Run
`./gradlew bootRun`

## How to build and run app with custom config

````
./gradlew build

java -jar /path-to-project/build/libs/firebase-offline-java-0.0.1-SNAPSHOT.jar
````

##Firebase offline capabilities
* firestore
    https://firebase.google.com/docs/firestore/manage-data/enable-offline#configure_offline_persistence

* firebase
https://firebase.google.com/docs/database/android/offline-capabilities

## firebase database is able to push document when system is online.In firestore it is not that case.