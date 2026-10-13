import { Request, Response } from 'express';
import { CURATED_DESTINATIONS } from '../data/destinations.js';

export const getAllDestinations = (req: Request, res: Response): void => {
  try {
    let result = [...CURATED_DESTINATIONS];
    const { category, state, search, maxBudget, sort } = req.query;

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.popularAttractions.some((a: any) => a.name.toLowerCase().includes(q))
      );
    }

    if (category && typeof category === 'string' && category !== 'All') {
      result = result.filter(d => d.categories.includes(category));
    }

    if (state && typeof state === 'string' && state !== 'All') {
      result = result.filter(d => d.state === state);
    }

    if (maxBudget && !isNaN(Number(maxBudget))) {
      result = result.filter(d => d.estimatedBudgetRange.min <= Number(maxBudget));
    }

    if (sort === 'budget_asc') {
      result.sort((a, b) => a.estimatedBudgetRange.min - b.estimatedBudgetRange.min);
    } else if (sort === 'budget_desc') {
      result.sort((a, b) => b.estimatedBudgetRange.min - a.estimatedBudgetRange.min);
    } else if (sort === 'duration_asc') {
      result.sort((a, b) => a.recommendedDurationDays - b.recommendedDurationDays);
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal server error while fetching destinations' });
  }
};

export const getDestinationById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const destination = CURATED_DESTINATIONS.find(d => d.id === id);

    if (!destination) {
      res.status(404).json({ success: false, error: `Destination '${id}' not found` });
      return;
    }

    res.json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
