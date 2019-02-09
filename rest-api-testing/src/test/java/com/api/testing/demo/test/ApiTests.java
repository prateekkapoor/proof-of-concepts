package com.api.testing.demo.test;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.api.testing.demo.api.Api;
import com.api.testing.demo.api.ApiImpl;
import com.api.testing.demo.beans.UploadFileResponse;

public class ApiTests {

    private Api api = new ApiImpl();

    @BeforeClass
    public void setup() {
    }

    @Test
    public void uploadFile() {
        String folderPath = "test";
        UploadFileResponse uploadFileResponse = api.uploadFile(folderPath, "testFile.csv", "text/csv");
        Assert.assertNotNull(uploadFileResponse);
        Assert.assertNotNull(uploadFileResponse.getFileURL());
        Assert.assertEquals(true, uploadFileResponse.getFileURL().contains("storage.googleapis.com"));
    }

    @AfterClass
    public void tearDown() {

    }
}
