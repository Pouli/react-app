'use strict';

module.exports = (err, req, res, next) => {
    res.status(err.status).send({ error: err });
};