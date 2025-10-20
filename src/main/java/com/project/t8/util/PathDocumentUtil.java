package com.project.t8.util;

import java.io.File;
import java.io.FileOutputStream;

public class PathDocumentUtil {
    public static void saveFile(File input){
        String path="path\\"+input.getName();
        FileOutputStream file = new File(path);
        if(!file.exists()){}
    }
}
