import { z } from "zod";

// Registration schema
export const insertRegistrationSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gradeLevel: z.string().min(1, "Please select a grade level"),
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentPhone: z.string().min(10, "Parent phone must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  examType: z.string().min(1, "Please select an exam type"),
});

// Contact form schema
export const insertContactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  gradeLevel: z.string().min(1, "Please select a grade level"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type RegistrationData = z.infer<typeof insertRegistrationSchema>;
export type ContactData = z.infer<typeof insertContactSchema>;
