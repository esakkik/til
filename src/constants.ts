export type Metadata = {
    TITLE: string;
    DESCRIPTION: string;
  };
  
export const BLOG: Metadata = {
    TITLE: "Blog",
    DESCRIPTION: "A collection of articles on topics I am passionate about.",
  };

  export const SITE: Site = {
    NAME: "Astro Nano",
    EMAIL: "markhorn.dev@gmail.com",
    NUM_POSTS_ON_HOMEPAGE: 3,
    NUM_WORKS_ON_HOMEPAGE: 2,
    NUM_PROJECTS_ON_HOMEPAGE: 3,
  };

  export type Site = {
    NAME: string;
    EMAIL: string;
    NUM_POSTS_ON_HOMEPAGE: number;
    NUM_WORKS_ON_HOMEPAGE: number;
    NUM_PROJECTS_ON_HOMEPAGE: number;
  };