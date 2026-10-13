import { Request, Response } from 'express';
import { CURATED_ALERTS } from '../data/alerts.js';

export const getAllAlerts = (req: Request, res: Response): void => {
  try {
    let result = [...CURATED_ALERTS];
    const { category, severity, destinationId } = req.query;

    if (category && typeof category === 'string' && category !== 'all') {
      result = result.filter(a => a.category === category);
    }

    if (severity && typeof severity === 'string' && severity !== 'all') {
      result = result.filter(a => a.severity === severity);
    }

    if (destinationId && typeof destinationId === 'string') {
      result = result.filter(a => a.destinationId === destinationId);
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal error while fetching alerts' });
  }
};
