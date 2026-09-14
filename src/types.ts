export interface IslamQASource {
  title: string;
  url: string;
  questionNo?: string;
  snippet?: string;
}

export interface QnARequest {
  question: string;
  language?: 'auto' | 'en' | 'bn' | 'ar';
}

export interface QnAResponse {
  id: string;
  question: string;
  answer: string;
  sources: IslamQASource[];
  timestamp: number;
  model: string;
}

export interface ChatHistoryItem {
  id: string;
  question: string;
  answer: string;
  sources: IslamQASource[];
  timestamp: number;
}
