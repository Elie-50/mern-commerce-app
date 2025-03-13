import xss from "xss";

export const sanitizeInput = (input) => {
    return xss(input);
};

