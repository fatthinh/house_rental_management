package com.lpthinh.demo1;

import javafx.fxml.FXML;
import javafx.scene.image.ImageView;

public class HelloController {
    private FaceDetector faceDetector = new FaceDetector();
    private Database db = new Database();

    @FXML
    private ImageView frame;

    @FXML
    public void initialize() {
        faceDetector.init();
        faceDetector.setFrames(frame);
        faceDetector.start();
    }

    @FXML
    public void savePerson() {
        this.faceDetector.setSaveFace(true);
    }
}