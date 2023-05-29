const {
    addBook,
    getAllBook,
    getBookID,
    putBook,
    deleteBook
} = require('./handler').default;

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookID,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: putBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook
    },
];

module.exports = routes;