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
app.post

app.get('/data', (req, res) => {
    const data = readData();
    res.json(data);
});

app.get('/data/:id', (req, res) => {
    const data = readData();
    const item = data.find(d => d.id === req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.put('/data/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(d => d.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
        return;
    } 
    data[index] = { ...data[index], ...req.body };
        writeData(data);
        res.json(data[index]);
});

app.delete('/data/:id', (req, res) => {
    const data = readData();
    const filteredData = data.filter(d => d.id !== req.params.id);
    writeData(filteredData);
    res.json({ message: 'Item deleted successfully' });
});