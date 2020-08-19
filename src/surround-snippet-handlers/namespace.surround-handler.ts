import { CompletionProvider } from "./completion-provider";
import * as vscode from 'vscode';


export class NamespaceSurroundHandler implements CompletionProvider {
    snippet: string = `namespace \${1:MyNamespace}
{
    $TM_SELECTED_TEXT$0
}`;

    provide(): vscode.CompletionItem {

        const namespaceCompletionItem = new vscode.CompletionItem('namespace', vscode.CompletionItemKind.Snippet);
        namespaceCompletionItem.sortText = `.${namespaceCompletionItem.label}`;
        namespaceCompletionItem.documentation = new vscode.MarkdownString("Wraps up a selected text into `namespace`.");
        namespaceCompletionItem.detail = 'Code snippet for: #namespace';
        namespaceCompletionItem.insertText = new vscode.SnippetString(this.snippet);
        return namespaceCompletionItem;
    }

}
