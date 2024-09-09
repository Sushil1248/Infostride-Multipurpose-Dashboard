import { z } from 'zod';

export const createValidationSchema = (formItems) => {
    const schemaFields = formItems.reduce((acc, item) => {
        let validator = z.string(); // Default to string

        // Apply validation rules based on the type and constraints
        if (item.type === 'text') {
            if (item.validation.min) {
                validator = validator.min(item.validation.min, item.validation.message || `Must be at least ${item.validation.min} characters`);
            }
            if (item.validation.email) {
                validator = validator.email(item.validation.message || 'Invalid email address');
            }
        } else if (item.type === 'single-image') {
            validator = z.string().optional(); // Handle uploaded image URL as string
        } else if (item.type === 'multi-image') {
            validator = z.array(z.string()).optional(); // Handle array of image URLs as string array
        } else if (item.type === 'checkbox') {
            validator = z.boolean();
            if (item.validation.required) {
                validator = validator.refine(value => value === true, item.validation.message || 'Must agree to terms');
            }
        } else if (item.type === 'date') {
            validator = z.string(); // Handle date as string if required
        } else if (item.type === 'number') {
            validator = z.string(); // Handle number as number if required
        } else if (item.type === 'textarea') {
            validator = z.string(); // Handle textarea as string
        }

        acc[item.name] = validator;
        return acc;
    }, {});

    return z.object(schemaFields);
};
