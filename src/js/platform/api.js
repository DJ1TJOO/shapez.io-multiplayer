/* typehints:start */
import { Application } from "../application";
/* typehints:end */
import { createLogger } from "../core/logging";

const logger = createLogger("puzzle-api");

export class ClientAPI {
    /**
     *
     * @param {Application} app
     */
    constructor(app) {
        this.app = app;

        /**
         * The current users session token
         * @type {string|null}
         */
        this.token = null;
    }

    getEndpoint() {
        if (G_IS_DEV) {
            return "http://localhost:15001";
        }
        if (window.location.host === "beta.shapez.io") {
            return "https://api-staging.shapez.io";
        }
        return "https://api.shapez.io";
    }

    isLoggedIn() {
        return Boolean(this.token);
    }

    /**
     *
     * @param {string} endpoint
     * @param {object} options
     * @param {"GET"|"POST"=} options.method
     * @param {any=} options.body
     */
    _request(endpoint, options) {
        const headers = {
            "x-api-key": "d5c54aaa491f200709afff082c153ef1",
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers["x-token"] = this.token;
        }

        return Promise.race([
            fetch(this.getEndpoint() + endpoint, {
                cache: "no-cache",
                mode: "cors",
                headers,
                method: options.method || "GET",
                body: options.body ? JSON.stringify(options.body) : undefined,
            })
                .then(res => {
                    if (res.status !== 200) {
                        throw "bad-status: " + res.status + " / " + res.statusText;
                    }
                    return res;
                })
                .then(res => res.json()),
            new Promise(resolve => setTimeout(resolve, 5000)),
        ])
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                return data;
            })
            .catch(err => {
                logger.warn("Failure:", endpoint, ":", err);
                throw err;
            });
    }

    tryLogin() {
        return this.apiTryLogin()
            .then(({ token }) => {
                this.token = token;
                return true;
            })
            .catch(err => {
                logger.warn("Failed to login:", err);
                return false;
            });
    }

    /**
     * @returns {Promise<{token: string}>}
     */
    apiTryLogin() {
        return this._request("/v1/public/login", {
            method: "POST",
            body: {
                hello: "world",
            },
        });
    }

    /**
     * @param {"new"|"top-rated"|"mine"} category
     * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>}
     */
    apiListPuzzles(category) {
        if (!this.isLoggedIn()) {
            return Promise.reject("not-logged-in");
        }
        return this._request("/v1/puzzles/list/" + category, {});
    }

    /**
     * @param {number} puzzleId
     * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleFullData>}
     */
    apiDownloadPuzzle(puzzleId) {
        if (!this.isLoggedIn()) {
            return Promise.reject("not-logged-in");
        }
        return this._request("/v1/puzzles/download/" + puzzleId, {});
    }

    /**
     * @param {number} puzzleId
     * @param {object} payload
     * @param {number} payload.time
     * @param {number} payload.difficulty
     * @param {boolean} payload.liked
     * @returns {Promise<{ success: true }>}
     */
    apiCompletePuzzle(puzzleId, payload) {
        if (!this.isLoggedIn()) {
            return Promise.reject("not-logged-in");
        }
        return this._request("/v1/puzzles/complete/" + puzzleId, {
            method: "POST",
            body: payload,
        });
    }

    /**
     * @param {object} payload
     * @param {string} payload.title
     * @param {string} payload.shortKey
     * @param {import("../savegame/savegame_typedefs").PuzzleGameData} payload.data
     * @returns {Promise<{ success: true }>}
     */
    apiSubmitPuzzle(payload) {
        if (!this.isLoggedIn()) {
            return Promise.reject("not-logged-in");
        }
        return this._request("/v1/puzzles/submit", {
            method: "POST",
            body: payload,
        });
    }
}
