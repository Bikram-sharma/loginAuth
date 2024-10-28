import { NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";

export const custom_middleware = (...handlers) =>
    async (req, res) => {
        try {
            let response;

            for (const handler of handlers) {
                // Execute each handler sequentially, updating response with each handler's return value
                response = await handler(req, res);

                // If the handler returns a response, exit loop to finalize
                if (response) break;
            }

            // Return the final response (or next response from handlers)
            return response || NextResponse.next();

        } catch (error) {
            if (error instanceof ApiError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: error.statusCode }
                );
            } else {
                console.error("Server Error:", error); // Use a logger like Winston for production
                return NextResponse.json(
                    { message: "Internal server error" },
                    { status: 500 }
                );
            }
        }
    };
