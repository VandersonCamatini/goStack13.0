import express from 'express';
import { helloWorld } from './routes'

const app = express();

app.listen('/', helloWorld);

app.listen(3333);