import type { ChangeEvent, KeyboardEvent } from 'react';

// Domain models returned by the backend API.

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Channel {
    id: number;
    name: string;
    image: string;
    preview: string;
    content: string;
    channelTypeId: number;
    // Copy of channelTypeId, set when the channel is loaded.
    type?: number;
}

export interface Comment {
    created_at: string;
    author: string;
    text?: string;
    // Copy of text, set when comments are loaded by channel name.
    comment?: string;
}

export type SearchResultType = 'channel' | 'category';

export interface SearchResult {
    name: string;
    image: string;
    type: SearchResultType;
}

export interface SearchResponse {
    channels: Omit<SearchResult, 'type'>[];
    categories: Omit<SearchResult, 'type'>[];
}

// Request errors are only checked for truthiness, so their shape is not relied on.
export type RequestError = unknown;

export interface NavItemData {
    link: string;
    text: string;
    exact?: boolean;
}

// Search inputs send both change and key down events to the same handler.
export type SearchInputEvent = ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>;
export type SearchHandler = (e: SearchInputEvent) => void;
