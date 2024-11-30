import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express()

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Health Check"
    })
})

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const data = await prisma.todo.findMany()

        res.json({
            todos: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
});

// add todo
app.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    console.log("req:", req.body)
    try {
        const data = await prisma.todo.create({
            data: {
                title,
                description
            }
        })
        res.json({
            todos: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
});

// update todo
app.put("/todos/:id", async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    console.log("req:", req.params)
    console.log("req:", req.body)
    try {
        const data = await prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description
            }
        })
        res.json({
            todos: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}); 

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    console.log("req:", req.params)
    try {
        const data = await prisma.todo.delete({
            where: {
                id: Number(id)
            }
        })
        res.json({
            todos: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}); 

app.listen(3000);