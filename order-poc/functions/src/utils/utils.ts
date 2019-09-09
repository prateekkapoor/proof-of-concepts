import * as format from "string-format";

export const stringFormat = (path, pathParams) => {
    format.extend(String.prototype, {});
    return format(path, pathParams);
};

export const getCurrentTimeStamp = () => {
    return new Date().getTime();
};

export const isAfterTimeout = (updateDateTime, sessionTimeOut) => {
    const now = getCurrentTimeStamp();
    return now > updateDateTime + sessionTimeOut;
};
