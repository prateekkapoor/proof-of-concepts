package com.api.testing.demo.api;

import com.api.testing.demo.beans.UploadFileResponse;

import static io.restassured.RestAssured.given;

public interface Api {

    enum APIUrl {

        BASE_PATH("/store/api/v1/"),
        UPLOAD_FILE("upload/{path}");

        public String path;

        APIUrl(String url) {
            this.path = url;
        }
    }

    UploadFileResponse uploadFile(String apiPath, String fileName, String mimeType);

}
