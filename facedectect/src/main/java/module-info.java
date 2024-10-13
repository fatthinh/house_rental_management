module com.lpthinh.demo1 {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;
    requires static lombok;
    requires org.bytedeco.javacv;
    requires org.bytedeco.opencv;
    requires org.bytedeco.javacpp;
    requires javafx.swing;
    requires spring.websocket;
    requires spring.messaging;

    opens com.lpthinh.demo1 to javafx.fxml;
    exports com.lpthinh.demo1;
}