
import { z } from "zod";

const envVariables = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	SERVICE_ROLE: z.string(),
	DATABASE_PASSWORD: z.string(),
	NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
	NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
	STRIPE_ENPOINT_SECRET: z.string(),
	WEBSITE_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
