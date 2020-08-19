import { CompletionItem } from "vscode";

export interface CompletionProvider {
    snippet: string;
    provide(): CompletionItem
}
