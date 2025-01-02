import express, { Request, Response } from "express";
import cors from "cors";
import { z } from "zod";
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

// Zod schemas for validation
const todoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required")
});

const updateTodoSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional()
});

const idTodoSchema = z.object({
    id: z.string().uuid()
});

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
    try {
        const parseResult = todoSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error });
        }
        const { title, description } = req.body;
        const data = await prisma.todo.create({
            data: {
                title,
                description
            }
        });
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
        // if (error instanceof z.ZodError) {
        //     res.status(400).json({ errors: error.errors });
        // } else {
        //     res.status(500).json({ message: "Something went wrong!" });
        // }
    }
});

// update todo
app.put("/todos/:id", async (req, res) => {
    try {
        const parseResult = updateTodoSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error });
        }
        const parseIdResult = idTodoSchema.safeParse(req.params);
        if (!parseIdResult.success) {
            return res.status(400).json({ errors: parseIdResult.error });
        }
        const { title, description } = req.body;
        const { id } = req.params;
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
        res.status(500).json({ message: "Something went wrong!" });
    }
});

// update todo complete
app.patch("/todos/:id", async (req, res) => {
    try {
        const parseIdResult = idTodoSchema.safeParse(req.params);
        if (!parseIdResult.success) {
            return res.status(400).json({ errors: parseIdResult.error });
        }
        const { id } = req.params;
        const data = await prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                isComplete: true
            }
        })
        res.json({
            todos: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const parseIdResult = idTodoSchema.safeParse(req.params);
        if (!parseIdResult.success) {
            return res.status(400).json({ errors: parseIdResult.error });
        }
        const { id } = req.params;
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
        res.status(500).json({ message: "Something went wrong!" });
    }
});

app.listen(3000);