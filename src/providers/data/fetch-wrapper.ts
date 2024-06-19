import { GraphQLFormattedError } from "graphql";

type Error = {
    message: string;
    statusCode: string | number;
}

const fetchBody = async (url: string, options: RequestInit) => { //RequestInit is an interface that is used for the body of the fetch request
  const accessToken = localStorage.getItem("access_token"); // Get cookies sorta

  const headers = options.headers as Record<string, string>; // headers will be labelled as key/value pairs

  return await fetch(url, {
    ...options, // spread operator is used to include all properties from 'options' provied as argument
    headers: {
      ...headers,
      Authorization: headers?.Authorization || "Bearer " + accessToken, // headers will either include the authorization header or it will include the access token
      "Content-Type": "application/json", // content type is set to json
      "Apollo-Require-Preflight": "true", // Required for Apollo Server
    },
  });
};

const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined> // The errors will be stored in the body of the response with "errors" and will be a array of errors
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body?.errors;
    
    const messages = errors?.map((error) => error?.message)?.join(""); // The error messages will be joined together
    const code = String(errors?.[0]?.extensions?.code); // The error code will be stored in the extensions of the error by accessing the first error in the array

    return {
        message: messages || JSON.stringify(errors), // If there are no messages, the errors will be stringified
        statusCode: code || 500 // Displays code or gives 500
    }
  }
  
  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await fetchBody(url, options);

    const responseClone = response.clone(); // clone the response in order to work on it because the response can only be read once
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if (error) {
        throw error;
    }

    return response;
}

