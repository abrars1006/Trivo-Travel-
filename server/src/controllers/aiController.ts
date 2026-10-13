import { Request, Response } from 'express';
import { ChatRequestSchema } from '../validators/index.js';
import { generateAIResponse } from '../services/aiService.js';

export const handleAIChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = ChatRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Invalid chat request',
        details: parseResult.error.format(),
      });
      return;
    }

    const { message, conversationHistory, tripContext, weatherContext, alertContext } = parseResult.data;

    const result = await generateAIResponse(
      message,
      tripContext,
      conversationHistory,
      weatherContext,
      alertContext
    );

    res.json({
      success: true,
      reply: result.reply,
      isFallback: result.isFallback,
      sources: result.sources,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing the conversation',
    });
  }
};
