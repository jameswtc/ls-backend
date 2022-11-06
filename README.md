# Backend

This is the backend API service:
- Load, parse and prepare the data from the remote upstream sources
- Provide a simple REST API for the frontend web application

The server runs on PORT 3000.

To start the application, first install all the dependencies:

```bash
npm install
# or
yarn install
```

Then, simply start the application:

```bash
npm start
# or
yarn start

```

## Frameworks

The backend service uses [Express Server](https://expressjs.com/). It performs a simple task
by loading 2 places from the upstream data source and returns the simplified data for the client application.

It fetches the data concurrently using Promise. If the calls failed, it simply returns null data and 
excludes it from the result. This is in the consideration that:
- Client should always see some data or result.
- A single API failure should not jeopardise the whole user experience

A dummy placeId has been included in the list to simulate this error.

### Dependencies
- The backend service has [CORS](http://expressjs.com/en/resources/middleware/cors.html) middleware enabled, 
in order for the web application to run on different domains (locally on 127.0.0.1 or localhost) and ports.

## References
- Express "Getting Started" guide
- CORS documentation

Estimated time taken: ~45min, completely from scratch following the documentation guide, reading the upstream 
data sources.
