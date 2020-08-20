import * as vscode from 'vscode';

export interface SurroundQuickPickItem extends vscode.QuickPickItem {
    snippet: vscode.SnippetString;
}
