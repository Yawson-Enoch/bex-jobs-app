import { atomWithStorage } from 'jotai/utils';

export const sessionTimeoutAtom = atomWithStorage<number | null>(
  'session',
  null,
);
