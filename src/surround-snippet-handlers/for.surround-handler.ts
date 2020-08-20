import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class ForSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'for',
        description: 'Code snippet for: #for',
        documentation: "Wraps up a selected text into `for`.",
        snippet: new SnippetStringBuilder('for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++)')
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
