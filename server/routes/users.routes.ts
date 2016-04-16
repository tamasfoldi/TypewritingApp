import * as express from "express";
import { MongoClient  } from "mongodb";

let dbConn = "mongodb://admin:MAcsek24@ds023560.mlab.com:23560/typewritingapp";
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