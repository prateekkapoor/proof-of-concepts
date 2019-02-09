package com.api.testing.demo.utils;

import java.io.IOException;
import java.nio.charset.Charset;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

public class ApplicationUtils {

    public static String readFile(String fileName) {
        try {
            return IOUtils.resourceToString(fileName, Charset.defaultCharset(), FileUtils.class.getClassLoader());
        } catch (IOException e) {

        }
        return null;
    }
}
