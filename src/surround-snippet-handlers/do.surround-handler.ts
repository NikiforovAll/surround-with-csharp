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
        const completionItem = new vscode.CompletionItem(
            this.completionInfo.label,
            vscode.CompletionItemKind.Snippet);
        completionItem.sortText = `.${completionItem.label}`;
        completionItem.documentation = new vscode.MarkdownString(ci.documentation);
        completionItem.detail = ci.description;
        completionItem.insertText = ci.snippet;
        return completionItem;
    }

}
