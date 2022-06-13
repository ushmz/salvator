import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { sanitizeUrl } from "@braintree/sanitize-url";

type Items = {
  // content: string;
  [key: string]: string;
};

const taskDirectory = join(process.cwd(), "_contents/tasks");
const enqueteDirectory = join(process.cwd(), "_contents/enquetes");

export function getAllTaskPaths() {
  const paths = fs.readdirSync(taskDirectory);
  return paths.map((p) => {
    return {
      params: {
        slug: p.replace(/\.md$/, ""),
      },
    };
  });
}

export function getAllEnquetePaths() {
  const paths = fs.readdirSync(enqueteDirectory);
  return paths.map((p) => {
    return {
      params: {
        slug: p.replace(/\.md$/, ""),
      },
    };
  });
}

export function getTaskByID(taskID: number, fields: string[]) {
  const fullPath = join(taskDirectory, `${taskID}.md`);
  const contents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(contents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "id") {
      items[field] = taskID.toString();
    }

    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getEnqueteBySlug(slug: string, fields: string[]) {
  const fullPath = join(enqueteDirectory, `${slug}.md`);
  const contents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(contents);

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "url") {
      items[field] = sanitizeUrl(data.url);
    }

    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getTopPageContent(fields: string[]) {
  const fullPath = join(process.cwd(), "_contents/top/", "top.md");
  const contents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(contents);

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}
