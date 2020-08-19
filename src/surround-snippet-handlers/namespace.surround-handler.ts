import { CompletionProvider, CompletionInfo } from "./completion-provider";
import * as vscode from 'vscode';


export class NamespaceSurroundHandler implements CompletionProvider {
    completionInfo: CompletionInfo = {
        label: 'namespace',
        description: 'Code snippet for: #namespace',
        documentation: "Wraps up a selected text into `namespace`.",
        snippet: `namespace \${1:MyNamespace}
{
    $TM_SELECTED_TEXT$0
}`,
    };


    provide(): vscode.CompletionItem {
        var ci = this.completionInfo;
        const namespaceCompletionItem = new vscode.CompletionItem('namespace', vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString(ci.documentation);
        namespaceCompletionItem.detail = ci.description;
        namespaceCompletionItem.insertText = new vscode.SnippetString(ci.snippet);
        return namespaceCompletionItem;
    }

}
