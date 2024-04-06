const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export function isValidUsername(username) {
    return usernameRegex.test(username);
}


