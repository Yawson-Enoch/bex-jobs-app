// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  semi: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^~/env(.*)$',
    '^~/types/(.*)$',
    '^~/config/(.*)$',
    '^~/lib/(.*)$',
    '^~/store/(.*)$',
    '^~/context/(.*)$',
    '^~/hooks/(.*)$',
    '^~/components/ui/(.*)$',
    '^~/components/(.*)$',
    '^~/styles/(.*)$',
    '^~/app/(.*)$',
    '',
    '^[.]',
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};
