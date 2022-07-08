// users
export const MILES = "459911470126202880";
export const TESTING = "994404004253675575";

// channels
export const GENERAL_CHANNEL = "946098686591639573";
export const BOT_TESTING = "994389333509415022";

// random
export const MINUTE = 60000;

export const COMMAND_NAMES = {
    THOUGHTS: 'thoughts',
    DEVELOPERS: 'developers'
} as const;

COMMAND_NAMES

export type COMMAND_NAME_VALUES = Values<typeof COMMAND_NAMES>

type Values<T> = T[keyof T];