package com.api.testing.demo.rest;

import static com.api.testing.demo.rest.RestAssuredTemplate.restTemplateConfig;
import static com.api.testing.demo.rest.RestAssuredTemplate.restTemplateMultiPartConfig;

import com.api.testing.demo.utils.ApplicationUtils;

import io.restassured.builder.MultiPartSpecBuilder;
import io.restassured.path.json.JsonPath;
import io.restassured.specification.MultiPartSpecification;

public class Rest {

    public static JsonPath get(String path) {
        return restTemplateConfig().get(path).jsonPath();
    }

    public static JsonPath post(String path, String body) {
        return restTemplateConfig().body(body).post(path).jsonPath();
    }

    public static JsonPath patch(String path, String body) {
        return restTemplateConfig().body(body).patch(path).jsonPath();
    }

    public static JsonPath postMultiPart(String path, String fileName, String mimeType) {
        MultiPartSpecification multiPartSpecification =
                new MultiPartSpecBuilder(ApplicationUtils.readFile(fileName).getBytes()).
                        fileName(fileName).
                        mimeType(mimeType).
                        build();
        return restTemplateMultiPartConfig()
                .multiPart(multiPartSpecification)
                .post(path).jsonPath();
    }
}
