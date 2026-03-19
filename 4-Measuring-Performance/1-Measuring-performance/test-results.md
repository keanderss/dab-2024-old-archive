# Performance test results

Brief description of the used server (choose one): HTTP/1.1

Brief description of your computer:
CPU: i5-6600K @3.50 GHz x 4 (Base clock: 100 MHz, Clock multiplier 8 - 44)
RAM: 16 GB DDR4 @2133 MHz
GPU: GTX 1060 6GB

## No database

### Retrieving todos

http_reqs: 409
http_req_duration - median: 219.02ms
http_req_duration - 99th percentile: 442.61ms


### Posting todos

http_reqs: 249348
http_req_duration - median: 0s
http_req_duration - 99th percentile: 2ms


## With database

### Retrieving todos

http_reqs: 131
http_req_duration - median: 772.74ms
http_req_duration - 99th percentile: 821.64ms


### Posting todos

http_reqs: 51236
http_req_duration - median: 1.37ms
http_req_duration - 99th percentile: 6.99ms


## Reflection

Brief reflection on the results of the tests -- why do you think you saw the results you saw:
When we connect a database application to our application, it slightly increases the 
overall time to process each request. This is because our application has to send 
queries to the database application which then has to process each request, and send 
a response to our application for each request. All of this add more processing time 
to our application. One key takeaway is that picking a reliable, fast, efficient and 
scalable database solution is important for ensuring our application performs well. 
Even though the no database ended up performing better in this test, it doesn't mean 
the solution is better. This is because the solution lacks persistent storage, and 
isn't scalable. Since everything is stored within RAM this means that we lose 
everything stored in the applications memory when the application is restarted.