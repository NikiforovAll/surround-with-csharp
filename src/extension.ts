import * as vscode from 'vscode';
import { SurroundCompletionProvider } from './SurroundCompletionProvider';
import { NamespaceSurroundHandler } from './surround-snippet-handlers/namespace.surround-handler';

export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = registerCompletionProvider();

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function registerCompletionProvider(): vscode.Disposable {
	const documentSelector: vscode.DocumentSelector = {
		language: 'csharp',
	};
	return vscode.languages.registerCompletionItemProvider(
		documentSelector,
		new SurroundCompletionProvider(
			new NamespaceSurroundHandler()
		));
}
