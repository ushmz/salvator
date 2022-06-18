export const setAssignedTasks = (taskIDs: number[]) => {
  taskIDs.forEach((t, idx) => {
    localStorage.setItem(`task${idx + 1}`, `${t}`);
  });
};
