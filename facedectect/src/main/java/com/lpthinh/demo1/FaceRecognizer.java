package com.lpthinh.demo1;

import org.bytedeco.javacpp.DoublePointer;
import org.bytedeco.javacpp.IntPointer;
import org.bytedeco.opencv.global.opencv_core;
import org.bytedeco.opencv.global.opencv_imgcodecs;
import org.bytedeco.opencv.global.opencv_imgproc;
import org.bytedeco.opencv.opencv_core.IplImage;
import org.bytedeco.opencv.opencv_core.Mat;
import org.bytedeco.opencv.opencv_core.MatVector;
import org.bytedeco.opencv.opencv_face.LBPHFaceRecognizer;

import java.io.File;
import java.io.FilenameFilter;
import java.nio.IntBuffer;

public class FaceRecognizer {

    LBPHFaceRecognizer faceRecognizer;

    public File root;
    MatVector images;
    Mat labels;

    public void init() {
        // mention the directory the faces has been saved
        root = new File(this.getClass().getResource("faces").getFile());

        FilenameFilter imgFilter = new FilenameFilter() {
            public boolean accept(File dir, String name) {
                name = name.toLowerCase();
                return name.endsWith(".jpg") || name.endsWith(".pgm") || name.endsWith(".png");
            }
        };

        File[] imageFiles = root.listFiles(imgFilter);

        this.images = new MatVector(imageFiles.length);

        this.labels = new Mat(imageFiles.length, 1, opencv_core.CV_32SC1);
        IntBuffer labelsBuf = labels.createBuffer();

        int counter = 0;
        // reading face images from the folder

        for (File image : imageFiles) {
            Mat img = opencv_imgcodecs.imread(image.getAbsolutePath(), opencv_imgcodecs.IMREAD_GRAYSCALE);

            int label = Integer.parseInt(image.getName().split("\\-")[0]);

            images.put(counter, img);

            labelsBuf.put(counter, label);

            counter++;
        }

        this.faceRecognizer = LBPHFaceRecognizer.create();
        this.faceRecognizer.train(images, labels);
    }

    public int[] recognize(IplImage faceData) {

        Mat faces = opencv_core.cvarrToMat(faceData);

        opencv_imgproc.cvtColor(faces, faces, opencv_imgproc.CV_BGR2GRAY);

        IntPointer label = new IntPointer(1);
        DoublePointer confidence = new DoublePointer(0);

        this.faceRecognizer.predict(faces, label, confidence);

        int predictedLabel = label.get(0);
        //System.out.println(confidence.get(0));
        if (confidence.get(0) > 60) {
            int[] arr = {-1, 0};
            return arr;
        }
        int[] arr = {predictedLabel, (int) confidence.get(0)};
        return arr;
    }
}
