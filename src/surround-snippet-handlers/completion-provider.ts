import { CompletionItem } from "vscode";

export interface CompletionProvider {
    completionInfo: CompletionInfo;
    provide(): CompletionItem
}

export interface CompletionInfo {
    label: string;
    description: string;
    documentation?: string;
    snippet: string;
}
