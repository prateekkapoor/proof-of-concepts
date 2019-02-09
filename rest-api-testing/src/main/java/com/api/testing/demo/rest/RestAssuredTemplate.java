package com.api.testing.demo.rest;

import com.api.testing.demo.api.Api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

import static io.restassured.RestAssured.given;

public class RestAssuredTemplate {
    final static String baseURI = "https://seismic.firebaseapp.com";
    final static String basePath = Api.APIUrl.BASE_PATH.path;

    public static RequestSpecification restTemplateConfig() {
        RestAssured.baseURI = baseURI;
        RestAssured.basePath = basePath;
        return given().when().contentType(ContentType.JSON).log().all();
    }

    public static RequestSpecification restTemplateMultiPartConfig() {
        RestAssured.baseURI = baseURI;
        RestAssured.basePath = basePath;
        return given().when().log().all();
    }
}
