package com.lpthinh.demo1;

import lombok.Getter;
import lombok.Setter;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Getter
@Setter
class Database {
    public final String dbName = "detectiondb";
    public final String dbUser = "lpthinh";
    public final String dbPassword = "lpthinh";

    public Connection con;

    public boolean init() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            try {
                this.con = DriverManager.getConnection("jdbc:mysql://localhost:3307/" + dbName, dbUser, dbPassword);
            } catch (SQLException e) {
                System.out.println("Error: Database Connection Failed ! Please check the connection Setting");
                return false;
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }


    public void close() throws SQLException {
        try {
            con.close();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}