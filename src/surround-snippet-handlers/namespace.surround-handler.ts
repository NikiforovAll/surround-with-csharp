import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class NamespaceSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'namespace',
        description: 'Code snippet for: #namespace',
        documentation: "Wraps up a selected text into `namespace`.",
        snippet: new SnippetStringBuilder('namespace ')
            .addPlaceholder('MyNamespace')
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
