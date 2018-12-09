package com.demo.xodus.store;

import jetbrains.exodus.entitystore.PersistentEntityStore;
import jetbrains.exodus.entitystore.PersistentEntityStores;
import jetbrains.exodus.entitystore.StoreTransactionalComputable;
import jetbrains.exodus.entitystore.StoreTransactionalExecutable;

import java.io.File;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class XodusEntityStore implements EntityStore {

    final static Logger LOGGER = Logger.getLogger(XodusEntityStore.class);
    private PersistentEntityStore store;
    @Value(value = "${xml.store.root}")
    private String xodusDir;

    @PostConstruct
    public void start() {
        LOGGER.info("Starting entity store");
        this.store = PersistentEntityStores.newInstance(getStoreDir());
    }

    public <T> T read(StoreTransactionalComputable<T> computable) {
        return store.computeInReadonlyTransaction(computable);
    }

    public <T> T readAndWrite(StoreTransactionalComputable<T> computable) {
        return store.computeInTransaction(computable);
    }

    public void write(StoreTransactionalExecutable executable) {
        store.executeInTransaction(executable);
    }

    @PreDestroy
    public void stop() {
        LOGGER.info("Closing entity store");
        store.close();
    }

    private File getStoreDir() {
        return new File(xodusDir, "xd");
    }

    public String getXodusDir() {
        return xodusDir;
    }

    public void setXodusDir(String xodusDir) {
        this.xodusDir = xodusDir;
    }
}
