import apiRoute from './apis';

export const init = (server) => {
    server.use('/api', apiRoute);
}
