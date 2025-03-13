import csurf from "csurf";

const csrfProtection = csurf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 36000,
        sameSite: 'strict'
    }
});

export default csrfProtection;