import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/quizzes', async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid payload. Title and questions array are required.' });
    }

    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : '',
            correctAnswer: q.correctAnswer || '',
          })),
        },
      },
      include: { questions: true },
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Failed to create quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/quizzes', async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const result = quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionsCount: quiz._count.questions,
      createdAt: quiz.createdAt,
    }));

    res.json(result);
  } catch (error) {
    console.error('Failed to retrieve quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      })),
    };

    res.json(formattedQuiz);
  } catch (error) {
    console.error('Failed to retrieve quiz details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.quiz.delete({
      where: { id },
    });

    res.json({ message: 'Quiz successfully deleted' });
  } catch (error) {
    console.error('Failed to delete quiz:', error);
    res.status(404).json({ error: 'Quiz not found or already deleted' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});