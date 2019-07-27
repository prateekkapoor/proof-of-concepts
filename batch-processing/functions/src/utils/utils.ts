export const getCurrentDateTime = () => {
    return new Date().getTime();
};

export const isAfterTimeout = (updateDateTime, sessionTimeOut) => {
    const now = getCurrentDateTime();
    return now > updateDateTime + sessionTimeOut;
};