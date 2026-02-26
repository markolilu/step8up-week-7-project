const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const app = express();

const PORT = 3001;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// write CRUDS below