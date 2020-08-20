import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class DoSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'do',
        description: 'Code snippet for: #do',
        documentation: "Wraps up a selected text into `do`.",
        snippet: new SnippetStringBuilder('do')
            .wrapInBrackets()
            .appendText(' ')
            .appendText('while')
            .appendText(' ')
            .appendText('(')
            .appendPlaceholder('true')
            .appendText(')')
            .appendText(';')
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
