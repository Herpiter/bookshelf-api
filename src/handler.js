const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (req,res) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage
    } = req.payload;

    if(name === undefined){
        const response = res.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }

    if(readPage > pageCount){
        const response = res.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);

        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };

    push(newBook);

    const addProcess = filter((book) => book.id === id).length > 0;

    if (addProcess) {
        const response = res.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookID : id,

            },
        });
        response.code(201);

        return response;
    }

    const response = res.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);

    return response;
};

const getAllBook = (req,res) => {
    const {name, reading, finished} = req.query;

    let filteredBooks = books;

    if (name !==undefined){
        filteredBooks = filteredBooks.filter((book) => book.name.toLowercase().includes(name.toLowercase()));
    }

    if (reading !== undefined){
        filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
    }

    if (finished !== undefined){
        filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
    }

    const response = res.response({
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher : book.publisher,
            })),
        },
    });
    response.code(200);

    return response;
};

const getBookID = (req,res) => {
    const id = req.params;
    const book = filter((b) => b.id === id)[0];

    if (book !==undefined) {
        const response = res.response({
            status:'success',
            data: {
                book 
            }
        });
        return response;
    }

    const response = res.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404);
    return response;
}

const putBook = (req,res) => {
    const id = req.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading
    } = req.payload;

    const updatedAt = new Date().toISOString();
    const index = findIndex((book) => book.id ===id);

    if (index !== -1){
        if(name === undefined) {
            const response = res.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku'

            });
            response.code(400);
            return response;
        }
    

        if (pageCount < readPage){
            const response = res.response({
                status:'fail',
                message: 'Gagal membarui buku. readPage tidak boleh lebih besar dari pageCount'
            });
            response.code(400);
            return response;
        }

        const finished = (pageCount===readPage);

        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
  
        return response;
    }

    const response = res.response({
        status:'fail',
        message:'Gagal memperbarui buku. ID tidak ditemukan'
    });
    response.code(404);
    return response;

};

const deleteBook = (req,res) => {
    const id = req.params;

    const index = findIndex((note) => note.id ===id);

    if (index !==-1) {
        splice(index,1);
        const response = res.response({
            status: 'success',
            message:'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = res.response ({
        status: 'fail',
        message: 'Buku gagal dihapus. ID tidak ditemukan'
    });
    response.code(404);
    return response;
}

module.exports = {
    addBook,
    getAllBook,
    getBookID,
    putBook,
    deleteBook
};