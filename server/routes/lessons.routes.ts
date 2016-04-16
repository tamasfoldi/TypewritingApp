import * as express from "express";
import { MongoClient  } from "mongodb";
import { dbConn } from "../config";

export let lessonRouter = express.Router();

lessonRouter.get("/", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      throw err;
    }
    db.collection("lessons").find({}).toArray().then((result) => {
      res.status(200).send(result);
      db.close();
    })
  });
});

lessonRouter.get("/:id", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      throw err;
    }
    db.collection("lessons").find({ id: parseInt(req.params.id) }).limit(1).toArray((err, result) => {
      if (err) {
        throw err;
      }
      let lesson = result[0];
      res.status(200).send(lesson);
      db.close();
    });
  });
});