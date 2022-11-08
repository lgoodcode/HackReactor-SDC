import http from 'k6/http'
import { sleep } from 'k6'

// Need to specify Dockers host IP address for local testing and not localhost
const ENDPOINT = 'http://host.docker.internal:4000/api'
const MAX_ID = 40000
const MAX_PAGES = 200
const MAX_COUNT = 50
const MAX_SLEEP = 3
const MAX_ITERATIONS = 100
const getRandom = (max) => Math.floor(Math.random() * max)
const randomId = () => getRandom(MAX_ID)
const randomPage = () => getRandom(MAX_PAGES)
const randomCount = () => getRandom(MAX_COUNT)
const randomSleep = () => getRandom(MAX_SLEEP)

/** @type {import('k6/options').Options} */
export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 1000 },
  ],
  thresholds: {
    // http errors should be less than 1% and abort if exceeded
    http_req_failed: ['rate<0.01'],
    // 90% of requests should be below 200ms, 95% below 400ms, and 99.9% below 2s
    http_req_duration: ['p(90) < 200', 'p(95) < 400', 'p(99)<2000'],
  },
}

export default function () {
  http.get(`${ENDPOINT}/products/${randomId()}`, {
    tags: { name: 'ProductDetails' },
  })

  sleep(randomSleep())
}
