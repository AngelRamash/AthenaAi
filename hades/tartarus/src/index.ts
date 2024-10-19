import { onRequest, onCall } from "firebase-functions/v2/https";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

// Example Cloud Function using onRequest and logger
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});


// Example Cloud Function using onCall
export const callableFunction = onCall((request) => {
    logger.info("Callable function invoked");
    return { message: "Hello from a callable function!" };
});
  
// Example Firestore trigger using onDocumentWritten
export const documentWrittenTrigger = onDocumentWritten(
    "/some-collection/{docId}",
    (event) => {
        logger.info("Document written:", event);
    }
);
  
