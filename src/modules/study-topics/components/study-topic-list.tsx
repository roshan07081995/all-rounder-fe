import { BookOpen, Check, Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

import {
  useDeleteStudyTopic,
  useUpdateStudyTopic,
} from "../hooks/use-study-topics";
import type { StudyTopic } from "../types/study-topic.types";

interface StudyTopicListProps {
  topics: StudyTopic[];
  isLoading: boolean;
}

interface EditableStudyTopic {
  title: string;
  description: string;
  subject: string;
  target_date: string;
  is_completed: boolean;
}

const formatDate = (date: string | null) => {
  if (!date) {
    return "No target date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

export function StudyTopicList({ topics, isLoading }: StudyTopicListProps) {
  const updateStudyTopic = useUpdateStudyTopic();
  const deleteStudyTopic = useDeleteStudyTopic();
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditableStudyTopic | null>(null);

  const startEdit = (topic: StudyTopic) => {
    setEditingTopicId(topic.id);
    setDraft({
      title: topic.title,
      description: topic.description ?? "",
      subject: topic.subject ?? "",
      target_date: topic.target_date ?? "",
      is_completed: topic.is_completed,
    });
  };

  const cancelEdit = () => {
    setEditingTopicId(null);
    setDraft(null);
  };

  const saveEdit = (topicId: string) => {
    if (!draft?.title.trim()) {
      return;
    }

    updateStudyTopic.mutate(
      {
        topicId,
        payload: {
          title: draft.title,
          description: draft.description.trim() || null,
          subject: draft.subject.trim() || null,
          target_date: draft.target_date || null,
          is_completed: draft.is_completed,
        },
      },
      {
        onSuccess: cancelEdit,
      }
    );
  };

  const toggleCompletion = (topic: StudyTopic) => {
    updateStudyTopic.mutate({
      topicId: topic.id,
      payload: {
        is_completed: !topic.is_completed,
      },
    });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950">
            Study board
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review, update, complete, and delete study topics.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {topics.length} total
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-lg border border-slate-100 bg-slate-50"
            />
          ))}

        {!isLoading && topics.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <BookOpen className="mx-auto text-slate-400" size={24} />
            <p className="mt-3 text-sm font-semibold text-slate-800">
              No study topics yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add your first topic to start planning your learning track.
            </p>
          </div>
        )}

        {!isLoading &&
          topics.map((topic) => {
            const isEditing = editingTopicId === topic.id && draft;

            return (
              <article
                key={topic.id}
                className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      value={draft.title}
                      onChange={(event) =>
                        setDraft({ ...draft, title: event.target.value })
                      }
                      className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <textarea
                      value={draft.description}
                      rows={3}
                      onChange={(event) =>
                        setDraft({
                          ...draft,
                          description: event.target.value,
                        })
                      }
                      className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_160px]">
                      <input
                        value={draft.subject}
                        placeholder="Subject"
                        onChange={(event) =>
                          setDraft({ ...draft, subject: event.target.value })
                        }
                        className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />

                      <input
                        type="date"
                        value={draft.target_date}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            target_date: event.target.value,
                          })
                        }
                        className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />

                      <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={draft.is_completed}
                          onChange={(event) =>
                            setDraft({
                              ...draft,
                              is_completed: event.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-slate-300 text-blue-600"
                        />
                        Completed
                      </label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-100">
                        <X size={16} />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(topic.id)}
                        disabled={updateStudyTopic.isPending}
                        className="flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-medium text-white disabled:opacity-60">
                        <Save size={16} />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start">
                    <button
                      type="button"
                      onClick={() => toggleCompletion(topic)}
                      className={`mt-1 flex h-9 w-9 items-center justify-center rounded-lg border ${
                        topic.is_completed
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-400 hover:bg-slate-50"
                      }`}
                      aria-label="Toggle study topic completion">
                      <Check size={17} />
                    </button>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-950">
                          {topic.title}
                        </h3>
                        {topic.subject && (
                          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                            {topic.subject}
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            topic.is_completed
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                          {topic.is_completed ? "COMPLETED" : "PENDING"}
                        </span>
                      </div>

                      {topic.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {topic.description}
                        </p>
                      )}

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        Target {formatDate(topic.target_date)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => startEdit(topic)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        aria-label="Edit study topic">
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteStudyTopic.mutate(topic.id)}
                        disabled={deleteStudyTopic.isPending}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                        aria-label="Delete study topic">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
      </div>
    </section>
  );
}
