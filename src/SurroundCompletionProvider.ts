import * as vscode from 'vscode';
import { CompletionProvider } from './surround-snippet-handlers/completion-provider';
type CompletionProviderResult =
    vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>>;
export class SurroundCompletionProvider implements vscode.CompletionItemProvider {
    providers: CompletionProvider[];
    constructor(...providers: CompletionProvider[]) {
        this.providers = providers;
    }
    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext): CompletionProviderResult {
        const completions: CompletionProviderResult = [];
        var textEditor = vscode.window.activeTextEditor;
        if (!textEditor) {
            return [];
        }
        const isTextSelected = textEditor.selection;
        if (isTextSelected) {
            this.providers.forEach(p => {
                completions.push(p.provide());
            });
        }
        return completions;
    }
}
