import * as vscode from 'vscode';
import { SurroundCompletionProvider } from './surround-completion-provider';
import { NamespaceSurroundHandler } from './surround-snippet-handlers/namespace.surround-handler';
import { CompletionProvider } from './surround-snippet-handlers/completion-provider';
import { SurroundQuickPickItem } from './view/surround-quickpick-item';

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
			const surroundItem = item as SurroundQuickPickItem;
			if (item) {
				vscode.window.activeTextEditor
					?.insertSnippet(surroundItem.snippet);
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
		snippet: provider.completionInfo.snippet
	} as SurroundQuickPickItem;
}

