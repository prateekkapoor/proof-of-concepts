import * as admin from 'firebase-admin';
import { fileParser } from 'express-multipart-file-parser';

const BUCKET_NAME = "seismic.appspot.com";
const isNotValidFile = (contentType) => {
    if (contentType.indexOf("text/csv") === -1) {
        console.error("No file type supported other than text/csv")
        return true
    }
    return false
}
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
        console.log('fileData...' + JSON.stringify(file))
        const uploadedFile = `${file.originalname}`;
        let mimeType = file.mimetype
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
}

export const uploadFile = (req, res) => {
    const path = req.params.path;
    const file = req.files[0];
    if (file) {
        uploadImageToStorage(file, path).then((fileURL) => {
            res.json({
                fileURL: fileURL
            });
        }).catch((error) => {
            console.error('failed to upload file', error);
            res.send('500', `Failed to upload file: ${file.originalname}`)
        });
    } else {
        console.error('Failed to upload file.', file);
        res.send('500', `Failed to upload file: ${file}`)
    }
};
export const getUpload = () => {
    return fileParser({
        rawBodyOptions: {
            limit: '15mb',
        },
        busboyOptions: {
            limits: {
                fields: 2
            }
        },
    })
}