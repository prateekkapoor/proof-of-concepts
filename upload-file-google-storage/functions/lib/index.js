"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const express_multipart_file_parser_1 = require("express-multipart-file-parser");
const BUCKET_NAME = "seismic-box-219016.appspot.com";
const getUpload = () => {
    return express_multipart_file_parser_1.fileParser({
        rawBodyOptions: {
            limit: '15mb',
        },
        busboyOptions: {
            limits: {
                fields: 2
            }
        },
    });
};
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();
const db = admin.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);
main.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
main.use('/store/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
exports.uploadAPI = functions.https.onRequest(main);
const isNotValidFile = (contentType) => {
    if (contentType.indexOf("text/csv") === -1) {
        console.error("No file type supported other than text/csv");
        return true;
    }
    return false;
};
/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file, path) => {
    const storage = admin.storage();
    const promie = new Promise((resolve, reject) => {
        if (!file) {
            reject('No CSV file');
        }
        console.log('fileData...' + JSON.stringify(file));
        const uploadedFile = `${file.originalname}`;
        let mimeType = file.mimetype;
        mimeType = mimeType.includes('ms-excel') ? 'text/csv' : mimeType;
        if (isNotValidFile(mimeType)) {
            reject(`Invalid file Type ${mimeType} for file ${uploadedFile}`);
        }
        const storageFile = storage.bucket(BUCKET_NAME).file(`${path}/${uploadedFile}`);
        const blobStream = storageFile.createWriteStream({
            metadata: {
                contentType: mimeType
            }
        });
        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = `https://storage.googleapis.com/${BUCKET_NAME}/${storageFile.name}`;
            resolve(url);
        });
        blobStream.end(file.buffer);
    });
    return promie;
};
const uploadFile = (req, res) => {
    const path = req.params.path;
    const file = req.files[0];
    if (file) {
        uploadImageToStorage(file, path).then((fileURL) => {
            res.json({
                fileURL: fileURL
            });
        }).catch((error) => {
            console.error('failed to upload file', error);
            res.send('500', `Failed to upload file: ${file.originalname}`);
        });
    }
    else {
        console.error('Failed to upload file.', file);
        res.send('500', `Failed to upload file: ${file}`);
    }
};
main.use(getUpload());
// uploadFile
app.post('/upload/:path', uploadFile);
//# sourceMappingURL=index.js.map