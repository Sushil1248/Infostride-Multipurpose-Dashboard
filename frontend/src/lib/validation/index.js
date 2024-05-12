import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  form_type: z.string(),
  verification_code: z.string().optional(),
  password: z.string().min(8),
}).superRefine(({ form_type, verification_code }, ctx) => {
  if (form_type !== 'login_form') {
    if (verification_code.length < 6) {
      ctx.addIssue({
        code: "custom",
        path: ["verification_code"],
        message: "Please enter the verification_code"
      });
    }
  };
});

export const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3).max(20),
  username: z.string().min(3).max(20),
  password: z.string().min(8).regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
    "Password must contain at least 1 uppercase letter, 1 special character, and 1 number"
  ),
  confirm_password: z.string().min(8),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      path: ["confirm_password"],
      message: "The passwords did not match"
    });
  };
});


export const createOrEditUserSchema = z.object({
  id:z.optional(z.string()),
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
    "Password must contain at least 1 uppercase letter, 1 special character, and 1 number"
  ),
  confirm_password: z.string().min(8),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      path: ["confirm_password"],
      message: "The passwords did not match"
    });
  };
});

export const createOrEditWebsiteSchema = z.object({
  id: z.string().optional(),
  icon: z.string().optional(),
  business_name: z.string(),
  url: z.string().regex(/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/).or(z.string().optional()),
  description: z.string().optional(),
  menus: z.optional(z.array(z.object({
      id: z.string(),
      imgURL: z.string(),
      route: z.string(),
      label: z.string(),
      category: z.optional(z.string()),
      type: z.string(),
  }))),
  created_by: z.string().optional(),
});