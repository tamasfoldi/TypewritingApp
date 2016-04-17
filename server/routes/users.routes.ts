import * as express from "express";
import { MongoClient  } from "mongodb";
import { dbConn } from "../config";

export let userRouter = express.Router();

userRouter.get("/:email", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      throw err;
    }
    db.collection("users").find({ email: req.params.email }).limit(1).toArray((err, result) => {
      if (err) {
        throw err;
      }
      var user = result[0];
      if (!user.lastCompletedLessonId && user.lastCompletedLessonId !== 0) {
        user.lastCompletedLessonId = -1;
      }
      res.status(200).send({ "username": user.username, "email": user.email, "password": user.password, "lastCompletedLessonId": user.lastCompletedLessonId });
      db.close();
    });
  });
});

userRouter.put("/:email", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      throw err;
    }
    db.collection("users").findOneAndUpdate({ email: req.params.email }, { $set: { lastCompletedLessonId: req.body.lastCompletedLessonId } }, (result) => {
      res.status(200).send(result);
      db.close();
    });
  });
});

userRouter.put("/:email/stats/:id", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      throw err;
    }
    db.collection("users").findOneAndUpdate({ email: req.params.email }, { $pull: { lessonStats: { _lessonId: { $eq: parseInt(req.params.id) } } } });
    db.collection("users").findOneAndUpdate({ email: req.params.email }, { $push: { lessonStats: { $each: [req.body], $position: parseInt(req.params.id) } } }, (result) => {
      res.status(200).send(result);
      db.close();
    });
  });
})