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
        const namespaceCompletionItem = new vscode.CompletionItem('namespace', vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString(ci.documentation);
        namespaceCompletionItem.detail = ci.description;
        namespaceCompletionItem.insertText = ci.snippet;
        return namespaceCompletionItem;
    }

}
