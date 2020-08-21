import * as vscode from 'vscode';
import { SurroundCompletionProvider } from './surround-completion-provider';
import { NamespaceSurroundHandler } from './surround-snippet-handlers/namespace.surround-handler';
import { CompletionProvider } from './surround-snippet-handlers/completion-provider';
import { SurroundQuickPickItem } from './view/surround-quickpick-item';
import { DIfSurroundHandler } from './surround-snippet-handlers/dif.surround-handler';
import { RegionSurroundHandler } from './surround-snippet-handlers/region.surround-handler';
import { CheckedSurroundHandler } from './surround-snippet-handlers/checked.surround-handler';
import { ClassSurroundHandler } from './surround-snippet-handlers/class.surround-handler';
import { DoSurroundHandler } from './surround-snippet-handlers/do.surround-handler';
import { ElseSurroundHandler } from './surround-snippet-handlers/else.surround-handler';
import { EnumSurroundHandler } from './surround-snippet-handlers/enum.surround-handler';
import { ForSurroundHandler } from './surround-snippet-handlers/for.surround-handler';
import { ForEachSurroundHandler } from './surround-snippet-handlers/foreach.surround-handler';
import { ForRSurroundHandler } from './surround-snippet-handlers/forr.surround-handler';
import { IfSurroundHandler } from './surround-snippet-handlers/if.surround-handler';
import { InterfaceSurroundHandler } from './surround-snippet-handlers/interface.surround-handler';
import { LockSurroundHandler } from './surround-snippet-handlers/lock.surround-handler';
import { StructSurroundHandler } from './surround-snippet-handlers/struct.surround-handler';
import { TrySurroundHandler } from './surround-snippet-handlers/try.surround-handler';
import { TryFSurroundHandler } from './surround-snippet-handlers/tryf.surround-handler';
import { UnCheckedSurroundHandler } from './surround-snippet-handlers/unchecked.surround-handler';
import { WhileSurroundHandler } from './surround-snippet-handlers/while.surround-handler';
import { UnSafeSurroundHandler } from './surround-snippet-handlers/unsafe.surround-handler';
import { UsingSurroundHandler } from './surround-snippet-handlers/using.surround-handler';

export function activate(context: vscode.ExtensionContext) {
	const surroundCompletionProvider = new SurroundCompletionProvider(
		new DIfSurroundHandler(),
		new RegionSurroundHandler(),
		new CheckedSurroundHandler(),
		new ClassSurroundHandler(),
		new DoSurroundHandler(),
		new ElseSurroundHandler(),
		new EnumSurroundHandler(),
		new ForSurroundHandler(),
		new ForEachSurroundHandler(),
		new ForRSurroundHandler(),
		new IfSurroundHandler(),
		new InterfaceSurroundHandler(),
		new LockSurroundHandler(),
		new NamespaceSurroundHandler(),
		new StructSurroundHandler(),
		new TrySurroundHandler(),
		new TryFSurroundHandler(),
		new UnCheckedSurroundHandler(),
		new UnSafeSurroundHandler(),
		new UsingSurroundHandler(),
		new WhileSurroundHandler(),
	);
	let disposable = registerCompletionProvider(surroundCompletionProvider);
	context.subscriptions.push(disposable);
	let disposableCollection = registerCompletionCommands(surroundCompletionProvider);
	context.subscriptions.push(...disposableCollection);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function registerCompletionProvider(
	surroundCompletionProvider: SurroundCompletionProvider): vscode.Disposable {
	const documentSelector: vscode.DocumentSelector = {
		language: 'csharp',
	};

	return vscode.languages.registerCompletionItemProvider(
		documentSelector,
		surroundCompletionProvider);
}

function registerCompletionCommands(
	surroundCompletionProvider: SurroundCompletionProvider): vscode.Disposable[] {
	const disposed: vscode.Disposable[] = [];
	const commandPrefix = 'surround.with';
	let disposable = vscode.commands.registerCommand(commandPrefix, () => {
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
	disposed.push(disposable);
	const additionalSurroundCommands = [
		// With keybindings
		NamespaceSurroundHandler,
		ForSurroundHandler,
		ForEachSurroundHandler,
		DoSurroundHandler,
		WhileSurroundHandler,
		IfSurroundHandler,
		ElseSurroundHandler,
		TrySurroundHandler,
		TryFSurroundHandler,
		LockSurroundHandler,
		// Without default keybindings
		DIfSurroundHandler,
		RegionSurroundHandler,
		CheckedSurroundHandler,
		ClassSurroundHandler,
		InterfaceSurroundHandler,
		StructSurroundHandler,
		EnumSurroundHandler,
		ForRSurroundHandler,
		UnCheckedSurroundHandler,
		UnSafeSurroundHandler,
		UsingSurroundHandler,
	];
	for (const sc of additionalSurroundCommands) {
		const provider = surroundCompletionProvider.providers.find(p => {
			return p instanceof sc;
		});
		if (!provider) {
			console.warn('Registered provider not found');
			continue;
		}
		let disposable = vscode
			.commands
			.registerCommand(`${commandPrefix}.${provider?.completionInfo.label}`, () => {
				const snippet = provider?.completionInfo?.snippet;
				if (!snippet) {
					console.warn('Snippet not found');
					return;
				}
				vscode.window.activeTextEditor?.insertSnippet(snippet);
			});
		disposed.push(disposable);
	}
	return disposed;
}

function transformToQuickPickItem(provider: CompletionProvider): vscode.QuickPickItem {
	return {
		label: provider.completionInfo.label,
		detail: provider.completionInfo.documentation,
		description: provider.completionInfo.description,
		snippet: provider.completionInfo.snippet
	} as SurroundQuickPickItem;
}
