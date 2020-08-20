import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class DIfSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: '#if',
        description: 'Code snippet for: #dif',
        documentation: "Wraps up a selected text into `#if ... #endif`.",
        snippet: new SnippetStringBuilder('#if true')
            .addSelectedText()
            .appendText('#endif')
    };


    provide(): vscode.CompletionItem {
        var ci = this.completionInfo;
        const namespaceCompletionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.~${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString(ci.documentation);
        namespaceCompletionItem.detail = ci.description;
        namespaceCompletionItem.insertText = ci.snippet;
        return namespaceCompletionItem;
    }

}
