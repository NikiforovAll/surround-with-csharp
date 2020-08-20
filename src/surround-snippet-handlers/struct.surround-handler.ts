import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';
import { SnippetStringBuilder } from "../utils/snippet-builder-utils";

export class StructSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'struct',
        description: 'Code snippet for: #struct',
        documentation: "Wraps up a selected text into `struct`.",
        snippet: (new SnippetStringBuilder('struct ')
            .appendPlaceholder('MyStruct') as SnippetStringBuilder)
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
