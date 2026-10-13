import { z } from 'zod';

export const GenerateTripSchema = z.object({
  startingLocation: z.string().min(2, 'Starting location must be at least 2 characters'),
  destinationId: z.string().min(1, 'Destination ID is required'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  durationDays: z.number().int().min(1).max(14, 'Duration must be between 1 and 14 days'),
  travelersCount: z.number().int().min(1).max(20, 'Travelers must be between 1 and 20'),
  budget: z.number().positive('Budget must be greater than 0'),
  interests: z.array(z.string()).default([]),
  pace: z.enum(['relaxed', 'moderate', 'fast']).default('moderate'),
  transportPref: z.enum(['flight', 'train', 'car', 'bus']).default('car'),
  accommodationPref: z.enum(['hostel', 'budget', 'mid_range', 'luxury']).default('mid_range'),
  notes: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(2000, 'Message cannot exceed 2000 characters'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
  tripContext: z.object({
    destination: z.string().optional(),
    duration: z.number().optional(),
    budget: z.number().optional(),
    travelers: z.number().optional(),
    pace: z.string().optional(),
  }).optional(),
  weatherContext: z.object({
    condition: z.string().optional(),
    temperature: z.number().optional(),
    rainProbability: z.number().optional(),
    windSpeed: z.number().optional(),
    isLive: z.boolean().optional(),
  }).optional(),
  alertContext: z.array(z.object({
    title: z.string(),
    severity: z.string(),
    category: z.string(),
    details: z.string(),
    safetyGuidance: z.string(),
    sourceName: z.string(),
  })).optional(),
});

export const ExpenseSchema = z.object({
  title: z.string().min(1, 'Expense title is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('INR'),
  category: z.enum(['transport', 'accommodation', 'food', 'activities', 'local_transit', 'miscellaneous']),
  paidBy: z.string().min(1, 'Payer name is required'),
  splitBetween: z.array(z.string()).min(1, 'At least one person must split the expense'),
  date: z.string(),
  notes: z.string().optional(),
});
