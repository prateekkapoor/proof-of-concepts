package com.api.testing.demo.api;

import com.api.testing.demo.beans.UploadFileResponse;
import com.api.testing.demo.rest.Rest;

;

public class ApiImpl implements Api {

    @Override
    public UploadFileResponse uploadFile(String path, String fileName, String mimeType) {
        String uploadAPIPath = APIUrl.UPLOAD_FILE.path
                .replace("{path}", path);
        return new UploadFileResponse(Rest.postMultiPart(uploadAPIPath, fileName, mimeType));
    }


}
