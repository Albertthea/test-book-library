const bodyParser = require('body-parser');
import 'reflect-metadata';
const { createConnection } = require('typeorm');
const { BookEntity } = require('./src/entities/book.entity.ts');
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3306;

app.use(bodyParser.json());

createConnection().then(() => {
  console.log('Connected to MySQL database');

  // CORS
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // Обработка запросов к книгам
  app.get('/books', async (req: Request, res: Response) => {
    const books = await BookEntity.find();
    res.json(books);
  });

  app.post('/books', async (req: Request, res: Response) => {
    const newBook = req.body;
    const book = await BookEntity.create(newBook).save();
    res.json(book);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
