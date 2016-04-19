import * as express from "express";
import { MongoClient  } from "mongodb";
import { dbConn } from "../config";

export let lessonRouter = express.Router();

lessonRouter.get("/", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      res.status(501).send("Internal Server Error")
      return;
    }
    db.collection("lessons").find({}).toArray().then((result) => {
      res.status(200).send(result);
      db.close();
    }, () => {
      res.status(401).send("Bad request");
      return;
    });
  });
});

lessonRouter.get("/:id", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      res.status(501).send("Internal Server Error")
      return;
    }
    db.collection("lessons").find({ id: parseInt(req.params.id) }).limit(1).toArray((err, result) => {
      if (err) {
        res.status(404).send("Lesson not found");
        return;
      }
      let lesson = result[0];
      res.status(200).send(lesson);
      db.close();
    });
  });
});