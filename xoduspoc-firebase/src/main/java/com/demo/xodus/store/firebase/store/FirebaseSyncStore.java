package com.demo.xodus.store.firebase.store;

import com.demo.xodus.store.firebase.listeners.PathListener;

public interface FirebaseSyncStore {
    <T> void watchFirebasePath(PathListener<T> var3, String path, Class<T> claaz);
}
