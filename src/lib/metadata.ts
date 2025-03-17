import conf from "~/site.config";
// todo: add blog detection

export const titleConstructor = (title: string) => {
  if (!title) return conf.siteName;
  return `${title} | ${conf.siteName}`;
};

export const descriptionConstructor = (description: string) => {
  if (!description) return conf.description;
  return `${description}`;
};

export const noteTitleConstructor = (title: string, date: Date) => {
  if (title) return title;
  return `A note from ${date.toLocaleDateString()}`;
};