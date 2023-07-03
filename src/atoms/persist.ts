import { atomWithStorage } from 'jotai/utils';

export const persistLoginAtom = atomWithStorage('persist', true);
