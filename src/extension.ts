import * as vscode from 'vscode';
import { SurroundCompletionProvider } from './surround-completion-provider';
import { NamespaceSurroundHandler } from './surround-snippet-handlers/namespace.surround-handler';
import { CompletionProvider } from './surround-snippet-handlers/completion-provider';

export function activate(context: vscode.ExtensionContext) {
	const surroundCompletionProvider = new SurroundCompletionProvider(
		new NamespaceSurroundHandler()
	);
	let disposable = registerCompletionProvider(surroundCompletionProvider);
	context.subscriptions.push(disposable);
	disposable = registerCompletionCommands(surroundCompletionProvider);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function registerCompletionProvider(
	surroundCompletionProvider: SurroundCompletionProvider): vscode.Disposable {
	const documentSelector: vscode.DocumentSelector = {
		language: 'csharp',
	};
	
	return vscode.languages.registerCompletionItemProvider(documentSelector,
		surroundCompletionProvider);
}

function registerCompletionCommands(
	surroundCompletionProvider: SurroundCompletionProvider): vscode.Disposable {
	let disposable = vscode.commands.registerCommand("surround.with", () => {
		const quickPickItems = surroundCompletionProvider.providers
			.map(transformToQuickPickItem);
		vscode.window.showQuickPick(quickPickItems).then(item => {
			if (item) {
				vscode.window.showInformationMessage(item.description || '');
				// applyQuickPick(item, surroundItems);
			}
		});
	});
	return disposable;
}

function transformToQuickPickItem(provider: CompletionProvider): vscode.QuickPickItem {
	return {
		label: provider.completionInfo.label,
		detail: provider.completionInfo.documentation,
		description: provider.completionInfo.description,
	};
}
