import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 1000,
  duration: "5m",
  thresholds: {
    errors: ["count<10"]
  }
};

export default function() {

  let res = http.get(`http://host.docker.internal:5000/events/3378706c-bbd5-4729-bd53-52e918564724/users/test`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
  }

  sleep(2);
}
