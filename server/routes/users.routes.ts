import * as express from "express";
import { MongoClient  } from "mongodb";
import { dbConn } from "../config";

export let userRouter = express.Router();

userRouter.get("/:email", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      res.status(501).send("Internal Server Error")
      db.close();
      return;
    }
    db.collection("users").find({ email: req.params.email }).limit(1).toArray((err, result) => {
      if (err) {
        res.status(404).send("User not found");
        db.close();
        return;
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

userRouter.put("/last-completed-lesson/:email", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      res.status(501).send("Internal Server Error")
      db.close();
      return;
    }
    db.collection("users").findOneAndUpdate({ email: req.params.email }, { $set: { lastCompletedLessonId: req.body.lastCompletedLessonId } }, (result) => {
      res.status(200).send(result);
      db.close();
    }, () => {
      res.status(401).send("Bad request");
      db.close();
      return;
    });
  });
});

userRouter.put("/:email/stats/:id", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      res.status(501).send("Internal Server Error")
      db.close();
      return;
    }
    let star = Math.floor((Math.random() * 5) + 1);
    let stat = req.body;
    let idParam = parseInt(req.params.id);
    let user;
    stat._star = star;
    db.collection("users").find({ email: req.params.email }).limit(1).toArray((err, result) => {
      if (err) {
        res.status(404).send("User not found");
        db.close();
        return;
      }
      user = result[0];
      if(idParam > user.lastCompletedLessonId && star > 1) {
        user.lastCompletedLessonId = idParam;
        db.collection("users").findOneAndUpdate({email: req.params.email}, { $set: { lastCompletedLessonId: idParam } })
      }
      stat.lastCompletedLessonId = user.lastCompletedLessonId;
      db.collection("statistics").insertOne({ user: user._id, stat }).then(() => { }, () => {
        res.status(401).send("Bad request");
        db.close();
        return;
      });
      if (!user.lessonStatistics) {
        user.lessonStatistics = [];
      }
      if (!user.lessonStatistics[idParam] || user.lessonStatistics[idParam]._star < star) {
        user.lessonStatistics[idParam] = stat;
        db.collection("users").updateOne({ email: req.params.email }, user).then(() => { 
          res.status(200).send(stat);
          db.close();
        });
      } else {
        res.status(200).send(user.lessonStatistics[idParam]);
        db.close();
      }
    });
  });
})