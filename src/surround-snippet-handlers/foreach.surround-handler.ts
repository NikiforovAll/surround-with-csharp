import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class ForEachSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'foreach',
        description: 'Code snippet for: #foreach',
        documentation: "Wraps up a selected text into `foreach`.",
        snippet: new SnippetStringBuilder('foreach (${1:var} ${2:item} in ${3:collection})')
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
