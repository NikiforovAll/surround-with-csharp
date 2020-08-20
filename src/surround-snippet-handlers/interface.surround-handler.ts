import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class InterfaceSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'interface',
        description: 'Code snippet for: #interface',
        documentation: "Wraps up a selected text into `interface`.",
        snippet: (new SnippetStringBuilder('interface ')
            .appendPlaceholder('IInterface') as SnippetStringBuilder)
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
