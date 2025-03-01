export const JOB_STATUS = ['pending', 'interview', 'declined'] as const;
export const JOB_TYPE = [
  'full-time',
  'part-time',
  'remote',
  'internship',
] as const;

export const VIEW_OPTIONS = ['list', 'grid'] as const;
export const STATUS_OPTIONS = ['all', ...JOB_STATUS] as const;
export const TYPE_OPTIONS = ['all', ...JOB_TYPE] as const;
export const SORT_OPTIONS = ['latest', 'oldest', 'a-z', 'z-a'] as const;
