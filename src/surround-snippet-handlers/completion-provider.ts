import * as vscode from "vscode";
export interface CompletionProvider {
    completionInfo: CompletionInfo;
    provide(): vscode.CompletionItem
}

export interface CompletionInfo {
    label: string;
    description: string;
    documentation?: string;
    snippet: vscode.SnippetString;
}
