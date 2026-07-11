import { api } from "@/lib/axios";

import type {
  CreateStudyTopicPayload,
  StudyTopic,
  UpdateStudyTopicPayload,
} from "../types/study-topic.types";

const STUDY_TOPIC_ENDPOINTS = {
  list: "/study-topics",
  detail: (topicId: string) => `/study-topics/${topicId}`,
} as const;

export const studyTopicsApi = {
  async getStudyTopics(): Promise<StudyTopic[]> {
    const { data } = await api.get<StudyTopic[]>(STUDY_TOPIC_ENDPOINTS.list);

    return data;
  },

  async getStudyTopic(topicId: string): Promise<StudyTopic> {
    const { data } = await api.get<StudyTopic>(
      STUDY_TOPIC_ENDPOINTS.detail(topicId)
    );

    return data;
  },

  async createStudyTopic(
    payload: CreateStudyTopicPayload
  ): Promise<StudyTopic> {
    const { data } = await api.post<StudyTopic>(
      STUDY_TOPIC_ENDPOINTS.list,
      payload
    );

    return data;
  },

  async updateStudyTopic(
    topicId: string,
    payload: UpdateStudyTopicPayload
  ): Promise<StudyTopic> {
    const { data } = await api.put<StudyTopic>(
      STUDY_TOPIC_ENDPOINTS.detail(topicId),
      payload
    );

    return data;
  },

  async deleteStudyTopic(topicId: string): Promise<void> {
    await api.delete(STUDY_TOPIC_ENDPOINTS.detail(topicId));
  },
};
