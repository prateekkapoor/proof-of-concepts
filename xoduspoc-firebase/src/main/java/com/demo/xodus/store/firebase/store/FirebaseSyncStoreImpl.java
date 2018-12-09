package com.demo.xodus.store.firebase.store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.xodus.store.firebase.datasource.GoogleDataSource;
import com.demo.xodus.store.firebase.listeners.PathListener;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;

@Service
public class FirebaseSyncStoreImpl implements FirebaseSyncStore {
    @Autowired
    GoogleDataSource googleDataSource;

    @Override
    public <T> void watchFirebasePath(PathListener<T> listener, String path, Class<T> claaz) {
        googleDataSource.getRef().child(path).addChildEventListener(new ChildEventListener() {
            public void onChildAdded(DataSnapshot snapshot, String previousChildName) {
                listener.onChildAdded(snapshot.getKey(), snapshot.getValue(claaz));
            }

            public void onChildChanged(DataSnapshot snapshot, String previousChildName) {
                listener.onChildUpdated(snapshot.getKey(), snapshot.getValue(claaz));
            }

            public void onChildMoved(DataSnapshot snapshot, String previousChildName) {
                listener.onChildDeleted(snapshot.getKey(), snapshot.getValue(claaz));
            }

            public void onChildRemoved(DataSnapshot snapshot) {
                listener.onChildDeleted(snapshot.getKey(), snapshot.getValue(claaz));
            }

            public void onCancelled(DatabaseError error) {
                listener.onError(error.getMessage());
            }
        });
    }
}
