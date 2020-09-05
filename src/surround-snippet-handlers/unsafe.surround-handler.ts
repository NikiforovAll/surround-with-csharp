import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class UnSafeSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'unsafe',
        description: 'Code snippet for: #unsafe',
        documentation: "Wraps up a selected text into `unsafe`.",
        snippet: new SnippetStringBuilder('unsafe')
            .wrapInBrackets()
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
