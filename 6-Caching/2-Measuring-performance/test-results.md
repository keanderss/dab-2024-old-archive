# Performance test results

Brief description of the used server (choose one): HTTP/1.1

Brief description of your computer:
CPU: i5-6600K @3.50 GHz x 4 (Base clock: 100 MHz, Clock multiplier 8 - 44)
RAM: 16 GB DDR4 @2133 MHz
GPU: GTX 1060 6GB

## No Redis Cache

### Retrieving todos

http_reqs: 7128
http_req_duration - median: 9.51ms
http_req_duration - 99th percentile: 68.53ms

## Redis Cache

### Retrieving todos

http_reqs: 9095
http_req_duration - median: 8.68ms
http_req_duration - 99th percentile: 42.58ms

## Reflection

Brief reflection on the results of the tests -- why do you think you saw the results you saw:
Through the tests we can observe a performance increase when using a redis cache.
This is because caching helps reduce the amount of processing we need to do for each request. If there was physical distance between the database servers this would also reduce latency. Overall caching increases performance.