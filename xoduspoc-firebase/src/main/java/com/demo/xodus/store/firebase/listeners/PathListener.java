package com.demo.xodus.store.firebase.listeners;

public interface PathListener<T> {
    void onChildAdded(String value, T var2);

    void onChildUpdated(String value, T var2);

    void onChildDeleted(String value, T var2);

    default void onError(String message) {
    }
}
