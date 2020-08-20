import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class ForRSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'forr',
        description: 'Code snippet for: #forr',
        documentation: "Wraps up a selected text into `forr`.",
        snippet: new SnippetStringBuilder('for (int ${1:i} = ${2:length} - 1; ${1:i} >= 0 ; ${1:i}--)')
            .wrapInBrackets()
    };

    provide(): vscode.CompletionItem {
        var ci = this.completionInfo;
        const namespaceCompletionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString(ci.documentation);
        namespaceCompletionItem.detail = ci.description;
        namespaceCompletionItem.insertText = ci.snippet;
        return namespaceCompletionItem;
    }

}
