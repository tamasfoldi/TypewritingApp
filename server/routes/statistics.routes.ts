import * as express from "express";
import { MongoClient, ObjectID  } from "mongodb";
import { dbConn } from "../config";

export let statisticsRouter = express.Router();

statisticsRouter.get("/:id", (req, res) => {
  MongoClient.connect(dbConn, (err, db) => {
    if (err) {
      res.status(501).send("Internal Server Error")
      db.close();
      return;
    }
    db.collection("statistics")
      .aggregate(
      [
        {
          $match: {
            user: new ObjectID(req.params.id)
          }
        },
        {
          $group: {
            _id: "$user",
            numberOfCorrectKeypresses: {
              $sum: "$stat._numberOfCorrectKeypresses"
            },
            numberOfIncorrectKeypresses: {
              $sum: "$stat._numberOfIncorrectKeypresses"
            }
          }
        }
      ], (err, result) => {
        if (err) {
          res.status(401).send("Bad request");
          db.close();
          return;
        }
        res.status(200).send(result[0]);
        db.close();
        return;
      });
  });
});
