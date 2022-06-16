import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUser(externalID: string, code: string) {
  await prisma.user.create({
    data: {
      externalID: externalID,
      code: code,
    },
  });
}

type TaskParams = {
  slug: string;
  contentPath: string;
};

export async function importTasks(tasks: TaskParams[]) {
  const models = tasks.map((t) => {
    return prisma.task.create({
      data: {
        slug: t.slug,
        contentPath: t.contentPath,
      },
    });
  });
  await prisma.$transaction(models);
}

export async function importAllocations() {
  const taskIDs = await prisma.task.findMany();
  const models = taskIDs.map((t) => {
    return prisma.allocation.create({
      data: {
        taskID: t.id,
      },
    });
  });
  await prisma.$transaction(models);
}

export async function importConditions(conditions: string[]) {
  const models = conditions.map((c) => {
    return prisma.condition.create({
      data: {
        name: c,
      },
    });
  });
  await prisma.$transaction(models);
}

export async function getAllTaskPaths() {
  const allTasks = await prisma.task.findMany();
  return allTasks;
}

export async function getTaskPathBySlug(slug: string) {
  const task = await prisma.task.findFirst({
    where: { slug: slug },
  });
  return task;
}

export async function allocateTask(count: number) {
  const allocs = await prisma.allocation.findMany({
    orderBy: { count: "asc" },
  });
  if (allocs.length < count) {
    console.log(`[Warning] Invalid number of task, input number is expected less than ${allocs.length}`);
  }

  const assign = allocs.slice(0, count).map((a) => {
    return a.taskID;
  });

  await prisma.allocation.updateMany({
    where: {
      OR: assign.map((a) => {
        return { taskID: a };
      }),
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });

  return assign;
}

type DwellTimeLogParams = {
  userID: number;
  taskID: number;
};

export async function createSERPDwellTimeLog(p: DwellTimeLogParams) {
  await prisma.dwellTimeLog.create({
    data: {
      userID: p.userID,
      taskID: p.taskID,
    },
  });
}

type ClickLogParams = {
  userID: number;
  taskID: number;
  pageID: number;
};

export async function createSERPClickLog(p: ClickLogParams) {
  await prisma.clickLog.create({
    data: {
      userID: p.userID,
      taskID: p.taskID,
      pageID: p.pageID,
    },
  });
}
