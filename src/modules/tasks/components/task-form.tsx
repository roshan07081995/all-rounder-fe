import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateTask } from "../hooks/use-tasks";
import { taskSchema, type TaskFormValues } from "../schemas/task.schema";

interface ApiErrorResponse {
  detail?: string;
}

const getTaskErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as ApiErrorResponse | undefined)?.detail ??
      "Unable to save task. Please try again."
    );
  }

  return "Unable to save task. Please try again.";
};

export function TaskForm() {
  const createTask = useCreateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "HIGH",
      due_date: "",
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    createTask.mutate(
      {
        title: values.title,
        description: values.description?.trim() || null,
        priority: values.priority,
        due_date: values.due_date || null,
      },
      {
        onSuccess: () => {
          reset({
            title: "",
            description: "",
            priority: "HIGH",
            due_date: "",
          });
        },
      }
    );
  };

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
      noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Add activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create tasks for engineering, health, learning, or planning.
          </p>
        </div>

        <Button
          type="submit"
          loading={createTask.isPending}
          leftIcon={<Plus size={17} />}>
          Add task
        </Button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_160px_170px]">
        <Input
          label="Title"
          placeholder="Study DSA 1"
          error={errors.title?.message}
          {...register("title")}
        />

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Priority
          </span>
          <select
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            {...register("priority")}>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </label>

        <Input
          label="Due date"
          type="date"
          error={errors.due_date?.message}
          {...register("due_date")}
        />
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </span>
        <textarea
          rows={3}
          placeholder="Solve 5 Linked List problems"
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...register("description")}
        />
      </label>

      {createTask.isError && (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          {getTaskErrorMessage(createTask.error)}
        </p>
      )}
    </form>
  );
}
