import * as admin from 'firebase-admin';
import * as _ from 'lodash';
const ls = require('local-storage');

import * as errorHandler from "../error/errorHandler";

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const validateFirebaseIdToken = async (req, res, next) => {

    console.log('Check if request is authorized with Firebase ID token');
    let idToken = req.query.authToken;
    console.log('authToken: ' + idToken);
    if (_.includes(req.originalUrl, '/docs')) {
        return next();
    }

    if (!idToken) {
        if ((!req.headers.authorization) &&
            !(req.cookies && req.cookies.__session)) {
            console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>',
                'or by passing a "__session" cookie.');
            res.status(403).json(errorHandler.createUnautorizedError('Failed to authorize user'));
            return;
        }

        if (req.headers.authorization) {
            console.log('Found "Authorization" header');
            // Read the ID Token from the Authorization header.
            idToken = req.headers.authorization;
        } else if (req.cookies) {
            console.log('Found "__session" cookie');
            // Read the ID Token from cookie.
            idToken = req.cookies.__session;
        } else {
            // No cookie
            res.status(403).json(errorHandler.createUnautorizedError('Failed to authorize user'));
            return;
        }
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).json(errorHandler.createUnautorizedError('Failed to authorize user'));
        return;
    }
};
