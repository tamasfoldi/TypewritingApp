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
      if (!user.level) {
        user.level = 1;
      }
      if (!user.xp) {
        user.xp = 0;
      }
      db.collection("users").findOneAndUpdate({ email: req.params.email }, { $set: { xp: user.xp, level: user.level } })

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
    db.collection("users").find({ email: req.params.email }).limit(1).toArray((err, result) => {
      if (err) {
        res.status(404).send("User not found");
        db.close();
        return;
      } 
      user = result[0];

      db.collection("statistics").insertOne({ user: user._id, stat }).then(() => { }, () => {
        res.status(401).send("Bad request");
        db.close();
        return;
      });

      user = increaseUserXp(user, getLessonXp(user, idParam));

      if (!user.lessonStatistics) {
        user.lessonStatistics = [];
      }
      if(!user.lastCompletedLessonId) {
        user.lastCompletedLessonId = 0;
      }
      
      if (!user.lessonStatistics[idParam] || user.lessonStatistics[idParam]._star < star) {
        user.lessonStatistics[idParam] = stat;
      }
      
      if (idParam > user.lastCompletedLessonId && star > 1) {
        user.lastCompletedLessonId = idParam;
      }
      
      stat._star = user.lessonStatistics[idParam] ? Math.max(star, user.lessonStatistics[idParam]._star) : star;

      db.collection("users").updateOne({ email: req.params.email }, user).then(() => {
        stat.lastCompletedLessonId = user.lastCompletedLessonId;
        stat.xp = user.xp;
        stat.level = user.level;
        res.status(200).send(stat);
        db.close();
      });
    });
  });
});

function getLessonXp(user, lessonId): number {
  return 10;
}

function increaseUserXp(user, xp) {
  user.xp += xp;
  if (user.xp === 100) {
    user.xp = 0;
    user.level++;
  }
  return user;
}