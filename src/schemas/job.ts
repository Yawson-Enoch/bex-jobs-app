import { z } from 'zod';

import { JOB_STATUS, JOB_TYPE } from '~/lib/contants';

export const Job = z.object({
  jobPosition: z
    .string({
      required_error: 'Position is required',
      invalid_type_error: 'Position must be a string',
    })
    .min(2, { message: 'Position must be 2 or more characters long' })
    .max(200, {
      message: 'Position cannot be more than 200 characters long',
    }),
  company: z
    .string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name must be a string',
    })
    .min(2, { message: 'Company name must be 2 or more characters long' })
    .max(100, {
      message: 'Company name cannot be more than 100 characters long',
    }),
  jobLocation: z
    .string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    })
    .min(2, { message: 'Location name must be 2 or more characters long' })
    .max(100, {
      message: 'Location name cannot be more than 200 characters long',
    }),
  jobStatus: z.enum(JOB_STATUS).default('pending'),
  jobType: z.enum(JOB_TYPE).default('remote'),
});
export type Job = z.infer<typeof Job>;
export type JobStatus = z.infer<typeof Job.shape.jobStatus>;
export type JobType = z.infer<typeof Job.shape.jobType>;

/* jobs api response */
export const ApiMessage = z.object({
  msg: z.string(),
});

export const ApiJob = ApiMessage.extend({
  data: Job.extend({
    id: z.string(),
    createdBy: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});
export type ApiJob = z.infer<typeof ApiJob.shape.data>;

export const ApiJobs = ApiMessage.extend({
  data: z.array(ApiJob.shape.data),
  pagination: z.object({
    totalJobs: z.number(),
    totalPages: z.number(),
    perPage: z.number(),
    currentPage: z.number(),
    nextPage: z.number().nullable(),
    prevPage: z.number().nullable(),
  }),
});

export const ApiJobsStats = ApiMessage.extend({
  data: z.object({
    jobStatusStats: z.object({
      pending: z.number().catch(0),
      interview: z.number().catch(0),
      declined: z.number().catch(0),
    }),
    monthlyApplications: z.array(
      z.object({
        date: z.string(),
        count: z.number(),
      }),
    ),
  }),
});
