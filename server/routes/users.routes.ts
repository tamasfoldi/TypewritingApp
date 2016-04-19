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
      res.status(200).send(user);
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
    let star = Math.floor((Math.random() * 5) + 1);
    let stat = req.body;
    let idParam = parseInt(req.params.id);
    let user;
    stat._star = star;
    db.collection("users").find({ email: req.params.email }).limit(1).toArray((err, result) => {
      if (err) {
        throw err;
      }
      user = result[0];
      if (!user.lessonStatistics[idParam] || user.lessonStatistics[idParam]._star < star) {
        user.lessonStatistics[idParam] = stat;
        db.collection("users").updateOne({ email: req.params.email }, user).then(() => {
          res.status(200).send(stat);
        });
      } else {
        res.status(200).send(user.lessonStatistics[idParam]);
      }
    });
    db.close();
  });
})