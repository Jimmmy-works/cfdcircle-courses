export const teacherInfo = useMemo(
  () => teams?.find((teacher) => teacher?.tags?.includes(Roles.Teacher)),
  [teams]
);
