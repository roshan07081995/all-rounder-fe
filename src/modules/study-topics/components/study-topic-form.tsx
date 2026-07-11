import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateStudyTopic } from "../hooks/use-study-topics";
import {
  studyTopicSchema,
  type StudyTopicFormValues,
} from "../schemas/study-topic.schema";

interface ApiErrorResponse {
  detail?: string;
}

const getStudyTopicErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as ApiErrorResponse | undefined)?.detail ??
      "Unable to save study topic. Please try again."
    );
  }

  return "Unable to save study topic. Please try again.";
};

export function StudyTopicForm() {
  const createStudyTopic = useCreateStudyTopic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudyTopicFormValues>({
    resolver: zodResolver(studyTopicSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      target_date: "",
      is_completed: false,
    },
  });

  const onSubmit = (values: StudyTopicFormValues) => {
    createStudyTopic.mutate(
      {
        title: values.title,
        description: values.description?.trim() || null,
        subject: values.subject?.trim() || null,
        target_date: values.target_date || null,
        is_completed: values.is_completed,
      },
      {
        onSuccess: () => {
          reset({
            title: "",
            description: "",
            subject: "",
            target_date: "",
            is_completed: false,
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
            Add study topic
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Capture subjects, revision targets, and completion progress.
          </p>
        </div>

        <Button
          type="submit"
          loading={createStudyTopic.isPending}
          leftIcon={<Plus size={17} />}>
          Add topic
        </Button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_170px]">
        <Input
          label="Title"
          placeholder="Binary Search revision"
          error={errors.title?.message}
          {...register("title")}
        />

        <Input
          label="Subject"
          placeholder="DSA"
          error={errors.subject?.message}
          {...register("subject")}
        />

        <Input
          label="Target date"
          type="date"
          error={errors.target_date?.message}
          {...register("target_date")}
        />
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </span>
        <textarea
          rows={3}
          placeholder="Practice lower bound, upper bound, and rotated array problems"
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...register("description")}
        />
      </label>

      <label className="mt-4 flex items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          {...register("is_completed")}
        />
        <span className="text-sm font-medium text-slate-700">
          Mark as completed
        </span>
      </label>

      {createStudyTopic.isError && (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          {getStudyTopicErrorMessage(createStudyTopic.error)}
        </p>
      )}
    </form>
  );
}
