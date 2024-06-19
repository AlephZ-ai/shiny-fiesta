import { AuthBindings } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";

// For demo purposes and to make it easier to test the app, you can use the following credentials
export const authCredentials = {
  email: "michael.scott@dundermifflin.com",
  password: "demodemo",
};

export const authProvider: AuthBindings = {
  login: async ({ email }) => {
    console.log("Attempting login with email:", email);
    try {
        const { data } = await dataProvider.custom({
            url: API_URL,
            method: "post",
            headers: {},
            meta: {
                variables: { email },
                rawQuery: `
                    mutation Login($email: String!) {
                        login(loginInput: { email: $email }) {
                            accessToken
                        }
                    }
                `,
            },
        });

        console.log("Login response data:", data);

        if (data.login && data.login.accessToken) {
            localStorage.setItem("access_token", data.login.accessToken);
            return {
                success: true,
                redirectTo: "/",
            };
        } else {
            throw new Error("No access token returned");
        }
    } catch (e) {
        console.error("Login error:", e);
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Login failed",
                name: "name" in error ? error.name : "Invalid email or password",
            },
        };
    }
  },

  logout: async () => {
    console.log("Logging out");
    localStorage.removeItem("access_token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    console.error("Auth error:", error);
    if (error.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
        ...error,
      };
    }
    return { error };
  },

  check: async () => {
    console.log("Checking authentication");
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.log("No access token found");
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
        const { data } = await dataProvider.custom({
            url: API_URL,
            method: "post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            meta: {
                rawQuery: `
                    query Me {
                        me {
                            name
                        }
                    }
                `,
            },
        });

        console.log("Auth check response data:", data);

        return {
            authenticated: true,
            redirectTo: "/",
        };
    } catch (error) {
        console.error("Error during auth check:", error);
        localStorage.removeItem("access_token");
        return {
            authenticated: false,
            redirectTo: "/login",
        };
    }
  },

  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
        return undefined;
    }

    try {
        const { data } = await dataProvider.custom({
            url: API_URL,
            method: "post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            meta: {
                rawQuery: `
                    query Me {
                        me {
                            id
                            name
                            email
                            phone
                            jobTitle
                            timezone
                            avatarUrl
                        }
                    }
                `,
            },
        });

        console.log("Get identity response data:", data);

        return data.me;
    } catch (error) {
        console.error("Error during getIdentity:", error);
        return undefined;
    }
  },
};
