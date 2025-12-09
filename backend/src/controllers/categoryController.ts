import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/inMemoryDb';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = db.getAllCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = db.getCategoryById(id);

    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto: CreateCategoryDto = req.body;

    const newCategory: Category = {
      id: uuidv4(),
      name: dto.name,
      color: dto.color,
      createdAt: new Date(),
    };

    const category = db.createCategory(newCategory);

    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const dto: UpdateCategoryDto = req.body;

    const category = db.updateCategory(id, dto);

    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    res.json({
      success: true,
      data: category,
      message: 'Category updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!db.getCategoryById(id)) {
      throw new AppError(404, 'Category not found');
    }

    const deleted = db.deleteCategory(id);

    if (!deleted) {
      throw new AppError(
        400,
        'Cannot delete category with existing todos. Please delete or reassign todos first.'
      );
    }

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

