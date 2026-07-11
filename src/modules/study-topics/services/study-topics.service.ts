import { studyTopicsApi } from "../api/study-topics.api";

import type {
  CreateStudyTopicPayload,
  UpdateStudyTopicPayload,
} from "../types/study-topic.types";

export const studyTopicsService = {
  getStudyTopics() {
    return studyTopicsApi.getStudyTopics();
  },

  getStudyTopic(topicId: string) {
    return studyTopicsApi.getStudyTopic(topicId);
  },

  createStudyTopic(payload: CreateStudyTopicPayload) {
    return studyTopicsApi.createStudyTopic(payload);
  },

  updateStudyTopic(topicId: string, payload: UpdateStudyTopicPayload) {
    return studyTopicsApi.updateStudyTopic(topicId, payload);
  },

  deleteStudyTopic(topicId: string) {
    return studyTopicsApi.deleteStudyTopic(topicId);
  },
};
