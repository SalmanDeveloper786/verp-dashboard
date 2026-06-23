import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "VERP",
  version: packageJson.version,
  copyright: `© ${currentYear}, Verp.`,
  meta: {
    title: "Verp Dashboard",
    description: "Verp Dashboard",
  },
};
