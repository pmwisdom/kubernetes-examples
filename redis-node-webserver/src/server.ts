import express from "express";
import redis from "redis";
import bodyParser from "body-parser";

const app = express();
const port = 7000;

app.use(bodyParser.json());

/**
 * Create our redis client
 * This connects to the redis-master service we set up through 
 * the kubernetes Service Discovery
 * 
 * host: redis-master refers to the kubernetes name in redis-master-service.yaml
 */
const redisClient = redis.createClient({
  host: "redis-master",
  port: 6379,
});

["error", "ready", "connect", "reconnecting", "warning", "end"].map((type) => {
  redisClient.on(type, (data: unknown) => {
    console.log(`Redis event fired (${type}) ${data || ""}`);
  });
});

/**
 * Just sets a value given a post message with key / values into the redis store
 */
app.post("/set-value", (req, res) => {
  const data = req.body;
  const keys = Object.keys(req.body);

  redisClient.set(keys[0], data[keys[0]], (err, data) => {
    if (err) {
      return res.send(err.message);
    }

    res.send(200);
  });
});

/**
 * Gets a value given a key from the redis store
 */
app.get("/get-value/:key", (req, res) => {
  const key = req.params["key"];

  redisClient.get(key, (err, data) => {
    if (err || !data) {
      return res.send(404);
    }

    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
