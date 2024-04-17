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
  department: z.string().min(3),
  emp_code: z.string().min(5),
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
