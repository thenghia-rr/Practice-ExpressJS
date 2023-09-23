module.exports = function SortMiddleware(req, res, next) {

    res.locals._sort = {
        enable: false,
        type: 'default',
    }

    if(req.query.hasOwnProperty('_sort')) {
        // Basic
        // res.locals._sort.enable = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;

        // Advanced
        Object.assign(res.locals._sort, {
            enable: true,
            type: req.query.type,
            column: req.query.column,
        })
    }

    next();

}

