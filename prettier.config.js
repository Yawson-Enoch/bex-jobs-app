// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  singleQuote: true,
  semi: true,

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^~/env(.*)$',
    '^~/types/(.*)$',
    '^~/config/(.*)$',
    '^~/schemas/(.*)$',
    '^~/lib/(.*)$',
    '^~/store/(.*)$',
    '^~/atoms/(.*)$',
    '^~/context/(.*)$',
    '^~/hooks/(.*)$',
    '^~/components/ui/(.*)$',
    '^~/components/(.*)$',
    '^~/styles/(.*)$',
    '^~/app/(.*)$',
    '^~/public/(.*)$',
    '',
    '^[.]',
  ],
};
