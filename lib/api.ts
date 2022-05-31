import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const taskDirectory = join(process.cwd(), "_contents/tasks");

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
