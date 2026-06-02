export interface TarotSpeaker {
  id: string;
  name: string;
  icon: string;
}

export interface TarotCategory {
  id: number;
  name: string;
  image?: string;
  description?: string;
  site_description?: string;
  slug: string;
}

export interface TarotCard {
  id: string;
  name: string;
  image: string;
  description?: string;
  slug: string;
}

export interface TarotRequest {
  request: {
    question: string;
    speaker_id: string;
    tarot_id: string;
    category_id: string;
  };
  response: {
    id: number;
    tarot: {
      id: number;
      name: string;
      description: string;
      matrix: Record<string, [number, number]>;
    };
    question: string;
    cards: Record<string, TarotCard>;
    back_card: string;
    chat_id: number;
    reading: TReadingMessage | null;
  };
}

export type TReadingResponse = {
  id: number;
  message: TReadingMessage;
  message_type: string;
  sender: string;
};

export type TReadingMessage = {
  cards?: TReadingCard[];
  final_question: string | null;
  interpretation: TInterpretation[] | null;
  status: string;
};

type TInterpretation = {
  id: number;
  title: string;
  text: string;
};

type TReadingCard = {
  id: number;
  position: string;
  text: string;
};

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export type Coordinates = {
  x: number;
  y: number;
};

export type Matrix = Coordinates[];
