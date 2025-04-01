const express = require("express");
const redis = require("redis");
const shortid = require("shortid");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const client = redis.createClient();
client.connect();

client.on("error", (err) => console.log("Redis Error", err));


app.post("/encurtar", async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL é obrigatória" });
    }

    const codigo = shortid.generate();
    await client.set(codigo, url);
    await client.incr(`stats:${codigo}`);

    res.json({ encurtado: `http://localhost:3000/${codigo}` });
});


app.get("/:codigo", async (req, res) => {
    const { codigo } = req.params;
    const url = await client.get(codigo);

    if (url) {
        await client.incr(`stats:${codigo}`);
        res.redirect(url);
    } else {
        res.status(404).json({ error: "URL não encontrada" });
    }
});


app.get("/stats/:codigo", async (req, res) => {
    const { codigo } = req.params;
    const acessos = await client.get(`stats:${codigo}`);
    const url = await client.get(codigo);

    if (url) {
        res.json({ url, acessos: acessos || 0 });
    } else {
        res.status(404).json({ error: "Código não encontrado" });
    }
});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
