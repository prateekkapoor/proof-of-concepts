package com.api.testing.demo.beans;

import io.restassured.path.json.JsonPath;

public class UploadFileResponse {
    private JsonPath jsonPath;

    private String fileURL;

    public String getFileURL() {
        return jsonPath.getString("fileURL");
    }

    public UploadFileResponse(JsonPath jsonPath) {
        this.jsonPath = jsonPath;
    }
}
