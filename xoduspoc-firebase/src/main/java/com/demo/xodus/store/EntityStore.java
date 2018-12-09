package com.demo.xodus.store;

import jetbrains.exodus.entitystore.StoreTransactionalComputable;
import jetbrains.exodus.entitystore.StoreTransactionalExecutable;

public interface EntityStore {

    enum EntityType {
        Employee
    }

    <T> T read(StoreTransactionalComputable<T> computable);

    <T> T readAndWrite(StoreTransactionalComputable<T> computable);

    void write(StoreTransactionalExecutable executable);

}
