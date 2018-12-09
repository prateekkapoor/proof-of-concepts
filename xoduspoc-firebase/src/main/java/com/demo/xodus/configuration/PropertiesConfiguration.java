package com.demo.xodus.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "prefix")
@Component
public class PropertiesConfiguration {

}