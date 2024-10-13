package com.lpthinh.demo1;

import javafx.embed.swing.SwingFXUtils;
import javafx.scene.image.ImageView;
import javafx.scene.image.WritableImage;
import lombok.Getter;
import lombok.Setter;
import org.bytedeco.javacv.*;
import org.bytedeco.javacv.Frame;
import org.bytedeco.opencv.global.opencv_core;
import org.bytedeco.opencv.global.opencv_imgproc;
import org.bytedeco.opencv.global.opencv_objdetect;
import org.bytedeco.opencv.helper.opencv_imgcodecs;
import org.bytedeco.opencv.opencv_core.*;
import org.bytedeco.opencv.opencv_objdetect.CascadeClassifier;

import java.awt.*;
import java.awt.image.BufferedImage;

@Getter
@Setter
public class FaceDetector implements Runnable {
    private Database db = new Database();
    private FaceRecognizer faceRecognizer = new FaceRecognizer();
    private OpenCVFrameConverter.ToIplImage grabberConverter = new OpenCVFrameConverter.ToIplImage();
    private Java2DFrameConverter paintConverter = new Java2DFrameConverter();
    private boolean isRecognisingFace = true;
    private boolean saveFace = false;
    private boolean strangerDetected = false;

    private CascadeClassifier classifier;
    private FrameGrabber grabber = null;
    private IplImage grabbedImage = null, temp, temp2, grayImage = null, smallImage = null;
    private CvMemStorage storage;
    public ImageView frames;
    public CvSeq faces;

    WebSocketClientService webSocketClient;

    public void init() {
        webSocketClient = new WebSocketClientService("ws://localhost:8040/ws-security");

        faceRecognizer.init();
        classifier = new CascadeClassifier("D:\\facial_attendance\\demo1\\src\\main\\resources\\com\\lpthinh\\demo1\\haar\\haarcascade_frontalface_default.xml");
    }

    public void start() {
        new Thread(this).start();
    }

    @Override
    public void run() {
        try {
            try {
                grabber = OpenCVFrameGrabber.createDefault(0);
                grabber.setImageWidth(840);
                grabber.setImageHeight(630);
                grabber.start();
                grabbedImage = grabberConverter.convert(grabber.grab());

                storage = CvMemStorage.create();

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            grayImage = opencv_core.cvCreateImage(opencv_core.cvGetSize(grabbedImage), 8, 1);
            smallImage = opencv_core.cvCreateImage(opencv_core.cvSize(grabbedImage.width() / 4, grabbedImage.height() / 4), 8, 1);

            while ((grabbedImage = grabberConverter.convert(grabber.grab())) != null) {
                Frame frame = grabberConverter.convert(grabbedImage);
                BufferedImage image = paintConverter.getBufferedImage(frame, 2.2 / grabber.getGamma());
                Graphics2D g2 = image.createGraphics();

                if (faces == null) {
                    opencv_core.cvClearMemStorage(storage);
//                    create a temporary image
                    temp = opencv_core.cvCreateImage(opencv_core.cvGetSize(grabbedImage), grabbedImage.depth(), grabbedImage.nChannels());

                    opencv_core.cvCopy(grabbedImage, temp);
                    opencv_imgproc.cvCvtColor(grabbedImage, grayImage, opencv_imgproc.CV_BGR2GRAY);
                    opencv_imgproc.cvResize(grayImage, smallImage, opencv_imgproc.CV_INTER_AREA);

                    RectVector tempFaces = new RectVector();

                    classifier.detectMultiScale(new Mat(smallImage), tempFaces, 1.1, 3,
                            opencv_objdetect.CASCADE_DO_CANNY_PRUNING,
                            new Size(30, 30), new Size());

                    //face detection
                    if (grabbedImage != null) {
                        if (tempFaces.size() > 0) {
                            g2.setColor(Color.red);
                            g2.setStroke(new BasicStroke(2));

                            long total = tempFaces.size();
                            for (int i = 0; i < total; i++) {
                                CvRect rect = new CvRect(tempFaces.get(i));
                                g2.drawRect((rect.x() * 4), (rect.y() * 4), (rect.width() * 4), (rect.height() * 4));
                                Rect rectDetected = new Rect((rect.x() * 4), (rect.y() * 4), (rect.width() * 4), (rect.height() * 4));
                                opencv_core.cvSetImageROI(temp, new CvRect(rectDetected));

                                if (isRecognisingFace) {
                                    String name = "Stranger detected";
                                    int recogniseCode = faceRecognizer.recognize(temp)[0];
                                    int recogniseConf = faceRecognizer.recognize(temp)[1];
                                    g2.setFont(new Font("Arial Black", Font.BOLD, 20));
                                    g2.setColor(Color.WHITE);
                                    g2.drawString(String.format("%s", name), (int) (rect.x() * 6.5), rect.y() * 4);

//                                    g2.drawString(String.format("%s %d, %s", name, recogniseConf, recogniseCode), (int) (rect.x() * 6.5), rect.y() * 4);
//                                    if (recogniseConf < 10) {
//                                        this.strangerDetected = true;
//                                        webSocketClient.sendMessage("/app/notifications.securityNotification", "Stranger dectected");
//                                    }

                                }

                                if (saveFace) {
                                    //keep it in mind that face code should be unique to each person
                                    int id = 3;
                                    String name = "fatthinh";
                                    String fileName = String.format("%s%d-%s.jpg",
                                            this.getClass().getResource("faces").getPath().substring(1),
                                            id,
                                            name);

                                    opencv_imgcodecs.cvSaveImage(fileName, temp);
                                }
                            }
                            this.saveFace = false;
                        }

                        WritableImage showFrame = SwingFXUtils.toFXImage(image, null);

                        javafx.application.Platform.runLater(new Runnable() {
                            @Override
                            public void run() {
                                frames.setImage(showFrame);
                            }
                        });
                    }

                    opencv_core.cvReleaseImage(temp);
                }
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void stop() {
    }

    private RectVector cvtCvSeq2RectVector(CvSeq cvSeq) {
        // Create a RectVector to hold the converted rectangles
        RectVector rectVector = new RectVector();

        // Iterate through the CvSeq to extract CvRect objects
        for (int i = 0; i < cvSeq.total(); i++) {
            // Get the CvRect object from CvSeq
            CvRect cvRect = new CvRect(opencv_core.cvGetSeqElem(cvSeq, i));
            // Convert CvRect to Rect and add to RectVector
            Rect rect = new Rect(cvRect.x(), cvRect.y(), cvRect.width(), cvRect.height());
            rectVector.put(i, rect);
        }

        return rectVector;
    }
}
