package com.demo.xodus.constants;

import org.springframework.stereotype.Component;

import jetbrains.exodus.entitystore.Entity;

@Component
public class ApplicationConstant {

    public <T> T getProperty(String key, Entity entity, Class<T> claaz) {
        return (T) entity.getProperty(key);
    }
}
