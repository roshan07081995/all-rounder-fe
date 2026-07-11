import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { studyTopicsService } from "../services/study-topics.service";

import type {
  CreateStudyTopicPayload,
  UpdateStudyTopicPayload,
} from "../types/study-topic.types";

export const STUDY_TOPICS_QUERY_KEY = ["study-topics"] as const;

export function useStudyTopics() {
  return useQuery({
    queryKey: STUDY_TOPICS_QUERY_KEY,
    queryFn: studyTopicsService.getStudyTopics,
  });
}

export function useStudyTopic(topicId: string) {
  return useQuery({
    queryKey: [...STUDY_TOPICS_QUERY_KEY, topicId],
    queryFn: () => studyTopicsService.getStudyTopic(topicId),
    enabled: Boolean(topicId),
  });
}

export function useCreateStudyTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudyTopicPayload) =>
      studyTopicsService.createStudyTopic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_TOPICS_QUERY_KEY });
    },
  });
}

export function useUpdateStudyTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      topicId,
      payload,
    }: {
      topicId: string;
      payload: UpdateStudyTopicPayload;
    }) => studyTopicsService.updateStudyTopic(topicId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_TOPICS_QUERY_KEY });
    },
  });
}

export function useDeleteStudyTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topicId: string) => studyTopicsService.deleteStudyTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDY_TOPICS_QUERY_KEY });
    },
  });
}
